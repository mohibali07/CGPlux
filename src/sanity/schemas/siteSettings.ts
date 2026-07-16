import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ─── General ──────────────────────────────────────────────
    defineField({ name: "title", title: "Site Title", type: "string" }),

    // ─── Hero ─────────────────────────────────────────────────
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow Text", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroTitleStroke", title: "Hero Title (Stroke Part)", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 3 }),
    defineField({ name: "activeClients", title: "Active Clients (KPI)", type: "string" }),
    defineField({ name: "pipeline", title: "Pipeline (KPI)", type: "string" }),
    defineField({ name: "nextUpdate", title: "Next Update Date", type: "string" }),

    // ─── About Section ────────────────────────────────────────
    defineField({ name: "aboutEyebrow", title: "About Eyebrow", type: "string" }),
    defineField({ name: "aboutTitle", title: "About Studio Name / Title", type: "string" }),
    defineField({
      name: "aboutParagraphs",
      title: "About Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item is a separate paragraph in the About section.",
    }),
    defineField({ name: "aboutStat", title: "About Stat Number (e.g. 10+)", type: "string" }),
    defineField({ name: "aboutStatLabel", title: "About Stat Label (e.g. Years of Experience)", type: "string" }),

    // ─── Contact CTA ──────────────────────────────────────────
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string" }),
    defineField({ name: "ctaSubtitle", title: "CTA Subtitle", type: "text", rows: 2 }),
    defineField({ name: "ctaEmail", title: "CTA Email Address", type: "string" }),

    // ─── Contact Page ─────────────────────────────────────────
    defineField({ name: "contactPhone", title: "Contact Phone", type: "string" }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "contactAddress", title: "Contact Address", type: "text", rows: 3 }),

    // ─── Social Links ─────────────────────────────────────────
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "behanceUrl", title: "Behance URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
