"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: any;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const fallback: Testimonial[] = [
    {
      _id: "1",
      quote:
        "\u201cKanvas delivered a system that feels cinematic but behaves like engineering: consistent, fast, and sharply aligned.\u201d",
      author: "Mira H.",
      role: "CTO",
    },
    {
      _id: "2",
      quote:
        "\u201cThe attention to grid systems and monospace typography gave our brand a technical edge that clients immediately noticed.\u201d",
      author: "Alex K.",
      role: "Design Director",
    },
    {
      _id: "3",
      quote:
        "\u201cFrom concept to deployment, the workflow was seamless. The dark mode system is now our studio standard.\u201d",
      author: "Ravi P.",
      role: "Founder",
    },
  ];

  const items: Testimonial[] = testimonials.length > 0 ? testimonials : fallback;
  const [activeIdx, setActiveIdx] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const animateQuote = useCallback(
    (newIdx: number) => {
      if (!quoteRef.current) return;

      // Quick fade out, swap, fade in
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx(newIdx);
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        },
      });
    },
    []
  );

  // Entrance animation
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

      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Floating vertical text animation
      gsap.to(".testimonial-vertical-text", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[6rem]">
      <div ref={headerRef} className="w-full max-w-[1920px] mx-auto px-6 flex flex-col items-center text-center mb-7">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 opacity-0">
          Testimonials
        </div>
        <h2 className="mt-3 font-extrabold tracking-tight text-[40px] opacity-0">
          Typography + Trigger System
        </h2>
        <p className="mt-2.5 m-0 text-white/72 max-w-[52ch] leading-[1.7] opacity-0">
          A compact avatar trigger system that switches the centered message.
        </p>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-[1920px] mx-auto px-6 grid grid-cols-[240px_1fr_120px] gap-5 items-center border border-slate-800 bg-white/[0.01] p-[18px] opacity-0 max-[1100px]:grid-cols-[220px_1fr] max-[760px]:grid-cols-1 max-[760px]:[&>div:last-child]:hidden"
      >
        {/* Avatar triggers */}
        <div className="flex flex-col gap-2.5 max-[760px]:flex-row max-[760px]:gap-2">
          {items.map((item, idx) => (
            <button
              key={item._id}
              onClick={() => animateQuote(idx)}
              className={`
                w-full flex items-center gap-3 bg-transparent border rounded-sm p-3 cursor-pointer
                transition-all duration-500 ease-out relative overflow-hidden
                ${
                  idx === activeIdx
                    ? "border-brand-accent/55 bg-brand-accent/[0.08]"
                    : "border-white/[0.22] hover:-translate-y-0.5 hover:border-brand-accent/35"
                }
                max-[760px]:w-auto max-[760px]:flex-1
              `}
              aria-pressed={idx === activeIdx}
            >
              {/* Active indicator line */}
              {idx === activeIdx && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-accent" />
              )}
              {item.avatar ? (
                <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden border border-white/16 shrink-0">
                  <Image
                    src={urlFor(item.avatar).width(68).height(68).url()}
                    alt={item.author}
                    fill
                    sizes="68px"
                    className={`object-cover transition-all duration-500 group-hover:grayscale-0 ${idx === activeIdx ? "grayscale-0" : "grayscale"}`}
                  />
                </div>
              ) : (
                <span
                  className={`block w-[34px] h-[34px] rounded-full border border-white/16 shrink-0 transition-all duration-500 ${
                    idx === activeIdx ? "" : "grayscale"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%), linear-gradient(135deg, rgba(148,163,184,0.25), rgba(11,13,17,0))",
                  }}
                />
              )}
              <span className="sr-only">Select testimonial by {item.author}</span>
            </button>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="py-1.5 px-1">
          <p className="m-0 text-[28px] leading-[1.2] font-bold tracking-tight">
            {items[activeIdx]?.quote}
          </p>
          <div className="mt-4 flex items-center gap-2.5 text-white/62 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span>{items[activeIdx]?.role}</span>
            <span className="w-1 h-1 rounded-full bg-brand-accent/80 inline-block" />
            <span>{items[activeIdx]?.author}</span>
          </div>
        </div>

        {/* Vertical stroke text */}
        <div className="hidden max-[1100px]:hidden min-[1101px]:flex justify-center" aria-hidden="true">
          <span
            className="testimonial-vertical-text font-mono text-base uppercase tracking-[0.22em] text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.22)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textAlign: "center",
              opacity: 0.85,
            }}
          >
            TESTIMONIALS
          </span>
        </div>
      </div>
    </section>
  );
}
