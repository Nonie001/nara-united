import { format, formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

export function formatDateTH(date: Date | string, fmt = "d MMM yyyy") {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, fmt, { locale: th });
}

export function formatKickoff(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "EEE d MMM yyyy • HH:mm", { locale: th }) + " น.";
}

export function timeAgoTH(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: th });
}
