"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

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
    day: "2-digit",
  });
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ref.current, 
            start: "top 80%",
            toggleActions: "play none none none" 
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : fallbackPosts;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              From the Blog
            </div>
            <h2 className="font-heading font-medium tracking-tight text-[48px] md:text-[64px] leading-[1.1] text-white">
              Latest Insights.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent transition-colors duration-300 md:mb-4"
          >
            View All <span className="text-brand-accent text-lg leading-none transform transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Minimal Typographic Rows */}
        <div className="flex flex-col border-t border-white/[0.05]">
          {displayPosts.map((post) => (
            <Link
              key={post._id}
              href={post.slug ? `/blog/${post.slug.current}` : "#"}
              className="blog-card opacity-0 group flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 md:py-12 border-b border-white/[0.05] hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-500 no-underline cursor-pointer"
            >
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-32 flex-1">
                {/* Date */}
                <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/30 w-32 shrink-0 group-hover:text-brand-accent transition-colors duration-500">
                  {formatDate(post.publishedAt)}
                </div>
                
                {/* Title & Category */}
                <div className="flex flex-col gap-3 md:gap-4">
                   <h3 className="font-heading text-2xl md:text-[32px] lg:text-[40px] font-bold tracking-tight text-white/70 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-2">
                     {post.title}
                   </h3>
                   {post.category && (
                     <div className="flex items-center gap-3">
                       <span className="w-4 h-[1px] bg-white/20 group-hover:bg-brand-accent transition-colors"></span>
                       <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-brand-accent transition-colors">
                         {post.category}
                       </span>
                     </div>
                   )}
                </div>
              </div>

              {/* Hover Arrow Indicator */}
              <div className="hidden md:flex items-center shrink-0">
                 <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-brand-accent group-hover:text-brand-dark group-hover:border-brand-accent transition-all duration-500 transform group-hover:-rotate-45">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </div>
              </div>

            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
