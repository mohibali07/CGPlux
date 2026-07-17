"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: unknown;
  instagram?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".team-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const fallback = [
    { name: "Syed Ali Murtaza Jaffery", role: "CEO / Founder", instagram: "#" },
    { name: "Haseeb Haider", role: "Creative Director", instagram: "#" },
    { name: "Syed Yawer Abbas Jaffery", role: "Finance Manager", instagram: "#" },
    { name: "Ozaib", role: "Sales Manager", instagram: "#" },
    { name: "Syeda Aemal", role: "Social Media Manager", instagram: "#" },
    { name: "Eiman Zehra", role: "Assistant Manager", instagram: "#" },
  ];

  const items = members.length > 0
    ? members
    : fallback.map((f, i) => ({ _id: String(i), ...f }));

  return (
    <div ref={gridRef} className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
      {items.map((member) => (
        <div
          key={member._id}
          className="team-card opacity-0 border border-slate-800 bg-white/[0.01] overflow-hidden group hover:border-brand-accent/30 transition-all duration-500"
        >
          {/* Photo placeholder */}
          <div className="aspect-square bg-gradient-to-br from-brand-accent/[0.04] to-transparent relative overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background:
                  "radial-gradient(300px 300px at 50% 40%, rgba(56,199,192,0.08), rgba(0,0,0,0) 60%)",
              }}
            />
            <div className="absolute inset-0">
              {/* Image naming based on public folder */}
              {/* Girls: Girl-2.avif */}
              <img
                src={
                  member.name?.toLowerCase().includes("syeda") ||
                  member.name?.toLowerCase().includes("eiman")
                    ? "/Girl-2.avif"
                    : "/Client-1.avif"
                }
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-accent/50 flex items-center justify-center text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                  aria-label={`${member.name}'s Instagram`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-extrabold tracking-tight text-lg mb-1">{member.name}</h3>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-accent/80">
              {member.role}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
