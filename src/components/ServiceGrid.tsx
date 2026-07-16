"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Service {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: any;
}

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const fallback = [
    { title: "Software Development", tags: ["Custom Apps", "Enterprise", "APIs"], image: "/images/services/software_development.png" },
    { title: "Graphic Design", tags: ["Branding", "UI/UX", "Visual Identity"], image: "/images/services/graphic_design.png" },
    { title: "SEO", tags: ["Ranking", "Optimization", "Content"], image: "/images/services/seo.png" },
    { title: "Web Development", tags: ["React", "Next.js", "E-commerce"], image: "/images/services/web_development.png" },
    { title: "Digital Marketing", tags: ["Campaigns", "Social Media", "Growth"], image: "/images/services/digital_marketing.png" },
    { title: "3D Animation", tags: ["3D Visualization", "Architectural", "CGI"], image: "/images/services/3d.png" },
  ];

  const items: Service[] =
    services.length > 0
      ? services
      : fallback.map((f, i) => ({ _id: String(i), title: f.title, tags: f.tags, image: f.image }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animation on activeIdx change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0.2 },
        { scale: 1, opacity: 0.6, duration: 0.8, ease: "power2.out" }
      );
    }
    
    if (textRef.current) {
      const children = textRef.current.children;
      gsap.fromTo(
        children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section ref={sectionRef} className="py-[6rem]">
      <div ref={headerRef} className="w-full max-w-[1920px] mx-auto px-6 flex items-end justify-between gap-8 mb-10 max-md:flex-col max-md:items-start">
        <div className="opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Our Services
          </div>
          <h2 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px]">
            What We Do Best
          </h2>
        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 border border-slate-800 flex flex-col lg:flex-row bg-white/[0.01]">
        {/* Left List */}
        <div className="lg:w-[35%] border-b lg:border-b-0 lg:border-r border-slate-800 divide-y divide-slate-800">
          {items.map((service, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={service._id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`w-full flex items-center justify-between px-7 py-5 min-h-[72px] text-left transition-colors duration-400 group cursor-pointer ${
                  isActive ? "bg-brand-accent/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`text-[10px] tabular-nums font-mono tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-brand-accent" : "text-white/40"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[16px] font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(125,211,252,0.5)]"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Panel */}
        <div className="flex-1 relative overflow-hidden min-h-[400px] lg:min-h-[600px] group/panel bg-brand-dark">
          {items[activeIdx].image && (
            <div className="absolute inset-0">
              <Image
                ref={(el) => { imageRef.current = el; }}
                src={
                  typeof items[activeIdx].image === "string"
                    ? items[activeIdx].image
                    : urlFor(items[activeIdx].image).width(1200).height(800).url()
                }
                alt={items[activeIdx].title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover opacity-40 grayscale group-hover/panel:grayscale-0 group-hover/panel:opacity-90 transition-all duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/70 to-brand-dark/30 group-hover/panel:from-brand-dark/70 group-hover/panel:via-brand-dark/30 group-hover/panel:to-transparent transition-colors duration-700 ease-out" />
            </div>
          )}

          <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-between z-10 pointer-events-none">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-full border border-white/[0.1] flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm">
                <span className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase">0{activeIdx + 1}</span>
              </div>
              <span
                className="font-extrabold text-white/[0.03] select-none"
                style={{ fontSize: "clamp(80px, 12vw, 160px)", lineHeight: 1, letterSpacing: "-0.05em" }}
              >
                0{activeIdx + 1}
              </span>
            </div>

            <div ref={textRef} className="max-w-[500px] pointer-events-auto">
              <p className="text-[11px] text-brand-accent/80 uppercase tracking-[0.28em] font-mono mb-4">
                0{activeIdx + 1} / 0{items.length}
              </p>
              <h3 className="text-white font-extrabold tracking-tight mb-6" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1 }}>
                {items[activeIdx].title}
              </h3>
              {items[activeIdx].tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {items[activeIdx].tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 border border-white/10 rounded-sm text-[12px] text-white/70 bg-white/[0.02]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <button className="group inline-flex items-center gap-2.5 text-[13px] text-brand-accent hover:text-white transition-colors duration-300">
                <span className="border-b border-brand-accent/30 group-hover:border-white/50 pb-1 transition-colors">
                  Explore Service
                </span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  &nearr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
