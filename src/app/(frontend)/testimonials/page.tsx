import { Metadata } from "next";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { getTestimonials } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Testimonials | CGplux Studios",
  description: "What our clients say about working with CGplux Studios.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => []);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-10 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
          Client Voices
        </div>
        <h1 className="m-0 font-extrabold tracking-tight text-[48px] max-md:text-[36px]">
          Testimonials
        </h1>
        <p className="mt-4 m-0 text-white/72 max-w-[52ch] leading-[1.7] mx-auto">
          Hear from the teams and founders we&apos;ve partnered with.
        </p>
      </div>
      <TestimonialsSlider testimonials={testimonials} />
    </section>
  );
}
