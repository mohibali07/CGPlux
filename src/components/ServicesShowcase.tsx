"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Service {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: any;
  slug?: { current: string };
}

interface ServicesShowcaseProps {
  services: Service[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const fallback = [
    { title: "Software Development", slug: { current: "software-development" }, description: "End-to-end custom software solutions engineered for scale and performance.", tags: ["Custom Apps", "Enterprise", "APIs"], image: "/images/services/software_development.png" },
    { title: "Graphic Design", slug: { current: "graphic-design" }, description: "Striking visual identities that communicate your brand's unique story and values.", tags: ["Branding", "UI/UX", "Visual Identity"], image: "/images/services/graphic_design.png" },
    { title: "SEO", slug: { current: "seo" }, description: "Data-driven optimization strategies to dominate search rankings and drive organic traffic.", tags: ["Ranking", "Optimization", "Content"], image: "/images/services/seo.png" },
    { title: "Web Development", slug: { current: "web-development" }, description: "High-performance, immersive web experiences built with modern frameworks.", tags: ["React", "Next.js", "E-commerce"], image: "/images/services/web_development.png" },
    { title: "Digital Marketing", slug: { current: "digital-marketing" }, description: "Targeted campaigns that maximize ROI and accelerate brand growth across digital channels.", tags: ["Campaigns", "Social Media", "Growth"], image: "/images/services/digital_marketing.png" },
    { title: "3D Animation", slug: { current: "3d-animation" }, description: "Cinematic 3D visuals and CGI that push the boundaries of digital reality.", tags: ["3D Visualization", "Architectural", "CGI"], image: "/images/services/3d.png" },
  ];

  const items: Service[] =
    services.length > 0
      ? services
      : fallback.map((f, i) => ({ _id: String(i), ...f }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation for the container
      gsap.fromTo(
        ".showcase-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-12 md:gap-24 pb-32 pt-16">
      {items.map((service, index) => {
        // Calculate a top offset so the cards stack neatly, revealing the top edge of the cards below
        const topOffset = `calc(6rem + ${index * 2.5}rem)`;
        
        return (
          <div 
            key={service._id}
            className="showcase-card sticky z-10 w-full"
            style={{ top: topOffset }}
          >
            <div className="relative w-full aspect-[4/5] md:aspect-[21/9] lg:h-[75vh] min-h-[500px] rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] bg-black group flex flex-col justify-end p-8 md:p-16 lg:p-20">
              
              {/* Background Image with Parallax & Hover Effects */}
              <div className="absolute inset-0 w-full h-full transform-style-3d overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-700 group-hover:bg-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.1),transparent_50%)] z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                
                {service.image ? (
                  <Image
                    src={
                      typeof service.image === "string"
                        ? service.image
                        : urlFor(service.image).width(1920).height(1080).url()
                    }
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-cover filter grayscale-[0.8] brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    priority={index < 2}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                )}
              </div>

              {/* Content Overlay */}
              <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)]">
                
                <div className="flex-1 max-w-3xl">
                  <div className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-brand-accent mb-4 md:mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-brand-accent"></span>
                    Service 0{index + 1}
                  </div>
                  <h2 className="font-heading font-extrabold tracking-tighter text-[40px] md:text-[64px] lg:text-[80px] leading-[1] text-white mb-6 group-hover:text-brand-accent transition-colors duration-500">
                    {service.title}
                  </h2>
                  <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description || "Comprehensive solutions tailored to elevate your brand's digital presence."}
                  </p>
                  
                  {service.tags && (
                    <div className="flex flex-wrap gap-3">
                      {service.tags.map((tag) => (
                        <span key={tag} className="px-5 py-2 border border-white/20 rounded-full text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/80 bg-black/40 backdrop-blur-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 mb-2">
                  <Link
                    href={service.slug ? `/services/${service.slug.current}` : '#'}
                    className="group/btn inline-flex items-center gap-6 px-8 py-5 rounded-full bg-white text-black font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-brand-accent hover:text-white transition-all duration-500 overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      Explore Full Detail
                      <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
