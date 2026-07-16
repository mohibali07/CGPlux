"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  categories?: string[];
  excerpt?: string;
}

interface ProjectCardsProps {
  projects: Project[];
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Cards stagger in from bottom with scale
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".project-card");
        gsap.fromTo(
          cards,
          { y: 120, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fallbackCards = [
    { title: "Aether Studio", meta: "Brand / Web / Motion" },
    { title: "Noir Systems", meta: "Design / UI / 3D" },
    { title: "Kanvas Lab", meta: "Prototype / Dev / QA" },
  ];

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div ref={headerRef} className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 opacity-0">
            Selected Works
          </div>
          <h2 className="font-heading font-extrabold tracking-tighter text-[50px] md:text-[70px] leading-[1] opacity-0">
            Featured Projects
          </h2>
        </div>
        <div className="opacity-0">
          <Link href="/portfolio" className="magnetic inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
            View All <span className="text-xl leading-none">&rarr;</span>
          </Link>
        </div>
      </div>

      <div ref={cardsRef} className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug.current}`}
            className="project-card magnetic glass-panel relative aspect-[3/4] rounded-xl overflow-hidden group opacity-0"
          >
            <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]">
              {project.image ? (
                <Image
                  src={urlFor(project.image).width(800).height(1066).url()}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale-[0.8] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                />
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)]">
              <h3 className="font-heading font-extrabold tracking-tighter text-2xl md:text-3xl text-white mb-3">
                {project.title}
              </h3>
              {project.categories && (
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] delay-100">
                  {project.categories.join(" / ")}
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* Fallback cards */}
        {projects.length === 0 &&
          fallbackCards.map((item) => (
            <div
              key={item.title}
              className="project-card magnetic glass-panel relative aspect-[3/4] rounded-xl overflow-hidden group opacity-0"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)]">
                <h3 className="font-heading font-extrabold tracking-tighter text-2xl md:text-3xl text-white mb-3">
                  {item.title}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] delay-100">
                  {item.meta}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
