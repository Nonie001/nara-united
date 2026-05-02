import Image from "next/image";
import Link from "next/link";
import type { News } from "@/types/database";
import { formatDateTH } from "@/lib/utils/date";

const CATEGORY_LABEL: Record<News["category"], string> = {
  match: "แมตช์",
  transfer: "ตลาด",
  community: "ชุมชน",
  announcement: "ประกาศ",
  interview: "สัมภาษณ์",
};

const CATEGORY_TONE: Record<News["category"], string> = {
  match: "bg-nara-green text-white",
  transfer: "bg-blue-600 text-white",
  community: "bg-nara-gold text-nara-green-deeper",
  announcement: "bg-nara-red text-white",
  interview: "bg-purple-600 text-white",
};

export function NewsCard({
  item,
  featured = false,
}: {
  item: News;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className={`group card-lift relative block overflow-hidden rounded-2xl border border-gray-200 bg-white ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div
        className={`relative ${featured ? "aspect-[16/10]" : "aspect-[16/9]"} bg-gradient-to-br from-nara-green-dark to-nara-green-deeper overflow-hidden`}
      >
        {item.cover_url ? (
          <Image
            src={item.cover_url}
            alt={item.title_th}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-nara-gold/20 text-7xl heading-display">
            NU
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 ${CATEGORY_TONE[item.category]}`}
        >
          {CATEGORY_LABEL[item.category]}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
          {item.published_at ? (
            <div className="text-[11px] font-semibold tracking-widest uppercase text-nara-gold/90">
              {formatDateTH(item.published_at)}
            </div>
          ) : null}
          <h3
            className={`mt-2 font-display font-bold leading-tight line-clamp-2 group-hover:text-nara-gold transition ${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {item.title_th}
          </h3>
          {featured && item.excerpt_th ? (
            <p className="mt-3 text-sm text-white/80 line-clamp-2 max-w-xl">
              {item.excerpt_th}
            </p>
          ) : null}
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nara-gold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
            อ่านต่อ <span aria-hidden className="icon-bounce">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { CATEGORY_LABEL };
