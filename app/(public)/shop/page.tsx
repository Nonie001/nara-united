import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/shared/Card";
import { LinkButton } from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "ร้านค้าสโมสร",
  description:
    "สินค้าอย่างเป็นทางการของสโมสรนราธิวาส ยูไนเต็ด — เสื้อแข่ง เสื้อซ้อม ผ้าพันคอ หมวก และของที่ระลึก",
};

type Product = {
  id: string;
  name: string;
  thaiName: string;
  category: "เสื้อแข่ง" | "เสื้อซ้อม" | "อุปกรณ์" | "ของที่ระลึก";
  price: number;
  oldPrice?: number;
  badge?: "NEW" | "HOT" | "SALE" | "LIMITED";
  colors: string[];
  visual:
    | { kind: "jersey"; primary: string; secondary: string; accent: string; number?: string }
    | { kind: "scarf"; primary: string; secondary: string }
    | { kind: "cap"; primary: string; accent: string }
    | { kind: "ball"; primary: string; accent: string }
    | { kind: "mug"; primary: string; accent: string };
};

const PRODUCTS: Product[] = [
  {
    id: "home-2025",
    name: "Home Jersey 2025/26",
    thaiName: "เสื้อแข่งเหย้า ฤดูกาล 2025/26",
    category: "เสื้อแข่ง",
    price: 1290,
    oldPrice: 1490,
    badge: "NEW",
    colors: ["#0d3a6b", "#f4b942", "#ffffff"],
    visual: { kind: "jersey", primary: "#0d3a6b", secondary: "#082547", accent: "#f4b942", number: "10" },
  },
  {
    id: "away-2025",
    name: "Away Jersey 2025/26",
    thaiName: "เสื้อแข่งเยือน ฤดูกาล 2025/26",
    category: "เสื้อแข่ง",
    price: 1290,
    badge: "NEW",
    colors: ["#ffffff", "#0d3a6b", "#f4b942"],
    visual: { kind: "jersey", primary: "#f5f5f5", secondary: "#e0e0e0", accent: "#0d3a6b", number: "9" },
  },
  {
    id: "third-2025",
    name: "Third Jersey 2025/26",
    thaiName: "เสื้อแข่งชุดที่สาม",
    category: "เสื้อแข่ง",
    price: 1190,
    badge: "LIMITED",
    colors: ["#1a1a1a", "#f4b942"],
    visual: { kind: "jersey", primary: "#1a1a1a", secondary: "#0a0a0a", accent: "#f4b942", number: "7" },
  },
  {
    id: "training-top",
    name: "Training Top",
    thaiName: "เสื้อซ้อมทีม",
    category: "เสื้อซ้อม",
    price: 890,
    colors: ["#0d3a6b", "#f4b942"],
    visual: { kind: "jersey", primary: "#082547", secondary: "#03152e", accent: "#f4b942" },
  },
  {
    id: "scarf-classic",
    name: "Classic Scarf",
    thaiName: "ผ้าพันคอกอและพิฆาต",
    category: "อุปกรณ์",
    price: 390,
    badge: "HOT",
    colors: ["#0d3a6b", "#f4b942"],
    visual: { kind: "scarf", primary: "#0d3a6b", secondary: "#f4b942" },
  },
  {
    id: "cap-gold",
    name: "Gold Crest Cap",
    thaiName: "หมวกแก๊ปสัญลักษณ์ทอง",
    category: "อุปกรณ์",
    price: 590,
    colors: ["#0d3a6b", "#f4b942"],
    visual: { kind: "cap", primary: "#0d3a6b", accent: "#f4b942" },
  },
  {
    id: "ball-official",
    name: "Match Ball",
    thaiName: "ลูกฟุตบอลที่ระลึก",
    category: "ของที่ระลึก",
    price: 690,
    oldPrice: 890,
    badge: "SALE",
    colors: ["#ffffff", "#0d3a6b"],
    visual: { kind: "ball", primary: "#ffffff", accent: "#0d3a6b" },
  },
  {
    id: "mug-crest",
    name: "Crest Mug",
    thaiName: "แก้วน้ำตราสโมสร",
    category: "ของที่ระลึก",
    price: 290,
    colors: ["#ffffff", "#f4b942"],
    visual: { kind: "mug", primary: "#ffffff", accent: "#f4b942" },
  },
];

const CATEGORIES = ["ทั้งหมด", "เสื้อแข่ง", "เสื้อซ้อม", "อุปกรณ์", "ของที่ระลึก"] as const;

const BADGE_STYLE: Record<NonNullable<Product["badge"]>, string> = {
  NEW: "bg-nara-gold text-nara-ink",
  HOT: "bg-nara-red text-white",
  SALE: "bg-nara-ink text-white",
  LIMITED: "bg-white text-nara-ink border border-gray-300",
};

