import { z } from "zod";
import { products } from "@/data/products";

export const enquiryTypes = {
  general: "General enquiry",
  quote: "Request a quote",
  dealer: "Become a dealer",
  visit: "Book a plant visit / meeting",
  career: "Career application",
} as const;
export type EnquiryType = keyof typeof enquiryTypes;

const productSlugs = products.map((p) => p.slug) as [string, ...string[]];
const phone = z.string().trim().transform((v) => v.replace(/[\s-]/g, "")).pipe(z.string().regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"));
const name = z.string().trim().min(2, "Please enter your name").max(80);
const optionalEmail = z.union([z.literal(""), z.email("Enter a valid email address")]).optional();

const base = z.object({
  name,
  phone,
  email: optionalEmail,
  city: z.string().trim().min(2, "Please enter your city or district").max(80),
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.literal("on", { error: "Please agree so we can contact you" }),
  // honeypot — must stay empty
  website: z.string().max(0).optional(),
});

export const schemas = {
  general: base.extend({
    type: z.literal("general"),
    subject: z.enum(["Product information", "Order status", "Technical support", "Feedback", "Other"]),
    message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(2000),
  }),
  quote: base.extend({
    type: z.literal("quote"),
    customerType: z.enum(["Individual home builder", "Contractor", "Builder / developer", "Dealer", "Government / institution"]),
    items: z
      .array(z.object({ product: z.enum(productSlugs), bags: z.coerce.number().int().min(1, "Minimum 1 bag").max(100000) }))
      .min(1, "Add at least one product"),
    deliveryLocation: z.string().trim().min(3, "Please enter the delivery location").max(160),
    requiredBy: z.string().optional().default(""),
  }),
  dealer: base.extend({
    type: z.literal("dealer"),
    businessName: z.string().trim().min(2, "Please enter your business name").max(120),
    yearsInBusiness: z.coerce.number().int().min(0).max(100),
    currentBrands: z.string().trim().max(200).optional().default(""),
    storage: z.string().trim().max(80).optional().default(""),
  }),
  visit: base.extend({
    type: z.literal("visit"),
    purpose: z.enum(["Plant visit", "Meeting with marketing team", "Technical consultation"]),
    preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date").refine((d) => new Date(d) > new Date(), "Please choose a future date"),
    slot: z.enum(["Morning (10:00–13:00)", "Afternoon (14:00–17:00)"]),
    visitors: z.coerce.number().int().min(1).max(50),
  }),
  career: base.extend({
    type: z.literal("career"),
    email: z.email("Enter a valid email address"),
    position: z.string().trim().min(2, "Please enter the role you are applying for").max(120),
    experience: z.coerce.number().min(0).max(50),
    qualification: z.string().trim().min(2, "Please enter your qualification").max(120),
  }),
} as const;

export type EnquiryPayload = z.infer<(typeof schemas)[EnquiryType]>;
