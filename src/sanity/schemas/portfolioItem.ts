import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "3D Animation", value: "3d-animation" },
          { title: "3D Visualization", value: "3d-visualization" },
          { title: "3D Architectural", value: "3d-architectural" },
          { title: "CGI Advertisement", value: "cgi-advertisement" },
          { title: "Motion Graphics", value: "motion-graphics" },
          { title: "Visual Effects", value: "visual-effects" },
        ],
      },
    }),
    defineField({
      name: "excerpt",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
