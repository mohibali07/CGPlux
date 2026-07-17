import { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";
import { getTeamMembers, getTeamPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Our Team | CGplux Studios",
  description: "Meet the team behind CGplux Studios.",
};

export default async function OurTeamPage() {
  const [members, teamPage] = await Promise.all([
    getTeamMembers().catch(() => []),
    getTeamPage().catch(() => null),
  ]);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            {teamPage?.eyebrow || "Our Team"}
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-4">
            {teamPage?.title || "The People Behind the Vision"}
          </h1>
          <p className="text-white/72 max-w-[55ch] leading-[1.7]">
            {teamPage?.subtitle || "A team of skilled artists combining creativity with advanced technology to produce high-quality animations and visual content."}
          </p>
        </div>
        <TeamGrid members={members} />
      </div>
    </section>
  );
}
