import { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems, getPortfolioPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Portfolio | CGplux Studios",
  description: "Selected work from CGplux Studios studios.",
};

export default async function PortfolioPage() {
  const [items, portfolioPage] = await Promise.all([
    getPortfolioItems().catch(() => []),
    getPortfolioPage().catch(() => null),
  ]);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
          {portfolioPage?.eyebrow || "Our Work"}
        </div>
        <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-4">
          {portfolioPage?.title || "Portfolio"}
        </h1>
        {portfolioPage?.subtitle && (
          <p className="text-white/72 max-w-[55ch] leading-[1.7]">
            {portfolioPage.subtitle}
          </p>
        )}
      </div>
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
