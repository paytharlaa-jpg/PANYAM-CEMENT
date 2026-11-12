"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Loader2, Plus, Trash2, Send } from "lucide-react";
import { enquiryTypes, type EnquiryType } from "@/lib/enquiry-schema";
import { products } from "@/data/products";
import { company } from "@/data/company";

type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string; errors?: Record<string, string> };

function Field({ label, name, error, required, children, hint }: { label: string; name: string; error?: string; required?: boolean; children: (id: string, describedBy?: string) => ReactNode; hint?: string }) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  return (
    <div data-field={name}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {label} {required && <span aria-hidden className="text-kiln">*</span>}
      </label>
      {children(id, [error ? errId : "", hint ? hintId : ""].filter(Boolean).join(" ") || undefined)}
      {hint && !error && <p id={hintId} className="mt-1.5 text-xs text-slate">{hint}</p>}
      {error && <p id={errId} className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-[#b42318]"><AlertCircle aria-hidden className="h-4 w-4" />{error}</p>}
    </div>
  );
}

const tomorrow = () => {
  const d = new Date(Date.now() + 86_400_000);
  return d.toISOString().slice(0, 10);
};

export function EnquiryForm({ fixedType }: { fixedType?: EnquiryType }) {
  const params = useSearchParams();
  const initialType = (fixedType ?? (params.get("type") as EnquiryType)) in enquiryTypes ? (fixedType ?? (params.get("type") as EnquiryType)) : "general";
  const [type, setType] = useState<EnquiryType>(initialType);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [items, setItems] = useState(() => [{ key: 0, product: params.get("product") ?? products[0].slug, bags: params.get("bags") ?? "" }]);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const e = status.errors ?? {};

  useEffect(() => {
    if (status.state !== "success") return;
    statusRef.current?.focus({ preventScroll: true });
    statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status.state]);

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: new FormData(ev.currentTarget) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (res.ok && json.ok) {
        setStatus({ state: "success" });
        formRef.current?.reset();
        setItems([{ key: Date.now(), product: products[0].slug, bags: "" }]);
      } else {
        setStatus({ state: "error", message: json.message ?? "Something went wrong. Please try again.", errors: json.fieldErrors });
        requestAnimationFrame(() => {
          const first = json.fieldErrors && Object.keys(json.fieldErrors)[0];
          const el = first ? formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select, [data-field="${first}"] textarea`) : null;
          (el ?? statusRef.current)?.focus();
        });
      }
    } catch {
      setStatus({ state: "error", message: `Network error. Please check your connection, or call ${company.primaryPhone}.` });
    }
  };

  if (status.state === "success") {
    return (
      <div ref={statusRef} role="status" tabIndex={-1} className="rounded-[2rem] bg-brand-night p-8 text-white sm:p-12">
        <CheckCircle2 aria-hidden className="h-14 w-14 text-sun" />
        <h2 className="mt-6 font-display text-4xl font-extrabold">Thank you.</h2>
        <p className="mt-3 max-w-md text-lg text-white/80">
          Your {enquiryTypes[type].toLowerCase()} has reached our team. We will get back to you shortly. For urgent queries call{" "}
          <a href={company.primaryPhoneHref} className="font-bold text-sun underline">{company.primaryPhone}</a>.
        </p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-8 min-h-12 rounded-full border border-white/30 px-6 font-bold hover:bg-white hover:text-charcoal">
          Send another message
        </button>
      </div>
    );
  }

  const busy = status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(6_38_26/0.3)] sm:p-10" aria-describedby="form-status">
      <input type="hidden" name="type" value={type} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {!fixedType && (
        <fieldset className="mb-8">
          <legend className="mb-3 text-sm font-bold">How can we help?</legend>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(enquiryTypes) as EnquiryType[]).filter((t) => t !== "career").map((t) => (
              <label key={t} className={`flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 text-sm font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-kiln ${type === t ? "border-brand bg-brand-mint text-brand-deep" : "border-stone hover:border-brand/50"}`}>
                <input type="radio" name="_type" value={t} checked={type === t} onChange={() => { setType(t); setStatus({ state: "idle" }); }} className="sr-only" />
                {enquiryTypes[t]}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={e.name}>
          {(id, d) => <input id={id} name="name" autoComplete="name" required className="field" aria-invalid={!!e.name} aria-describedby={d} />}
        </Field>
        <Field label="Mobile number" name="phone" required error={e.phone}>
          {(id, d) => <input id={id} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98xxxxxxxx" className="field" aria-invalid={!!e.phone} aria-describedby={d} />}
        </Field>
        <Field label="Email" name="email" required={type === "career"} error={e.email} hint={type !== "career" ? "Optional — we'll send a confirmation" : undefined}>
          {(id, d) => <input id={id} name="email" type="email" autoComplete="email" required={type === "career"} className="field" aria-invalid={!!e.email} aria-describedby={d} />}
        </Field>
        <Field label="City / district" name="city" required error={e.city}>
          {(id, d) => <input id={id} name="city" autoComplete="address-level2" required className="field" aria-invalid={!!e.city} aria-describedby={d} />}
        </Field>

        {type === "general" && (
          <Field label="Subject" name="subject" required error={e.subject}>
            {(id, d) => (
              <select id={id} name="subject" className="field" aria-describedby={d}>
                {["Product information", "Order status", "Technical support", "Feedback", "Other"].map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
          </Field>
        )}

        {type === "quote" && (
          <>
            <Field label="I am a" name="customerType" required error={e.customerType}>
              {(id, d) => (
                <select id={id} name="customerType" className="field" aria-describedby={d}>
                  {["Individual home builder", "Contractor", "Builder / developer", "Dealer", "Government / institution"].map((s) => <option key={s}>{s}</option>)}
                </select>
              )}
            </Field>
            <Field label="Required by" name="requiredBy" error={e.requiredBy} hint="Optional">
              {(id, d) => <input id={id} name="requiredBy" type="date" min={tomorrow()} className="field" aria-describedby={d} />}
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="mb-3 text-sm font-bold">Products and quantity <span aria-hidden className="text-kiln">*</span></legend>
              <ul className="space-y-3">
                {items.map((it, i) => (
                  <li key={it.key} className="grid grid-cols-[1fr_7.5rem_auto] items-end gap-2" data-field={`items.${i}.bags`}>
                    <div>
                      <label htmlFor={`p-${it.key}`} className="sr-only">Product {i + 1}</label>
                      <select id={`p-${it.key}`} name="items.product" defaultValue={it.product} className="field">
                        {products.map((p) => <option key={p.slug} value={p.slug}>{p.name} · {p.shortType}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`b-${it.key}`} className="sr-only">Bags for product {i + 1}</label>
                      <input id={`b-${it.key}`} name="items.bags" type="number" min={1} inputMode="numeric" defaultValue={it.bags} placeholder="Bags" className="field" aria-invalid={!!e[`items.${i}.bags`]} />
                    </div>
                    <button type="button" onClick={() => setItems(items.filter((x) => x.key !== it.key))} disabled={items.length === 1}
                      className="grid h-12 w-12 place-items-center rounded-xl text-slate hover:bg-paper disabled:opacity-30" aria-label={`Remove product ${i + 1}`}>
                      <Trash2 aria-hidden className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
              {Object.entries(e).filter(([k]) => k.startsWith("items")).slice(0, 1).map(([k, m]) => (
                <p key={k} className="mt-2 text-sm font-semibold text-[#b42318]">{m}</p>
              ))}
              {items.length < products.length && (
                <button type="button" onClick={() => setItems([...items, { key: Date.now(), product: products[items.length]?.slug ?? products[0].slug, bags: "" }])}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold text-brand-deep hover:bg-brand-mint">
                  <Plus aria-hidden className="h-4 w-4" /> Add another product
                </button>
              )}
            </fieldset>
            <div className="sm:col-span-2">
              <Field label="Delivery location" name="deliveryLocation" required error={e.deliveryLocation}>
                {(id, d) => <input id={id} name="deliveryLocation" required placeholder="Site address or town" className="field" aria-invalid={!!e.deliveryLocation} aria-describedby={d} />}
              </Field>
            </div>
          </>
        )}

        {type === "dealer" && (
          <>
            <Field label="Business name" name="businessName" required error={e.businessName}>
              {(id, d) => <input id={id} name="businessName" autoComplete="organization" required className="field" aria-invalid={!!e.businessName} aria-describedby={d} />}
            </Field>
            <Field label="Years in business" name="yearsInBusiness" required error={e.yearsInBusiness}>
              {(id, d) => <input id={id} name="yearsInBusiness" type="number" min={0} inputMode="numeric" required className="field" aria-invalid={!!e.yearsInBusiness} aria-describedby={d} />}
            </Field>
            <Field label="Brands you currently deal in" name="currentBrands" error={e.currentBrands} hint="Optional">
              {(id, d) => <input id={id} name="currentBrands" className="field" aria-describedby={d} />}
            </Field>
            <Field label="Godown / storage capacity" name="storage" error={e.storage} hint="Optional, e.g. 2,000 bags">
              {(id, d) => <input id={id} name="storage" className="field" aria-describedby={d} />}
            </Field>
          </>
        )}

        {type === "visit" && (
          <>
            <Field label="Purpose" name="purpose" required error={e.purpose}>
              {(id, d) => (
                <select id={id} name="purpose" className="field" aria-describedby={d}>
                  {["Plant visit", "Meeting with marketing team", "Technical consultation"].map((s) => <option key={s}>{s}</option>)}
                </select>
              )}
            </Field>
            <Field label="Number of visitors" name="visitors" required error={e.visitors}>
              {(id, d) => <input id={id} name="visitors" type="number" min={1} max={50} defaultValue={1} required className="field" aria-invalid={!!e.visitors} aria-describedby={d} />}
            </Field>
            <Field label="Preferred date" name="preferredDate" required error={e.preferredDate} hint="Subject to confirmation by our team">
              {(id, d) => <input id={id} name="preferredDate" type="date" min={tomorrow()} required className="field" aria-invalid={!!e.preferredDate} aria-describedby={d} />}
            </Field>
            <Field label="Preferred time" name="slot" required error={e.slot}>
              {(id, d) => (
                <select id={id} name="slot" className="field" aria-describedby={d}>
                  <option>Morning (10:00–13:00)</option>
                  <option>Afternoon (14:00–17:00)</option>
                </select>
              )}
            </Field>
          </>
        )}

        {type === "career" && (
          <>
            <Field label="Position applied for" name="position" required error={e.position}>
              {(id, d) => <input id={id} name="position" required className="field" aria-invalid={!!e.position} aria-describedby={d} />}
            </Field>
            <Field label="Highest qualification" name="qualification" required error={e.qualification}>
              {(id, d) => <input id={id} name="qualification" required className="field" aria-invalid={!!e.qualification} aria-describedby={d} />}
            </Field>
            <Field label="Years of experience" name="experience" required error={e.experience}>
              {(id, d) => <input id={id} name="experience" type="number" min={0} step="0.5" required className="field" aria-invalid={!!e.experience} aria-describedby={d} />}
            </Field>
            <Field label="Resume (PDF or Word, max 3 MB)" name="resume" error={e.resume}>
              {(id, d) => <input id={id} name="resume" type="file" accept=".pdf,.doc,.docx" className="field file:mr-3 file:rounded-full file:border-0 file:bg-brand-mint file:px-3 file:py-1 file:font-bold" aria-describedby={d} />}
            </Field>
          </>
        )}

        <div className="sm:col-span-2">
          <Field label={type === "general" ? "Message" : "Anything else we should know?"} name="message" required={type === "general"} error={e.message}>
            {(id, d) => <textarea id={id} name="message" rows={4} required={type === "general"} className="field min-h-28" aria-invalid={!!e.message} aria-describedby={d} />}
          </Field>
        </div>
      </div>

      <div className="mt-6" data-field="consent">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate">
          <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand-deep)]" aria-invalid={!!e.consent} />
          <span>I agree that Panyam Cement may contact me about this enquiry. See our <a href="/privacy" className="font-semibold text-brand-deep underline">privacy policy</a>.</span>
        </label>
        {e.consent && <p className="mt-1.5 text-sm font-semibold text-[#b42318]">{e.consent}</p>}
      </div>

      <div id="form-status" ref={statusRef} tabIndex={-1} aria-live="assertive" className="mt-6 outline-none">
        {status.state === "error" && (
          <p className="flex items-start gap-2 rounded-xl bg-[#fef3f2] p-4 text-sm font-semibold text-[#b42318]">
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={busy} className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-brand-deep px-8 font-bold text-white transition-colors hover:bg-brand-night disabled:opacity-70 sm:w-auto">
        {busy ? <Loader2 aria-hidden className="h-5 w-5 animate-spin" /> : <Send aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />}
        {busy ? "Sending…" : type === "career" ? "Submit application" : "Send enquiry"}
      </button>
    </form>
  );
}
