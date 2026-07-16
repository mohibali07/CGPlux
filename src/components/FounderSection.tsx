"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlFor } from "@/lib/sanity";

interface FounderProps {
  name?: string;
  role?: string;
  designation?: string;
  bio?: string[];
  photo?: unknown;
  instagramUrl?: string;
  linkedinUrl?: string;
}

export default function FounderSection({ name, role, designation, bio, photo, instagramUrl, linkedinUrl }: FounderProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".founder-animate",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const defaultBio = [
    "Driven by a passion for CGI, VFX, and cinematic storytelling, our founder built this studio with a vision to create world-class advertising visuals that leave a lasting impact. By blending creativity, realism, and innovation, we focus on crafting high-end visual experiences that help brands stand out in today's fast-moving digital world.",
    "Under this direction, the studio continues to push the boundaries of modern advertising through visually striking and emotionally engaging content.",
  ];

  const displayBio = bio && bio.length > 0 ? bio : defaultBio;

  const photoSrc = photo
    ? urlFor(photo).width(560).height(680).url()
    : "/CEO Founder.avif";

  return (
    <section ref={ref} className="py-[6rem] border-t border-slate-800/50">
      <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-[0.8fr_1.2fr] gap-16 items-center max-lg:grid-cols-1">
        <div className="founder-animate opacity-0 flex justify-center">
          <div className="relative w-[280px] h-[340px] border border-slate-800 overflow-hidden bg-gradient-to-br from-brand-accent/[0.06] to-transparent group">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(300px 400px at 50% 40%, rgba(125,211,252,0.1), rgba(0,0,0,0) 60%)",
              }}
            />
            <div className="absolute inset-0">
              <img
                src={photoSrc}
                alt={name || "CEO Founder"}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-accent/30 z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-accent/30 z-10" />
          </div>
        </div>
        <div className="founder-animate opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Leadership
          </div>
          <h2 className="font-extrabold tracking-tight text-[36px] mb-2">
            {name || "CEO & Founder"}
          </h2>
          <div className="font-heading text-xl text-white/80 mb-6">
            {designation || role || "Creative Director"}
          </div>
          {displayBio.map((para, i) => (
            <p key={i} className="text-white/72 leading-[1.8] max-w-[55ch] mt-4 first:mt-0">
              {para}
            </p>
          ))}
          <div className="flex gap-4 mt-6">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-accent transition-colors duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-brand-accent transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {/* fallback social links if none provided */}
            {!instagramUrl && !linkedinUrl && (
              <>
                <a href="#" className="text-white/50 hover:text-brand-accent transition-colors duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-brand-accent transition-colors duration-300" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
