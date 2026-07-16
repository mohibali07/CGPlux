import { defineType, defineField } from "sanity";

export const founderProfile = defineType({
  name: "founderProfile",
  title: "Founder Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Title", type: "string" }),
    defineField({ name: "designation", title: "Secondary Designation", type: "string" }),
    defineField({
      name: "bio",
      title: "Bio Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item is a separate paragraph in the bio.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
