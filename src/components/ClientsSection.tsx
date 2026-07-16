"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlFor } from "@/lib/sanity";

interface ClientItem {
  _id: string;
  name: string;
  logo?: unknown;
  website?: string;
  isPartner?: boolean;
}

interface ClientsSectionProps {
  clients?: ClientItem[];
  partners?: ClientItem[];
}

const fallbackClients = [
  { _id: "c1", name: "Skin Deep", letter: "SD" },
  { _id: "c2", name: "Baaroq", letter: "BQ" },
  { _id: "c3", name: "NMZ Associates", letter: "NMZ" },
];

const fallbackPartners = [
  { _id: "p1", name: "Bytes Central", letter: "BC" },
  { _id: "p2", name: "Choice Bazaar", letter: "CB" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default function ClientsSection({ clients, partners }: ClientsSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".client-logo",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const displayClients = clients && clients.length > 0 ? clients : null;
  const displayPartners = partners && partners.length > 0 ? partners : null;

  return (
    <section ref={ref} className="py-[6rem] border-t border-slate-800/50">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        {/* Clients */}
        <div id="clients" className="mb-16">
          <div className="text-center mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
              Our Clients
            </div>
            <h2 className="font-extrabold tracking-tight text-[36px]">Trusted By</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {displayClients
              ? displayClients.map((client) => (
                  <a
                    key={client._id}
                    href={client.website || "#"}
                    target={client.website ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="client-logo opacity-0 w-[120px] h-[120px] border border-slate-800 bg-white/[0.02] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-500 group cursor-default"
                  >
                    {client.logo ? (
                      <img
                        src={urlFor(client.logo).width(96).height(96).url()}
                        alt={client.name}
                        className="w-14 h-14 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40 group-hover:text-brand-accent/80 transition-colors duration-500">
                        {getInitials(client.name)}
                      </span>
                    )}
                  </a>
                ))
              : fallbackClients.map((client) => (
                  <div
                    key={client._id}
                    className="client-logo opacity-0 w-[120px] h-[120px] border border-slate-800 bg-white/[0.02] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-500 group cursor-default"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40 group-hover:text-brand-accent/80 transition-colors duration-500">
                      {client.letter}
                    </span>
                  </div>
                ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <div className="text-center mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
              Our Partners
            </div>
            <h2 className="font-extrabold tracking-tight text-[36px]">Collaborators</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {displayPartners
              ? displayPartners.map((partner) => (
                  <a
                    key={partner._id}
                    href={partner.website || "#"}
                    target={partner.website ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="client-logo opacity-0 w-[120px] h-[120px] border border-slate-800 bg-white/[0.02] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-500 group cursor-default"
                  >
                    {partner.logo ? (
                      <img
                        src={urlFor(partner.logo).width(96).height(96).url()}
                        alt={partner.name}
                        className="w-14 h-14 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40 group-hover:text-brand-accent/80 transition-colors duration-500">
                        {getInitials(partner.name)}
                      </span>
                    )}
                  </a>
                ))
              : fallbackPartners.map((partner) => (
                  <div
                    key={partner._id}
                    className="client-logo opacity-0 w-[120px] h-[120px] border border-slate-800 bg-white/[0.02] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-500 group cursor-default"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40 group-hover:text-brand-accent/80 transition-colors duration-500">
                      {partner.letter}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