function formatBaht(n: number) {
  return `฿${n.toLocaleString("th-TH")}`;
}

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Official Store"
        title="ร้านค้าสโมสร"
        description="สินค้าอย่างเป็นทางการของ Nara United — เสื้อแข่ง เสื้อซ้อม ผ้าพันคอ และของที่ระลึก"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ร้านค้า" }]}
      />

      <Container className="py-12 sm:py-16" id="products">
        {/* Info strip */}
        <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 rounded-xl border border-gray-200 bg-white p-5">
          {[
            { t: "ของแท้ 100%", s: "Official Merchandise" },
            { t: "จัดส่งทั่วไทย", s: "Nationwide Delivery" },
            { t: "ชำระปลายทาง", s: "Cash on Delivery" },
            { t: "รายได้สนับสนุนทีม", s: "Support the Club" },
          ].map((item) => (
            <div key={item.t} className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-nara-gold flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-nara-ink">{item.t}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {item.s}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section head */}
        <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
              Merchandise
            </div>
            <h2 className="heading-display mt-1 text-2xl sm:text-3xl text-nara-ink">
              สินค้าทั้งหมด
            </h2>
          </div>
          <div className="text-sm text-gray-500">{PRODUCTS.length} รายการ</div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => (
            <span
              key={c}
              className={
                "rounded-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] border transition " +
                (i === 0
                  ? "bg-nara-ink text-white border-nara-ink"
                  : "border-gray-300 bg-white text-gray-600 hover:border-nara-gold hover:text-nara-gold-dark")
              }
            >
              {c}
            </span>
          ))}
        </div>

        {/* Products */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CTA */}
        <Card className="mt-12">
          <div className="p-8 text-center">
            <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
              Need Help
            </div>
            <h3 className="heading-display mt-1 text-2xl text-nara-ink">
              ต้องการสั่งซื้อหรือสอบถามไซส์?
            </h3>
            <span className="mt-3 mx-auto block h-[2px] w-10 bg-nara-gold rounded-full" />
            <p className="mt-4 text-sm text-gray-600">
              ติดต่อทีมงานสโมสรเพื่อสั่งซื้อสินค้าและสอบถามข้อมูลเพิ่มเติม
            </p>
            <div className="mt-6">
              <LinkButton href="/contact">ติดต่อสโมสร →</LinkButton>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

/* ============================================================
 * Product card
 * ============================================================ */
function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-nara-gold hover:shadow-md">
      {p.badge ? (
        <span
          className={
            "absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] " +
            BADGE_STYLE[p.badge]
          }
        >
          {p.badge}
        </span>
      ) : null}

      {/* Visual */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#fafaf7]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,185,66,0.16),transparent_55%)]"
        />
        <div className="relative h-full w-full grid place-items-center p-6 transition-transform duration-500 group-hover:scale-[1.06]">
          <ProductVisual product={p} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nara-gold/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-nara-gold-dark">
          {p.category}
        </div>
        <h3 className="mt-1.5 font-bold leading-snug text-nara-ink">{p.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{p.thaiName}</p>

        <div className="mt-3 flex items-center gap-1.5">
          {p.colors.map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-gray-300 shadow-inner"
              style={{ backgroundColor: c }}
              aria-hidden
            />
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
          <div className="leading-tight">
            <div className="heading-display text-xl text-nara-ink">
              {formatBaht(p.price)}
            </div>
            {p.oldPrice ? (
              <div className="text-[11px] text-gray-400 line-through">
                {formatBaht(p.oldPrice)}
              </div>
            ) : null}
          </div>
          <Link
            href="/contact"
            className="rounded-md border border-gray-300 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-nara-ink transition hover:border-nara-gold hover:bg-nara-gold hover:text-nara-ink"
            aria-label={`สอบถาม ${p.name}`}
          >
            สอบถาม
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
 * Product visuals (pure SVG)
 * ============================================================ */
function ProductVisual({ product }: { product: Product }) {
  const v = product.visual;
  switch (v.kind) {
    case "jersey":
      return <JerseySVG primary={v.primary} secondary={v.secondary} accent={v.accent} number={v.number} />;
    case "scarf":
      return <ScarfSVG primary={v.primary} secondary={v.secondary} />;
    case "cap":
      return <CapSVG primary={v.primary} accent={v.accent} />;
    case "ball":
      return <BallSVG />;
    case "mug":
      return <MugSVG primary={v.primary} accent={v.accent} />;
  }
}

function JerseySVG({
  primary,
  secondary,
  accent,
  number,
}: {
  primary: string;
  secondary: string;
  accent: string;
  number?: string;
}) {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]">
      <defs>
        <linearGradient id={`jg-${primary}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>
      <path
        d="M60 30 L40 50 L20 70 L40 100 L55 90 L55 200 Q100 215 145 200 L145 90 L160 100 L180 70 L160 50 L140 30 L120 45 Q100 60 80 45 Z"
        fill={`url(#jg-${primary})`}
        stroke={accent}
        strokeWidth="2"
      />
      <path d="M80 30 Q100 55 120 30 L115 25 Q100 38 85 25 Z" fill={accent} opacity="0.85" />
      <path d="M55 90 L55 200" stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <path d="M145 90 L145 200" stroke={accent} strokeWidth="1.5" opacity="0.6" />
      {number ? (
        <text
          x="100"
          y="155"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="900"
          fontSize="58"
          fill={accent}
          opacity="0.95"
        >
          {number}
        </text>
      ) : null}
      <circle cx="70" cy="95" r="8" fill={accent} opacity="0.85" />
    </svg>
  );
}

function ScarfSVG({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]">
      <g transform="rotate(-8 100 100)">
        <rect x="20" y="60" width="160" height="60" rx="4" fill={primary} />
        <rect x="20" y="60" width="160" height="10" fill={secondary} />
        <rect x="20" y="110" width="160" height="10" fill={secondary} />
        <text
          x="100"
          y="98"
          textAnchor="middle"
          fontFamily="Inter, system-ui"
          fontWeight="900"
          fontSize="14"
          letterSpacing="4"
          fill={secondary}
        >
          NARA UNITED
        </text>
        <g>
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={`fl-${i}`} x={22 + i * 10} y={120} width="6" height={10 + (i % 3) * 4} fill={secondary} />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={`fr-${i}`} x={22 + i * 10} y={50 - (i % 3) * 4} width="6" height={10 + (i % 3) * 4} fill={secondary} />
          ))}
        </g>
      </g>
    </svg>
  );
}

