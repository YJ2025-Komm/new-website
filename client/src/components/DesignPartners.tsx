import type { CSSProperties } from "react";

// Renders a logo as a uniform-grey silhouette (via CSS mask, so navy/black/mixed-color
// source logos all land on the exact same grey — a plain `grayscale` filter would instead
// desaturate each logo to its own luminance and still look inconsistent). Static, no hover
// color reveal — some source logos are themselves white-on-transparent (designed for a dark
// background), so "true color" on this light page would just disappear. Requires a source
// image with real alpha transparency (SVG or transparent PNG/WebP) — an opaque/flattened
// image just masks as a solid block.
export function MonoLogo({
  src,
  alt,
  heightClass = "h-7 sm:h-8",
  widthClass,
  fillClass = "bg-slate-400",
  zoom = false,
  intrinsicWidth,
  intrinsicHeight,
}: {
  src: string;
  alt: string;
  heightClass?: string;
  /** Required when zoom is true — cover-cropping needs an explicit box, not the image's own aspect ratio. */
  widthClass?: string;
  fillClass?: string;
  /** Crops out empty padding in a source image by scaling it to cover a smaller fixed-width
   * box (anchored left) instead of shrinking the whole (mostly empty) image to fit. */
  zoom?: boolean;
  /** Real source pixel dimensions — purely a CLS hint on the (opacity-0) <img>; the visible
   * mono silhouette is sized entirely by heightClass/widthClass via the mask, unaffected. */
  intrinsicWidth?: number;
  intrinsicHeight?: number;
}) {
  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: zoom ? "cover" : "contain",
    maskSize: zoom ? "cover" : "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: zoom ? "left center" : "center",
    maskPosition: zoom ? "left center" : "center",
  };
  return (
    <div className={`relative inline-block overflow-hidden ${heightClass} ${widthClass ?? ""}`}>
      <img
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        className={`h-full ${widthClass ? "w-full" : "w-auto"} ${zoom ? "object-cover object-left" : "object-contain"} opacity-0`}
        loading="lazy"
      />
      <span aria-hidden="true" className={`absolute inset-0 ${fillClass}`} style={maskStyle} />
    </div>
  );
}

// TeamLease renders smaller and thinner-stroked than the others even at the same height,
// and there's no CSS lever to literally thin out solid filled logo shapes — so instead the
// other three are sized down AND lightened in color to reduce their visual weight and meet
// it in the middle, rather than chasing an unreachable exact match.
// Ordered to alternate visual weight (bold wordmark / lighter icon+text mark) so no two
// similar-weight logos sit adjacent, and the row closes on a bold mark instead of fading
// out on the faintest one.
const DESIGN_PARTNERS = [
  { name: "MoEngage", src: "/partners/MoEngage.svg", heightClass: "h-5 sm:h-6", fillClass: "bg-slate-400", w: 180, h: 28 },
  { name: "TeamLease", src: "/partners/teamlease-logo.png", fillClass: "bg-slate-500", w: 1634, h: 522 },
  { name: "SellerApp", src: "/partners/sellerapp.svg", heightClass: "h-5 sm:h-6", fillClass: "bg-slate-400", w: 136, h: 30 },
  { name: "Kommunicate", src: "/partners/Kommunicate_Logo_dark_new.png", heightClass: "h-6 sm:h-8", fillClass: "bg-slate-400", w: 7255, h: 1884 },
  { name: "Liminal", src: "/partners/liminal-logo.svg", heightClass: "h-5 sm:h-6", fillClass: "bg-slate-400", w: 197, h: 36 },
];

/** "Design Partners" label + logo row, ready to drop into any page section. */
export function DesignPartnersRow({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 text-center mb-8">
        Design Partners
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-12">
        {DESIGN_PARTNERS.map((partner) => (
          <MonoLogo
            key={partner.name}
            src={partner.src}
            alt={partner.name}
            fillClass={partner.fillClass}
            heightClass={partner.heightClass}
            intrinsicWidth={partner.w}
            intrinsicHeight={partner.h}
          />
        ))}
      </div>
    </div>
  );
}
