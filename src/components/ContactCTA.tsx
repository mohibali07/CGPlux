"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ContactCTAProps {
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaEmail?: string;
}

export default function ContactCTA({ ctaTitle, ctaSubtitle, ctaEmail }: ContactCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        const children = cardRef.current.children;
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const email = ctaEmail || "hello@kanvasdigital.com";

  return (
    <section ref={sectionRef} className="pt-[30px] pb-[6rem]">
      <div className="w-full max-w-[1920px] mx-auto px-6">
        <div
          ref={cardRef}
          className="border border-slate-800 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-5 flex items-center justify-between gap-5 relative overflow-hidden max-md:flex-col max-md:items-start"
        >
          {/* Accent glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="opacity-0">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90">
              Contact
            </div>
            <h3 className="mt-2.5 mb-2 text-[28px] tracking-tight font-extrabold">
              {ctaTitle || "Start a project"}
            </h3>
            <p className="m-0 text-white/72 leading-[1.7] max-w-[60ch]">
              {ctaSubtitle || "We'll respond with a deck and a plan—built on your grid, not generic templates."}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap opacity-0">
            <Link
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2.5 h-[44px] px-4 rounded-sm font-mono text-xs uppercase tracking-[0.12em] no-underline border border-brand-accent/35 bg-brand-accent/12 text-brand-accent/98 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-accent/18 hover:shadow-[0_0_20px_rgba(125,211,252,0.15)]"
            >
              Email Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 h-[44px] px-4 rounded-sm font-mono text-xs uppercase tracking-[0.12em] no-underline border border-white/18 bg-white/[0.02] text-white/86 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(125,211,252,0.1)]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
