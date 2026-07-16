"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: unknown;
  category?: string;
  publishedAt?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".blog-item");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const fallback = [
    {
      _id: "1",
      title: "Asia's First Documented All-White RTX 5090 Build",
      slug: { current: "asias-first-all-white-rtx-5090-build" },
      excerpt: "The ultimate CG workstation by CGplux Studios - built for cinematic production and 3D rendering.",
      category: "Blog",
      publishedAt: "2025-05-28",
    },
  ];

  const items = posts.length > 0 ? posts : fallback;

  return (
    <div ref={gridRef} className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      {items.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug.current}`}
          className="blog-item opacity-0 border border-slate-800 bg-white/[0.01] p-6 hover:bg-white/[0.03] hover:border-brand-accent/30 transition-all duration-500 group no-underline"
        >
          {post.category && (
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-3">
              {post.category}
            </div>
          )}
          <h3 className="font-extrabold tracking-tight text-xl mb-3 text-white group-hover:text-brand-accent/90 transition-colors duration-300">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-white/62 text-sm leading-relaxed mb-4">{post.excerpt}</p>
          )}
          {post.publishedAt && (
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
