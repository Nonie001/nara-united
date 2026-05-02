import { cn } from "@/lib/utils/cn";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-nara-green focus:ring focus:ring-nara-green/30";

export function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required ? <span className="text-nara-red"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-nara-red">{error}</p> : null}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, className)} />;
}

export function TextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, className)} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(inputCls, className)}>
      {children}
    </select>
  );
}
