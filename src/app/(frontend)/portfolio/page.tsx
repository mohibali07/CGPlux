import { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Portfolio | CGplux Studios",
  description: "Selected work from CGplux Studios studios.",
};

export default async function PortfolioPage() {
  const items = await getPortfolioItems().catch(() => []);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
