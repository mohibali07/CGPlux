import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | CGplux Studios",
  description: "Get in touch with CGplux Studios.",
};

export default function ContactPage() {
  return (
    <section className="py-[6rem]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Contact
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-4">
            Get in Touch
          </h1>
          <p className="text-white/72 max-w-[55ch] leading-[1.7]">
            We&apos;re happy to talk to you. Let&apos;s schedule a call.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1.2fr] gap-12 max-lg:grid-cols-1">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="border border-slate-800 bg-white/[0.01] p-6 hover:border-brand-accent/30 transition-all duration-500">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-2">
                Call Us
              </div>
              <a href="tel:+923191086099" className="text-xl font-bold tracking-tight no-underline hover:text-brand-accent transition-colors duration-300">
                +92 319 1086099
              </a>
            </div>

            <div className="border border-slate-800 bg-white/[0.01] p-6 hover:border-brand-accent/30 transition-all duration-500">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-2">
                Email Us
              </div>
              <a href="mailto:info@CGpluxdigital.com" className="text-xl font-bold tracking-tight no-underline hover:text-brand-accent transition-colors duration-300">
                info@CGpluxdigital.com
              </a>
            </div>

            <div className="border border-slate-800 bg-white/[0.01] p-6 hover:border-brand-accent/30 transition-all duration-500">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent/80 mb-2">
                Address
              </div>
              <p className="text-white/72 leading-relaxed">
                Creative Studio, Digital Hub<br />
                Pakistan
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-slate-800 bg-white/[0.01] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-slate-800 bg-white/[0.01] flex items-center justify-center hover:border-brand-accent/30 hover:bg-brand-accent/[0.04] transition-all duration-300" aria-label="Behance">
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.62.16-1.26.25-1.92.25H0V4.51h6.938v-.007zM6.545 10.16c.58 0 1.07-.15 1.46-.44.395-.3.59-.74.59-1.31 0-.35-.07-.64-.21-.86a1.45 1.45 0 00-.59-.52 2.18 2.18 0 00-.84-.16c-.32 0-.6.03-.86.11-.26.08-.48.19-.65.33-.17.15-.3.32-.39.52-.09.2-.14.41-.14.64 0 .59.19 1.04.57 1.35.38.31.88.46 1.48.46zm4.21 7.1c.24.28.59.42 1.06.42.43 0 .8-.14 1.11-.42.31-.28.54-.56.6-.94h2.53c-.02.66-.22 1.23-.58 1.69-.37.47-.85.82-1.45 1.06-.6.24-1.25.36-1.95.36-.72 0-1.37-.11-1.95-.34-.58-.23-1.07-.57-1.48-1.01-.4-.44-.72-.97-.95-1.58-.23-.62-.34-1.27-.34-1.97 0-.66.11-1.3.34-1.9.23-.61.55-1.13.96-1.57.41-.44.91-.78 1.49-1.02.59-.24 1.24-.36 1.96-.36.78 0 1.44.14 2.01.41.56.27 1.02.65 1.37 1.15.35.5.59 1.07.73 1.73.14.66.16 1.35.06 2.08h-7.55c.03.72.24 1.26.62 1.54l-.01.01zm2.67-4.65c-.17-.44-.51-.77-1.04-.97-.53-.21-1.06-.25-1.58-.12-.53.13-.96.34-1.3.63-.34.29-.6.63-.78 1.01-.18.39-.29.77-.32 1.15h5.02z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="border border-slate-800 bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
            <h3 className="font-extrabold tracking-tight text-2xl mb-6">Let&apos;s Talk</h3>
            <form className="flex flex-col gap-5 relative z-10">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/62 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-slate-800 rounded-sm px-4 py-3 text-white/92 font-body text-sm focus:outline-none focus:border-brand-accent/55 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/62 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border border-slate-800 rounded-sm px-4 py-3 text-white/92 font-body text-sm focus:outline-none focus:border-brand-accent/55 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/62 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full bg-transparent border border-slate-800 rounded-sm px-4 py-3 text-white/92 font-body text-sm focus:outline-none focus:border-brand-accent/55 transition-colors duration-300"
                  placeholder="+92 ..."
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/62 mb-2">
                  Project Details
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border border-slate-800 rounded-sm px-4 py-3 text-white/92 font-body text-sm focus:outline-none focus:border-brand-accent/55 transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 h-[48px] px-8 rounded-sm font-mono text-xs uppercase tracking-[0.12em] border border-brand-accent/35 bg-brand-accent/12 text-brand-accent/98 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-accent/18 hover:shadow-[0_0_20px_rgba(56,199,192,0.15)] cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
