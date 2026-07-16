"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  titleStroke?: string;
  subtitle?: string;
  activeClients?: string;
  pipeline?: string;
  nextUpdate?: string;
}

export default function Hero({
  eyebrow = "Atmospheric / Cinematic / Grid-Aligned",
  title = "Crafting digital worlds",
  titleStroke = "with precision",
  subtitle = "Kanvas Digital is a dark-mode system for creative studios: monospace metadata, sharp geometry, glass depth, and heavy interactions.",
  activeClients = "12",
  pipeline = "24/7",
  nextUpdate = "Aug 01",
}: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.2 }
      );

      const titleLines = gsap.utils.toArray(".hero-title-line > span");
      tl.fromTo(
        titleLines,
        { y: "150%", opacity: 0, rotateZ: 3 },
        { y: "0%", opacity: 1, rotateZ: 0, duration: 1.4, ease: "expo.out", stagger: 0.15 },
        0.3
      );

      tl.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        0.8
      );

      tl.fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        1
      );

      // Parallax effect on scroll
      gsap.to(".hero-parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textContainerRef.current, {
        yPercent: 15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden border-b border-white/[0.05]">
      {/* Elegant Atmospheric Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#020202]">
        <div className="hero-parallax-bg absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-brand-accent/[0.08] rounded-full blur-[120px] mix-blend-screen opacity-60" />
        <div className="hero-parallax-bg absolute bottom-[10%] -left-[10%] w-[50vw] h-[50vw] bg-white/[0.03] rounded-full blur-[100px] mix-blend-screen opacity-40" />
      </div>

      <div ref={textContainerRef} className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pt-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-24 w-full">
          
          {/* Main Title Left */}
          <div className="max-w-[900px] flex-1">
            <div className="hero-eyebrow flex items-center gap-4 mb-8 sm:mb-12">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-accent">
                {eyebrow.replace(/\//g, "•")}
              </span>
            </div>
            
            <h1 className="m-0 font-heading font-medium tracking-tight text-[13vw] sm:text-[10vw] lg:text-[110px] leading-[0.9] flex flex-col">
              <div className="hero-title-line overflow-hidden pb-2">
                <span className="inline-block text-white">Crafting</span>
              </div>
              <div className="hero-title-line overflow-hidden flex items-center gap-4 sm:gap-8 pb-2">
                <span className="inline-block text-outline italic pr-4">Digital</span>
                <span className="hidden md:inline-block h-[1px] w-[60px] lg:w-[120px] bg-white/30"></span>
              </div>
              <div className="hero-title-line overflow-hidden pb-2">
                <span className="inline-block text-white font-bold">Worlds.</span>
              </div>
            </h1>
          </div>

          {/* Subtitle & CTA Right */}
          <div className="max-w-[420px] flex flex-col items-start lg:items-start pb-4">
            <p className="hero-subtitle text-slate-400 text-sm sm:text-base leading-[1.8] font-light mb-10">
              {subtitle}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="hero-button group relative inline-flex items-center justify-center h-[54px] px-8 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] bg-white text-black overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Work</span>
              </Link>
              
              <Link href="#about" className="hero-button w-[54px] h-[54px] rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-white/40 transition-all">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
