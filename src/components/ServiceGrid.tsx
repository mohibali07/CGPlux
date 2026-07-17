"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

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
  const imageRef = useRef<HTMLDivElement>(null);

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

  // Animation on activeIdx change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Typography List */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="mb-16 md:mb-24">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              Our Services
            </div>
            <h2 className="font-heading font-medium tracking-tight text-[48px] md:text-[64px] leading-[1.1] text-white">
              What We Do Best.
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {items.map((service, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div key={service._id} className="flex flex-col border-b border-white/[0.05] pb-4 md:pb-6 last:border-0">
                  <button
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="group flex items-center gap-6 md:gap-8 text-left cursor-pointer w-full"
                  >
                    <span
                      className={`font-mono text-sm tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? "text-brand-accent" : "text-white/20 group-hover:text-white/40"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`font-heading text-3xl md:text-[42px] font-bold tracking-tight transition-all duration-500 ${
                        isActive ? "text-white translate-x-2 md:translate-x-4" : "text-white/20 group-hover:text-white/50"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </button>
                  
                  {/* Expanded Content (Tags & CTA) */}
                  <div
                    className={`pl-14 md:pl-[4.5rem] overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-[200px] mt-6 md:mt-8 opacity-100" : "max-h-0 mt-0 opacity-0"
                    }`}
                  >
                    {service.tags && (
                      <div className="flex flex-wrap gap-3 mb-6 md:mb-8">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-white/60 bg-white/[0.02]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <button className="inline-flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent transition-colors duration-300">
                      Explore Service <span className="text-brand-accent text-lg leading-none">&rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="lg:w-1/2 flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
          <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full max-h-[850px] overflow-hidden bg-black/50 border border-white/[0.08]">
            {items[activeIdx].image ? (
              <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image
                  src={
                    typeof items[activeIdx].image === "string"
                      ? items[activeIdx].image
                      : urlFor(items[activeIdx].image).width(1200).height(1600).url()
                  }
                  alt={items[activeIdx].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-700 ease-out"
                  priority
                />
              </div>
            ) : (
              <div ref={imageRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
                 <span className="font-mono text-xs text-white/20 uppercase tracking-[0.2em]">No Media Found</span>
              </div>
            )}
            
            {/* Minimal Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 z-10"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30 z-10"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30 z-10"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 z-10"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
