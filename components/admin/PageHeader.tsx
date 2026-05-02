import Link from "next/link";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-nara-green-dark">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center rounded-md bg-nara-green text-white px-4 h-10 hover:bg-nara-green-dark text-sm font-medium"
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
