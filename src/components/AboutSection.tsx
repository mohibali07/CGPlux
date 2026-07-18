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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-48 relative overflow-hidden bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div ref={textRef} className="w-full max-w-4xl">
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
              <p key={i} className="about-paragraph text-white/70 text-lg md:text-xl xl:text-[22px] leading-[1.6] font-light">
                {para}
              </p>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
