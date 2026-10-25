import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, X } from "lucide-react";
import { changelogEntries } from "@/data/changelog";
import { trackEvent } from "@/lib/analytics";

// Announces the newest changelog entry. Dismissal is stored against that
// entry's slug, so publishing a new entry brings the bar back for everyone
// without any manual change here.
const STORAGE_KEY = "gr-dismissed-changelog";

const latest = changelogEntries.reduce((a, b) => (b.date > a.date ? b : a));

export default function ChangelogAnnouncementBar({ className = "" }: { className?: string }) {
  const [dismissed, setDismissed] = useState(false);

  // Read after mount, not during render, so prerendered HTML and the first
  // client render match.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === latest.slug) setDismissed(true);
    } catch {
      // Storage blocked (private mode etc.): just keep showing the bar.
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    trackEvent("announcement_dismiss", { changelog_slug: latest.slug });
    try {
      localStorage.setItem(STORAGE_KEY, latest.slug);
    } catch {
      // Dismissal only lasts for this page view if storage is unavailable.
    }
  };

  return (
    <div className={`relative z-20 gradient-cta text-white ${className}`}>
      <div className="max-w-7xl mx-auto pl-4 pr-11 sm:px-12 py-2 flex justify-start sm:justify-center">
        <Link
          href={`/changelog/${latest.slug}`}
          onClick={() => trackEvent("announcement_click", { changelog_slug: latest.slug })}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline underline-offset-2"
          data-testid="link-changelog-announcement"
        >
          <span className="flex-shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
            New
          </span>
          <span>{latest.cardHeadline ?? latest.title}</span>
          <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" />
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-white/15 transition-colors"
        data-testid="button-dismiss-announcement"
      >
        <X aria-hidden="true" className="w-4 h-4" />
      </button>
    </div>
  );
}