function CapSVG({ primary, accent }: { primary: string; accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]">
      <path
        d="M40 110 Q40 60 100 60 Q160 60 160 110 Z"
        fill={primary}
        stroke={accent}
        strokeWidth="2"
      />
      <path d="M100 60 L100 110" stroke={accent} strokeWidth="1.2" opacity="0.7" />
      <path d="M70 65 Q85 90 100 110" stroke={accent} strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M130 65 Q115 90 100 110" stroke={accent} strokeWidth="1" opacity="0.5" fill="none" />
      <path
        d="M30 110 Q100 145 170 110 L165 122 Q100 155 35 122 Z"
        fill={accent}
      />
      <circle cx="100" cy="88" r="9" fill={accent} />
      <circle cx="100" cy="88" r="4" fill={primary} />
      <circle cx="100" cy="60" r="3" fill={accent} />
    </svg>
  );
}

function BallSVG() {
  return (
    <svg viewBox="-50 -50 100 100" className="h-full w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]">
      <defs>
        <radialGradient id="shop-ball" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#ececec" />
          <stop offset="100%" stopColor="#9c9c9c" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="46" fill="url(#shop-ball)" stroke="#0a0a0a" strokeWidth="1.5" />
      <g stroke="#0a0a0a" strokeWidth="2" fill="#0a0a0a" strokeLinejoin="round">
        <polygon points="0,-16 15.2,-4.9 9.4,12.9 -9.4,12.9 -15.2,-4.9" />
        <polygon points="0,-46 -14,-38 -10,-22 10,-22 14,-38" />
        <polygon points="44,-14 30,-26 18,-12 28,2 40,0" />
        <polygon points="38,28 26,18 14,28 22,42 36,40" />
        <polygon points="-38,28 -26,18 -14,28 -22,42 -36,40" />
        <polygon points="-44,-14 -30,-26 -18,-12 -28,2 -40,0" />
      </g>
      <ellipse cx="-18" cy="-26" rx="11" ry="5" fill="#ffffff" opacity="0.5" transform="rotate(-25 -18 -26)" />
    </svg>
  );
}

function MugSVG({ primary, accent }: { primary: string; accent: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]">
      <path
        d="M150 80 Q190 80 190 115 Q190 150 150 150"
        stroke={primary}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="40" y="60" width="115" height="110" rx="10" fill={primary} stroke={accent} strokeWidth="2" />
      <rect x="40" y="95" width="115" height="20" fill={accent} opacity="0.9" />
      <text
        x="98"
        y="110"
        textAnchor="middle"
        fontFamily="Inter, system-ui"
        fontWeight="900"
        fontSize="11"
        letterSpacing="3"
        fill={primary}
      >
        NARA UNITED
      </text>
      <rect x="50" y="68" width="6" height="90" rx="3" fill="#ffffff" opacity="0.45" />
    </svg>
  );
}
