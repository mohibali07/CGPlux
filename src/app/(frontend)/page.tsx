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
  getHomePage,
} from "@/lib/sanity";

export default async function Home() {
  const [projects, services, testimonials, settings, founder, allClients, blogPosts, homePage] =
    await Promise.all([
      getProjects().catch(() => []),
      getServices().catch(() => []),
      getTestimonials().catch(() => []),
      getSiteSettings().catch(() => null),
      getFounderProfile().catch(() => null),
      getClients().catch(() => []),
      getBlogPosts().catch(() => []),
      getHomePage().catch(() => null),
    ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <Hero
        eyebrow={homePage?.heroEyebrow}
        title={homePage?.heroTitle}
        titleStroke={homePage?.heroTitleStroke}
        subtitle={homePage?.heroSubtitle}
        projectsDelivered={homePage?.projectsDelivered || "150+"}
        techStack={homePage?.techStack || "Web • Mobile • AI"}
        successRate={homePage?.successRate || "100%"}
      />
      <AboutSection
        eyebrow={homePage?.aboutEyebrow}
        title={homePage?.aboutTitle}
        paragraphs={homePage?.aboutParagraphs}
        stat={homePage?.aboutStat}
        statLabel={homePage?.aboutStatLabel}
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
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
