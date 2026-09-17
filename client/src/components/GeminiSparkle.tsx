// Gemini "sparkle" mark. Google AI Search (AI Overview + AI Mode) is Gemini-powered.
//
// Painted with a CSS conic-gradient masked to the sparkle silhouette so the four points
// each read as a distinct hue. A linear or radial SVG gradient cannot do that: every
// point would blend toward whichever two stops it sits between.
const GEMINI_SPARKLE_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Cpath d='M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z'/%3E%3C/svg%3E\")";

export default function GeminiSparkle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <span
      className={`${className} inline-block flex-shrink-0`}
      style={{
        // 0deg = top, and conic-gradient sweeps clockwise, so this lands red at the top
        // point, blue at the right point, green at the bottom point, yellow at the left
        // point, matching the reference mark instead of smearing along one axis.
        background:
          "conic-gradient(from 0deg at 50% 50%, #EA4335 0%, #4285F4 25%, #34A853 50%, #FBBC05 75%, #EA4335 100%)",
        WebkitMaskImage: GEMINI_SPARKLE_MASK,
        maskImage: GEMINI_SPARKLE_MASK,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
