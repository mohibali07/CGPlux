import { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ClientsSection from "@/components/ClientsSection";
import ContactCTA from "@/components/ContactCTA";
import { getSiteSettings, getFounderProfile, getClients, getHomePage, getAboutPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us | CGplux Studios",
  description: "Learn more about CGplux Studios, our founders, and the clients we serve.",
};

export default async function AboutPage() {
  const [settings, founder, allClients, homePage, aboutPage] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFounderProfile().catch(() => null),
    getClients().catch(() => []),
    getHomePage().catch(() => null),
    getAboutPage().catch(() => null),
  ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <div className="pt-20 pb-10 px-6 lg:px-12 max-w-[1400px] mx-auto text-center border-b border-white/[0.04]">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-4">
          {aboutPage?.eyebrow || "Who We Are"}
        </div>
        <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] text-white">
          {aboutPage?.title || "About CGplux Studios"}
        </h1>
      </div>

      <AboutSection
        eyebrow={homePage?.aboutEyebrow}
        title={homePage?.aboutTitle}
        paragraphs={homePage?.aboutParagraphs}
        stat={homePage?.aboutStat}
        statLabel={homePage?.aboutStatLabel}
      />
      <FounderSection
        name={founder?.name}
        role={founder?.role}
        designation={founder?.designation}
        bio={founder?.bio}
        photo={founder?.photo}
        instagramUrl={founder?.instagramUrl}
        linkedinUrl={founder?.linkedinUrl}
      />
      <ClientsSection clients={clients} partners={partners} />
      <ContactCTA
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
