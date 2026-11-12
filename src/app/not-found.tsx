import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="blueprint-grid grid min-h-[80svh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="eyebrow text-brand-deep">Error 404</p>
        <h1 className="display-lg mt-4">This road isn’t <span className="story-italic font-normal text-brand-deep">built yet.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-slate">The page you’re looking for has moved or doesn’t exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/">Back to home</MagneticButton>
          <MagneticButton href="/contact" variant="ghost-dark">Contact us</MagneticButton>
        </div>
      </div>
    </section>
  );
}
