import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { schemas, enquiryTypes, type EnquiryType } from "@/lib/enquiry-schema";
import { getProduct } from "@/data/products";
import { company } from "@/data/company";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 3 * 1024 * 1024;
const hits = new Map<string, number[]>();

/** Best-effort per-instance rate limit: 5 submissions / 10 minutes / IP */
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function recipients(type: EnquiryType) {
  const pick = (v: string | undefined, fallback: string) => (v || fallback).split(",").map((s) => s.trim()).filter(Boolean);
  if (type === "career") return pick(process.env.ENQUIRY_TO_CAREERS, company.investorContact.email);
  return pick(process.env.ENQUIRY_TO_SALES, company.salesEmail);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid submission." }, { status: 400 });
  }

  const type = String(form.get("type") ?? "") as EnquiryType;
  if (!(type in schemas)) return NextResponse.json({ ok: false, message: "Unknown enquiry type." }, { status: 400 });

  // Rebuild structured fields from FormData
  const raw: Record<string, unknown> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string" && !k.startsWith("items.")) raw[k] = v;
  if (type === "quote") {
    const products = form.getAll("items.product").map(String);
    const bags = form.getAll("items.bags").map(String);
    raw.items = products.map((p, i) => ({ product: p, bags: bags[i] }));
  }

  // Honeypot: silently accept bots without sending anything
  if (raw.website) return NextResponse.json({ ok: true });

  const parsed = schemas[type].safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, message: "Please correct the highlighted fields.", fieldErrors }, { status: 422 });
  }
  const data = parsed.data as z.infer<(typeof schemas)[EnquiryType]> & Record<string, unknown>;

  let attachment: { filename: string; content: Buffer } | undefined;
  const resume = form.get("resume");
  if (type === "career" && resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) return NextResponse.json({ ok: false, message: "Resume must be 3 MB or smaller.", fieldErrors: { resume: "Max 3 MB" } }, { status: 422 });
    if (!/\.(pdf|docx?)$/i.test(resume.name)) return NextResponse.json({ ok: false, message: "Resume must be a PDF or Word file.", fieldErrors: { resume: "PDF or Word only" } }, { status: 422 });
    attachment = { filename: resume.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await resume.arrayBuffer()) };
  }

  // Build the email
  const rows: [string, string][] = [];
  const skip = new Set(["type", "consent", "website", "items"]);
  for (const [k, v] of Object.entries(data)) if (!skip.has(k) && v !== "" && v !== undefined) rows.push([k, String(v)]);
  if (type === "quote" && "items" in data) {
    const items = data.items as { product: string; bags: number }[];
    rows.push(["Products", items.map((i) => `${getProduct(i.product)?.name ?? i.product} — ${i.bags} bags`).join("; ")]);
    rows.push(["Total bags", String(items.reduce((n, i) => n + i.bags, 0))]);
  }
  const label = enquiryTypes[type];
  const html = `<h2 style="font-family:Arial">${esc(label)} — website</h2><table cellpadding="6" style="font-family:Arial;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#555;text-transform:capitalize">${esc(k.replace(/([A-Z])/g, " $1"))}</td><td style="border-bottom:1px solid #eee"><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[enquiry:${type}] (email not configured — logged only)\n${text}`);
      return NextResponse.json({ ok: true, devOnly: true });
    }
    console.error("Enquiry email is not configured (RESEND_API_KEY / ENQUIRY_FROM_EMAIL).");
    return NextResponse.json(
      { ok: false, message: `We couldn't send your message right now. Please call ${company.primaryPhone} or email ${company.salesEmail}.` },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: `Panyam Cement Website <${from}>`,
      to: recipients(type),
      replyTo: data.email ? String(data.email) : undefined,
      subject: `${label}: ${data.name} (${data.city})`,
      html,
      text,
      attachments: attachment ? [attachment] : undefined,
    });
    if (error) throw new Error(error.message);

    if (data.email) {
      await resend.emails.send({
        from: `Panyam Cement <${from}>`,
        to: String(data.email),
        subject: "We have received your message — Panyam Cement",
        text: `Dear ${data.name},\n\nThank you for contacting Panyam Cement. We have received your ${label.toLowerCase()} and our team will get back to you shortly.\n\nFor urgent queries call ${company.primaryPhone}.\n\nPanyam Cements & Mineral Industries Ltd.\n${company.tagline}`,
      }).catch(() => undefined);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Enquiry send failed", e);
    return NextResponse.json(
      { ok: false, message: `Sorry, something went wrong. Please call ${company.primaryPhone} or email ${company.salesEmail}.` },
      { status: 502 },
    );
  }
}
