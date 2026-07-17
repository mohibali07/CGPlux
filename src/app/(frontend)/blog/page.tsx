import { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { getBlogPosts } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog | CGplux Studios",
  description: "Insights, news, and tutorials from CGplux Studios.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Blog
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-4">
            Latest Insights
          </h1>
          <p className="text-white/72 max-w-[55ch] leading-[1.7]">
            Thoughts on CGI, VFX, and the future of digital production.
          </p>
        </div>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
