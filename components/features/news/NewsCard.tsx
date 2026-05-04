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
  match: "bg-nara-ink text-white",
  transfer: "bg-blue-700 text-white",
  community: "bg-nara-gold text-nara-ink",
  announcement: "bg-nara-red text-white",
  interview: "bg-purple-700 text-white",
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
      className={`group card-lift relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div
        className={`relative ${featured ? "aspect-[16/10]" : "aspect-[16/9]"} bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden`}
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
          <div className="absolute inset-0 grid place-items-center text-gray-300 text-7xl heading-display">
            NU
          </div>
        )}
        <span
          className={`absolute top-3 left-3 inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] uppercase shadow-sm ${CATEGORY_TONE[item.category]}`}
        >
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>

      <div className="p-5">
        {item.published_at ? (
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
            {formatDateTH(item.published_at)}
          </div>
        ) : null}
        <h3
          className={`mt-2 font-display font-bold leading-tight line-clamp-2 text-nara-ink group-hover:text-nara-gold-dark transition ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {item.title_th}
        </h3>
        {item.excerpt_th ? (
          <p className={`mt-2 text-sm text-gray-600 leading-relaxed ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
            {item.excerpt_th}
          </p>
        ) : null}
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-nara-gold-dark">
          อ่านต่อ <span aria-hidden className="icon-bounce">→</span>
        </div>
      </div>
    </Link>
  );
}

export { CATEGORY_LABEL };
