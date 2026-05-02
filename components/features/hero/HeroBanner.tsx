import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-nara-green-deeper text-white">
      {/* ===================== BACKGROUND ===================== */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(125deg,#031a0e_0%,#052816_30%,#084020_60%,#031a0e_100%)]"
      />

      {/* Stadium silhouette + crowd */}
      <svg
        aria-hidden
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[75%] w-full opacity-[0.18]"
      >
        <defs>
          <linearGradient id="hero-stadium-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="55%" stopColor="#000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="hero-spot" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#f4b942" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f4b942" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[300, 800, 1300].map((x) => (
          <polygon
            key={x}
            points={`${x - 10},120 ${x + 10},120 ${x + 260},560 ${x - 260},560`}
            fill="url(#hero-spot)"
            opacity="0.35"
          />
        ))}
        <path
          d="M0,420 Q 200,360 400,380 T 800,360 T 1200,380 T 1600,420 L1600,600 L0,600 Z"
          fill="#0d5c2e"
        />
        <g stroke="#1c7a44" strokeWidth="1.5" opacity="0.7">
          {Array.from({ length: 80 }).map((_, i) => (
            <line
              key={i}
              x1={i * 20}
              y1={430 - Math.abs(40 - i) * 0.6}
              x2={i * 20}
              y2={600}
            />
          ))}
        </g>
        {[150, 1450].map((x) => (
          <g key={x}>
            <rect x={x - 4} y={100} width={8} height={320} fill="#0a0a0a" />
            <rect x={x - 36} y={84} width={72} height={36} rx={4} fill="#1c7a44" />
            <rect
              x={x - 30}
              y={92}
              width={60}
              height={5}
              fill="#f4b942"
              opacity="0.5"
            />
          </g>
        ))}
        <rect x="0" y="0" width="1600" height="600" fill="url(#hero-stadium-fade)" />
      </svg>

      {/* Diagonal gold stripes accent */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-[-5%] w-[55%] opacity-[0.10] bg-[repeating-linear-gradient(115deg,transparent_0_60px,#f4b942_60px_64px)] [mask-image:linear-gradient(to_left,#000,transparent)]"
      />

      {/* Ambient gold halo */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 h-[140%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(244,185,66,0.22)_0%,rgba(244,185,66,0.06)_38%,transparent_70%)]"
      />

      {/* Texture */}
      <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-50" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-50" />

      {/* Side hairlines */}
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-nara-gold/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-nara-gold/30 to-transparent"
      />

      {/* ===================== TOP STRIP ===================== */}
      <div className="relative border-b border-white/5 bg-black/20 backdrop-blur-sm animate-fade-in-down">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nara-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-nara-gold" />
                </span>
                <span className="text-nara-gold">Season 2025 / 26</span>
              </span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline">Thai League 3 — Southern</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span>#WeAreNara</span>
              <span className="text-white/30">·</span>
              <span className="text-nara-gold">กอและพิฆาต</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        {/* jersey-style watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-2 top-2 sm:right-8 sm:top-6 select-none heading-display text-[7rem] sm:text-[14rem] lg:text-[18rem] leading-none font-black text-white/[0.03] tracking-tighter"
        >
          01
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* ============== LEFT ============== */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-in-down">
              <span className="inline-flex h-6 items-center gap-1.5 rounded-sm bg-nara-gold px-2.5 text-[10px] font-black uppercase tracking-[0.25em] text-nara-green-deeper">
                <span className="text-nara-red">●</span> OFFICIAL
              </span>
              <span className="hidden sm:inline-block h-px w-10 bg-nara-gold/60" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white/70">
                Football Club Website
              </span>
            </div>

            <h1 className="heading-display mt-5 sm:mt-6 text-[3rem] sm:text-7xl lg:text-8xl xl:text-[8rem] font-black leading-[0.88] tracking-tight">
              <span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] animate-fade-in-up delay-100">
                NARA
              </span>
              <span className="block text-gold-gradient drop-shadow-[0_4px_30px_rgba(244,185,66,0.25)] animate-fade-in-up delay-200">
                UNITED
              </span>
            </h1>

            <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4 animate-fade-in-up delay-300">
              <span className="h-[3px] w-8 sm:w-12 bg-nara-gold flex-shrink-0" />
              <span className="font-display text-[11px] sm:text-base font-bold text-nara-gold tracking-[0.25em] sm:tracking-[0.4em] uppercase">
                สโมสรฟุตบอลนราธิวาส ยูไนเต็ด
              </span>
            </div>

            <p className="mt-4 sm:mt-5 text-sm sm:text-lg font-semibold leading-snug animate-fade-in-up delay-400">
              <span className="text-nara-gold">“กอและพิฆาต”</span>{" "}
              <span className="text-white/85">
                ทีมแห่งศักดิ์ศรีและจิตวิญญาณของชาวนราธิวาส
              </span>
            </p>

            <p className="mt-3 sm:mt-4 max-w-xl text-[13px] sm:text-base text-white/65 leading-relaxed animate-fade-in-up delay-500">
              เว็บไซต์อย่างเป็นทางการ — ติดตามทุกการแข่งขัน ทุกประตู
              และเรื่องราวจากภายในสโมสร พร้อมรายชื่อนักเตะ ตารางคะแนน
              และข่าวสารล่าสุด
            </p>

            <div className="mt-7 sm:mt-8 flex flex-wrap items-stretch gap-2.5 sm:gap-3 animate-fade-in-up delay-700">
              <Link
                href="/fixtures"
                className="group relative inline-flex flex-1 sm:flex-none items-center justify-center gap-3 overflow-hidden rounded-sm bg-nara-gold px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-nara-green-deeper transition shine-on-hover hover:bg-nara-gold-light"
              >
                <span className="relative z-10">ดูโปรแกรมแข่งขัน</span>
                <span
                  aria-hidden
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/squad"
                className="group inline-flex flex-1 sm:flex-none items-center justify-center gap-3 rounded-sm border border-white/25 bg-white/5 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-nara-gold hover:bg-nara-gold/10 hover:text-nara-gold"
              >
                รู้จักนักเตะ
                <span aria-hidden className="text-nara-gold">
                  ↗
                </span>
              </Link>
              <Link
                href="/tickets"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-nara-red/60 bg-nara-red/15 px-5 py-3 sm:py-4 text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-nara-red/30"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-nara-red animate-pulse" />
                ตั๋วเข้าชม
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl border-t border-white/10 pt-5 sm:pt-6 animate-fade-in-up delay-1000">
              {[
                { v: "2010", l: "ก่อตั้ง", sub: "FOUNDED" },
                { v: "T3", l: "ลีก", sub: "DIVISION" },
                { v: "12K+", l: "แฟนคลับ", sub: "FANBASE" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={
                    "relative " +
                    (i > 0 ? "pl-3 sm:pl-5 border-l border-white/10" : "")
                  }
                >
                  <div className="heading-display text-2xl sm:text-4xl lg:text-5xl text-nara-gold leading-none">
                    {s.v}
                  </div>
                  <div className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/55">
                    {s.sub}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/70 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ============== RIGHT — crest + bouncing ball ============== */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end animate-scale-in delay-200">
            <div className="relative">
              {/* Soft glow halo behind logo (no circle outline) */}
              <div
                aria-hidden
                className="absolute inset-0 -m-10 sm:-m-16 rounded-full bg-nara-gold/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute inset-0 -m-16 sm:-m-24 rounded-full bg-nara-green-light/20 blur-[80px]"
              />

              {/* CREST + ball stage */}
              <div className="hero-crest relative animate-float">
                <Logo
                  size="2xl"
                  glow
                  priority
                  className="!w-44 !h-44 sm:!w-72 sm:!h-72 lg:!w-80 lg:!h-80"
                />

                {/* === Bouncing & orbiting football === */}
                <div className="hero-ball" aria-hidden>
                  <svg
                    viewBox="-50 -50 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hero-ball-svg"
                  >
                    <defs>
                      <radialGradient id="ball-base" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="70%" stopColor="#ececec" />
                        <stop offset="100%" stopColor="#b0b0b0" />
                      </radialGradient>
                      <radialGradient id="ball-vignette" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="#000" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
                      </radialGradient>
                      <clipPath id="ball-clip">
                        <circle cx="0" cy="0" r="46" />
                      </clipPath>
                    </defs>

                    {/* white sphere base */}
                    <circle cx="0" cy="0" r="46" fill="url(#ball-base)" />

                    {/* Soccer ball pattern - 6 black pentagons forming classic look */}
                    <g clipPath="url(#ball-clip)" stroke="#0a0a0a" strokeWidth="2" strokeLinejoin="round" fill="#0a0a0a">
                      {/* Center front pentagon */}
                      <polygon points="0,-16 15.2,-4.9 9.4,12.9 -9.4,12.9 -15.2,-4.9" />

                      {/* Top pentagon (peek from upper rim) */}
                      <polygon points="0,-46 -14,-38 -10,-22 10,-22 14,-38" />

                      {/* Upper-right pentagon */}
                      <polygon points="44,-14 30,-26 18,-12 28,2 40,0" />

                      {/* Lower-right pentagon */}
                      <polygon points="38,28 26,18 14,28 22,42 36,40" />

                      {/* Lower-left pentagon */}
                      <polygon points="-38,28 -26,18 -14,28 -22,42 -36,40" />

                      {/* Upper-left pentagon */}
                      <polygon points="-44,-14 -30,-26 -18,-12 -28,2 -40,0" />
                    </g>

                    {/* Hexagon seams (the white panels between pentagons) */}
                    <g clipPath="url(#ball-clip)" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" fill="none">
                      {/* connect center pentagon to top */}
                      <line x1="0" y1="-16" x2="0" y2="-22" />
                      {/* center to upper-right */}
                      <line x1="15.2" y1="-4.9" x2="18" y2="-12" />
                      {/* center to lower-right */}
                      <line x1="9.4" y1="12.9" x2="14" y2="28" />
                      {/* center to lower-left */}
                      <line x1="-9.4" y1="12.9" x2="-14" y2="28" />
                      {/* center to upper-left */}
                      <line x1="-15.2" y1="-4.9" x2="-18" y2="-12" />

                      {/* outer ring connecting pentagons */}
                      <line x1="14" y1="-38" x2="30" y2="-26" />
                      <line x1="40" y1="0" x2="38" y2="28" />
                      <line x1="22" y1="42" x2="-22" y2="42" />
                      <line x1="-38" y1="28" x2="-40" y2="0" />
                      <line x1="-30" y1="-26" x2="-14" y2="-38" />
                    </g>

                    {/* spherical shading vignette */}
                    <circle cx="0" cy="0" r="46" fill="url(#ball-vignette)" />

                    {/* outline */}
                    <circle cx="0" cy="0" r="46" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />

                    {/* glossy highlight */}
                    <ellipse cx="-18" cy="-26" rx="11" ry="5" fill="#ffffff" opacity="0.5" transform="rotate(-25 -18 -26)" />
                    <ellipse cx="-22" cy="-30" rx="4" ry="1.8" fill="#ffffff" opacity="0.9" transform="rotate(-25 -22 -30)" />
                  </svg>
                </div>
              </div>

              {/* tag pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-nara-gold/40 bg-nara-green-deeper/90 backdrop-blur px-4 py-1.5 text-[10px] font-black tracking-[0.4em] text-nara-gold uppercase">
                Est. 2010 · กอและพิฆาต
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== BOTTOM STRIP ===================== */}
      <div className="relative border-t border-nara-gold/20 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-nara-gold">●</span>
              Home of the Komaepikard
            </div>
            <div className="flex items-center gap-4 text-white/50">
              <Link href="/news" className="hover:text-nara-gold transition">
                ข่าวสโมสร
              </Link>
              <span className="text-white/20">/</span>
              <Link href="/table" className="hover:text-nara-gold transition">
                ตารางคะแนน
              </Link>
              <span className="text-white/20">/</span>
              <Link href="/about" className="hover:text-nara-gold transition">
                เกี่ยวกับสโมสร
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nara-gold/70 to-transparent"
      />
    </section>
  );
}
