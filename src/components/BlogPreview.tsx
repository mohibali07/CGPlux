"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { urlFor } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slug?: { current: string };
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  category?: string;
  publishedAt?: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
}

const fallbackPosts: BlogPost[] = [
  {
    _id: "b1",
    title: "Asia's First All-White RTX 5090 CG Workstation",
    category: "Blog",
    excerpt: "Building the ultimate CG workstation for cinematic production and 3D rendering.",
    publishedAt: "2025-05-28",
  },
  {
    _id: "b2",
    title: "The Future of CGI in Advertising",
    category: "Blog",
    excerpt: "How cinematic CGI is reshaping modern brand storytelling and visual marketing.",
    publishedAt: "2025-04-12",
  },
  {
    _id: "b3",
    title: "Inside Our Creative Pipeline",
    category: "News",
    excerpt: "A look at the tools and workflows behind our latest productions.",
    publishedAt: "2025-03-05",
  },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : fallbackPosts;

  return (
    <section ref={ref} className="py-[6rem] border-t border-slate-800/50">
      <div className="w-full max-w-[1920px] mx-auto px-6">
        <div className="flex items-end justify-between gap-8 mb-10 max-md:flex-col max-md:items-start">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
              From the Blog
            </div>
            <h2 className="font-extrabold tracking-tight text-[40px]">Latest Insights</h2>
          </div>
          <Link
            href="/blog"
            className="text-brand-accent/95 no-underline font-mono text-xs uppercase tracking-[0.14em] hover:underline transition-all duration-300"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-px max-lg:grid-cols-2 max-md:grid-cols-1">
          {displayPosts.map((post) => (
            <Link
              key={post._id}
              href={post.slug ? `/blog/${post.slug.current}` : "#"}
              className="blog-card opacity-0 border border-slate-800 bg-white/[0.01] overflow-hidden hover:bg-white/[0.03] transition-all duration-500 group cursor-pointer no-underline"
            >
              {/* Post image */}
              {post.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={urlFor(post.image).width(600).height(340).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-3">
                  {post.category}
                </div>
                <h3 className="font-extrabold tracking-tight text-lg mb-3 group-hover:text-brand-accent/90 transition-colors duration-300 text-white">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-white/62 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                )}
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
