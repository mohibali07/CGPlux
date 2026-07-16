import { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Portfolio | Kanvas Digital",
  description: "Selected work from Kanvas Digital studios.",
};

export default async function PortfolioPage() {
  const items = await getPortfolioItems().catch(() => []);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1920px] mx-auto px-6">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
