import { Metadata } from "next";
import ServicesShowcase from "@/components/ServicesShowcase";
import { getServices, getServicesPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Services | CGplux Studios",
  description: "What we build at CGplux Studios.",
};

export default async function ServicesPage() {
  const [services, servicesPage] = await Promise.all([
    getServices().catch(() => []),
    getServicesPage().catch(() => null),
  ]);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
          {servicesPage?.eyebrow || "What We Do"}
        </div>
        <h1 className="m-0 font-extrabold tracking-tight text-[48px] max-md:text-[36px]">
          {servicesPage?.title || "Services"}
        </h1>
        <p className="mt-4 m-0 text-white/72 max-w-[52ch] leading-[1.7]">
          {servicesPage?.subtitle || "Precision-driven design and development for creative studios and agencies."}
        </p>
      </div>
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <ServicesShowcase services={services} />
      </div>
    </section>
  );
}
