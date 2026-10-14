import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Waits for `promise` but never resolves faster than `ms` — a cache hit
 * that returns in milliseconds would otherwise flash past a "Analyzing…"
 * loading state almost instantly, which reads as suspicious on its own
 * even without a cache date, since it looks like nothing was actually
 * analyzed. Rejections still reject immediately, not delayed.
 */
export function withMinDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  const delay = new Promise<void>((resolve) => setTimeout(resolve, ms));
  return promise.then(async (value) => {
    await delay;
    return value;
  });
}
