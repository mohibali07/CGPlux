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

      const titleLines = gsap.utils.toArray(".hero-title-line");
      tl.fromTo(
        titleLines,
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.15 },
        0.4
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
    <section ref={sectionRef} className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Abstract Parallax Background */}
      <div className="hero-parallax-bg absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-brand-accent/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div ref={textContainerRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="hero-eyebrow font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 mb-8 sm:mb-12">
          {eyebrow}
        </div>
        
        <h1 className="m-0 font-heading font-extrabold tracking-tighter text-[12vw] sm:text-[8vw] lg:text-[100px] leading-[0.9] uppercase" style={{ perspective: "1000px" }}>
          <div className="hero-title-line overflow-hidden pb-2">
            <span className="inline-block text-white">Crafting digital worlds</span>
          </div>
          <div className="hero-title-line overflow-hidden">
            <span className="inline-block text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
              {titleStroke}
            </span>
          </div>
        </h1>

        <p className="hero-subtitle mt-8 sm:mt-12 text-white/60 max-w-[60ch] text-sm sm:text-base md:text-lg leading-[1.8] font-light">
          {subtitle}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link
            href="/projects"
            className="hero-button magnetic relative inline-flex items-center justify-center h-[54px] px-8 rounded-full font-mono text-xs uppercase tracking-[0.15em] bg-white text-black transition-transform duration-300 hover:scale-105"
          >
            View Work
          </Link>
          <Link
            href="/services"
            className="hero-button magnetic relative inline-flex items-center justify-center h-[54px] px-8 rounded-full font-mono text-xs uppercase tracking-[0.15em] border border-white/20 text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="font-mono text-[10px] uppercase tracking-widest rotate-90 translate-y-[-10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
