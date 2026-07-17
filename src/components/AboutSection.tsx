"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AboutProps {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  stat?: string;
  statLabel?: string;
}

export default function AboutSection({ eyebrow, title, paragraphs, stat, statLabel }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  const defaultParagraphs = [
    "is a Media production studio, specializing in cinematic CGI, visual effects, TV Commercials and high end digital content for modern brands.",
    "Founded by CEO Syed Ali Murtaza Jaffery, the studio is built on a passion for innovation, detail, and visual storytelling. We focus on creating impactful and visually refined experiences that help brands communicate in a more powerful and engaging way.",
    "Our team of skilled artists combines creativity with advanced technology to produce high quality animations and visual effects for commercials, advertising campaigns, and digital media content.",
    "Our vision is to grow into a globally recognized production studio, setting new standards in cinematic advertising and 3D content creation.",
  ];

  const displayParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : defaultParagraphs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow and title reveal
      gsap.fromTo(
        ".about-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Paragraph lines reveal
      const pElements = gsap.utils.toArray(".about-paragraph");
      gsap.fromTo(
        pElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%" },
        }
      );

      // Stat box parallax
      gsap.fromTo(
        statRef.current,
        { y: 100, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-48 relative overflow-hidden bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20 lg:gap-32 items-center">
        
        <div ref={textRef} className="order-2 lg:order-1">
          <div className="about-header">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              {eyebrow || "About Us"}
            </div>
            <h2 className="font-heading font-extrabold tracking-tighter text-[40px] md:text-[60px] leading-[1.1] mb-12 text-white">
              {title || "CGplux Studios"}
            </h2>
          </div>
          
          <div className="space-y-8">
            {displayParagraphs.map((para, i) => (
              <p key={i} className="about-paragraph text-white/70 text-lg md:text-xl xl:text-2xl leading-[1.6] font-light">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div ref={statRef} className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl border border-white/[0.08] bg-black/50 overflow-hidden flex items-center justify-center group">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 text-center transform transition-transform duration-700 ease-out group-hover:-translate-y-2">
              <div className="font-heading font-extrabold text-[120px] md:text-[150px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 group-hover:from-brand-accent group-hover:to-brand-accent/20 transition-colors duration-700">
                {stat || "10+"}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mt-4 group-hover:text-white/80 transition-colors duration-700">
                {statLabel || "Years of Experience"}
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20 transition-colors duration-500 group-hover:border-brand-accent/50" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20 transition-colors duration-500 group-hover:border-brand-accent/50" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20 transition-colors duration-500 group-hover:border-brand-accent/50" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20 transition-colors duration-500 group-hover:border-brand-accent/50" />
          </div>
        </div>
        
      </div>
    </section>
  );
}
