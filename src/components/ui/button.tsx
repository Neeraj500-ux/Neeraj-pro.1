import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-crimson text-white shadow-[0_8px_30px_-6px_rgba(225,29,46,.7)] hover:bg-crimson-glow",
  ghost: "border border-white/15 bg-white/5 text-bone hover:border-crimson-glow/60 hover:bg-white/10",
  light: "bg-white text-ink hover:bg-bone",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-60";

export function LinkButton({ variant = "primary", className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, styles[variant], className)} {...props} />;
}

export function Button({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}
