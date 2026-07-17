"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface FooterProps {
  instagramUrl?: string;
  behanceUrl?: string;
  linkedinUrl?: string;
}

export default function Footer({ instagramUrl, behanceUrl, linkedinUrl }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="pt-24 pb-8 bg-brand-dark border-t border-white/[0.05] relative overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Links Section */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20 md:mb-32">
          
          {/* Brand Info */}
          <div className="md:w-5/12 flex flex-col items-start">
            <Link href="/" className="mb-8 inline-block">
              <img
                src="/LOGO.avif"
                alt="CGplux Logo"
                className="w-28 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-[35ch] mb-10 font-medium">
              Atmospheric, cinematic, and grid-aligned dark mode system for creative studios.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href={instagramUrl || "#"}
                target={instagramUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href={behanceUrl || "#"}
                target={behanceUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                aria-label="Behance"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.62.16-1.26.25-1.92.25H0V4.51h6.938v-.007zM6.545 10.16c.58 0 1.07-.15 1.46-.44.395-.3.59-.74.59-1.31 0-.35-.07-.64-.21-.86a1.45 1.45 0 00-.59-.52 2.18 2.18 0 00-.84-.16c-.32 0-.6.03-.86.11-.26.08-.48.19-.65.33-.17.15-.3.32-.39.52-.09.2-.14.41-.14.64 0 .59.19 1.04.57 1.35.38.31.88.46 1.48.46zm4.21 7.1c.24.28.59.42 1.06.42.43 0 .8-.14 1.11-.42.31-.28.54-.56.6-.94h2.53c-.02.66-.22 1.23-.58 1.69-.37.47-.85.82-1.45 1.06-.6.24-1.25.36-1.95.36-.72 0-1.37-.11-1.95-.34-.58-.23-1.07-.57-1.48-1.01-.4-.44-.72-.97-.95-1.58-.23-.62-.34-1.27-.34-1.97 0-.66.11-1.3.34-1.9.23-.61.55-1.13.96-1.57.41-.44.91-.78 1.49-1.02.59-.24 1.24-.36 1.96-.36.78 0 1.44.14 2.01.41.56.27 1.02.65 1.37 1.15.35.5.59 1.07.73 1.73.14.66.16 1.35.06 2.08h-7.55c.03.72.24 1.26.62 1.54l-.01.01zm2.67-4.65c-.17-.44-.51-.77-1.04-.97-.53-.21-1.06-.25-1.58-.12-.53.13-.96.34-1.3.63-.34.29-.6.63-.78 1.01-.18.39-.29.77-.32 1.15h5.02z"/></svg>
              </a>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:w-7/12 flex gap-16 md:gap-32 md:justify-end">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-6 md:mb-8">Company</h4>
              <div className="flex flex-col gap-4">
                <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm font-medium">About Us</Link>
                <Link href="/our-team" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Our Team</Link>
                <Link href="/#clients" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Clients</Link>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-6 md:mb-8">Resources</h4>
              <div className="flex flex-col gap-4">
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Services</Link>
                <Link href="/portfolio" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Portfolio</Link>
                <Link href="/blog" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Blog</Link>
              </div>
            </div>
          </div>
          
        </div>

        {/* Massive Typography Footer Base */}
        <div className="w-full border-t border-white/[0.05] pt-10 flex flex-col relative">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 md:mb-20 z-10">
            <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40">
              &copy; {new Date().getFullYear()} CGplux Studios. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a href="#" className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-accent transition-colors">Terms</a>
              <a href="#" className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-accent transition-colors">Privacy</a>
            </div>
          </div>
          
          {/* Huge Text Mark */}
          <div className="w-full flex justify-center overflow-hidden">
            <h1 
              className="font-heading font-black tracking-tighter text-transparent select-none leading-[0.75] pb-4"
              style={{
                fontSize: "clamp(80px, 16vw, 300px)",
                WebkitTextStroke: "1px rgba(255,255,255,0.03)",
              }}
            >
              CGPLUX
            </h1>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
