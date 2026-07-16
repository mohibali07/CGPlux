"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  category?: string;
  excerpt?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

const categories = [
  { label: "All", value: "" },
  { label: "3D Animation", value: "3d-animation" },
  { label: "3D Visualization", value: "3d-visualization" },
  { label: "3D Architectural", value: "3d-architectural" },
  { label: "CGI Advertisement", value: "cgi-advertisement" },
  { label: "Motion Graphics", value: "motion-graphics" },
];

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter
    ? items.filter((item) => item.category === activeFilter)
    : items;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".portfolio-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [activeFilter]);

  const fallback = [
    { title: "Dream Glaze CGI Animation", category: "3d-animation" },
    { title: "Valentino Uomo Perfume 3D", category: "3d-animation" },
    { title: "3D Visualization For Baaroq", category: "3d-visualization" },
    { title: "Ultra Realistic 3D Product Rendering", category: "3d-visualization" },
    { title: "Rolex Submarine Watch 3D", category: "3d-animation" },
    { title: "3D Animation Of Shoes", category: "3d-animation" },
  ];

  const displayItems: PortfolioItem[] = items.length > 0
    ? filtered
    : fallback
        .filter((f) => !activeFilter || f.category === activeFilter)
        .map((f, i) => ({ _id: String(i), title: f.title, slug: { current: f.title.toLowerCase().replace(/\s+/g, "-") }, category: f.category }));

  return (
    <>
      <div ref={headerRef}>
        <div className="opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Portfolio
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-6">
            Our Work
          </h1>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 opacity-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`
                font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-sm border cursor-pointer
                transition-all duration-300 ease-out
                ${
                  activeFilter === cat.value
                    ? "border-brand-accent/55 bg-brand-accent/[0.08] text-brand-accent"
                    : "border-white/[0.18] bg-transparent text-white/62 hover:border-brand-accent/30 hover:text-white/90"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-3 gap-px max-lg:grid-cols-2 max-md:grid-cols-1">
        {displayItems.map((item) => (
          <div
            key={item._id}
            className="portfolio-card opacity-0 relative aspect-[3/4] bg-white/[0.02] border border-slate-800 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(600).height(800).url()}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(600px 400px at ${30 + Math.random() * 40}% ${20 + Math.random() * 30}%, rgba(125,211,252,0.15), rgba(0,0,0,0) 60%), linear-gradient(135deg, rgba(148,163,184,0.1), rgba(11,13,17,0.3))`,
                    filter: "saturate(0.9) grayscale(0.2)",
                  }}
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {item.category && (
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-2">
                  {categories.find((c) => c.value === item.category)?.label || item.category}
                </div>
              )}
              <div className="font-extrabold tracking-tight text-lg">{item.title}</div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(125,211,252,0.06)]" />
          </div>
        ))}
      </div>
    </>
  );
}
