import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import ProjectCards from "@/components/ProjectCards";
import ServiceGrid from "@/components/ServiceGrid";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import FounderSection from "@/components/FounderSection";
import BlogPreview from "@/components/BlogPreview";
import ContactCTA from "@/components/ContactCTA";
import {
  getProjects,
  getServices,
  getTestimonials,
  getSiteSettings,
  getFounderProfile,
  getClients,
  getBlogPosts,
} from "@/lib/sanity";

export default async function Home() {
  const [projects, services, testimonials, settings, founder, allClients, blogPosts] =
    await Promise.all([
      getProjects().catch(() => []),
      getServices().catch(() => []),
      getTestimonials().catch(() => []),
      getSiteSettings().catch(() => null),
      getFounderProfile().catch(() => null),
      getClients().catch(() => []),
      getBlogPosts().catch(() => []),
    ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <Hero
        eyebrow={settings?.heroEyebrow}
        title={settings?.heroTitle}
        titleStroke={settings?.heroTitleStroke}
        subtitle={settings?.heroSubtitle}
        activeClients={settings?.activeClients}
        pipeline={settings?.pipeline}
        nextUpdate={settings?.nextUpdate}
      />
      <AboutSection
        eyebrow={settings?.aboutEyebrow}
        title={settings?.aboutTitle}
        paragraphs={settings?.aboutParagraphs}
        stat={settings?.aboutStat}
        statLabel={settings?.aboutStatLabel}
      />
      <ClientsSection clients={clients} partners={partners} />
      <ProjectCards projects={projects} />
      <ServiceGrid services={services} />
      <TestimonialsSlider testimonials={testimonials} />
      <FounderSection
        name={founder?.name}
        role={founder?.role}
        designation={founder?.designation}
        bio={founder?.bio}
        photo={founder?.photo}
        instagramUrl={founder?.instagramUrl}
        linkedinUrl={founder?.linkedinUrl}
      />
      <BlogPreview posts={blogPosts} />
      <ContactCTA
        ctaTitle={settings?.ctaTitle}
        ctaSubtitle={settings?.ctaSubtitle}
        ctaEmail={settings?.ctaEmail}
      />
    </>
  );
}
