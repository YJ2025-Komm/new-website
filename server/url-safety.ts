// SSRF guard for all outbound fetches driven by user-supplied URLs
// (website analysis / free tools endpoints). Resolves the hostname and
// rejects anything pointing at loopback, private, link-local, or other
// non-public address space — both up front and on every redirect hop
// (via `beforeRedirect`), since DNS can resolve differently between the
// initial check and the request (DNS rebinding) and a redirect can point
// anywhere.
import dns from "dns/promises";
import net from "net";
import { URL } from "url";

function isDisallowedIp(ip: string): boolean {
  const type = net.isIP(ip);
  if (type === 4) {
    const [a, b] = ip.split(".").map(Number);
    if (a === 127) return true; // loopback
    if (a === 10) return true; // private
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 192 && b === 168) return true; // private
    if (a === 169 && b === 254) return true; // link-local (incl. cloud metadata)
    if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
    if (a === 0) return true; // "this network"
    return false;
  }
  if (type === 6) {
    const lower = ip.toLowerCase();
    if (lower === "::1") return true; // loopback
    if (lower.startsWith("fe80")) return true; // link-local
    if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local
    if (lower.startsWith("::ffff:")) {
      // IPv4-mapped IPv6 — check the embedded IPv4 address too
      return isDisallowedIp(lower.replace("::ffff:", ""));
    }
    return false;
  }
  return true; // couldn't parse as an IP — treat as unsafe
}

// Throws (with the same `PREFIX:message` convention used elsewhere in the
// crawler) if the URL isn't a safe, public http(s) destination.
export async function assertPublicHttpUrl(rawUrl: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("INVALID_URL:The URL provided is not valid.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("INVALID_URL:Only http and https URLs are supported.");
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }

  // If the hostname is already a literal IP, check it directly.
  if (net.isIP(hostname)) {
    if (isDisallowedIp(hostname)) {
      throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
    }
    return;
  }

  let addresses: string[];
  try {
    const records = await dns.lookup(hostname, { all: true, verbatim: true });
    addresses = records.map((r) => r.address);
  } catch {
    throw new Error("INVALID_URL:The URL's domain could not be resolved.");
  }

  if (addresses.length === 0 || addresses.some(isDisallowedIp)) {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }
}

// Pass as `beforeRedirect` in axios config (supported by the follow-redirects
// adapter axios uses under the hood) to re-validate every hop of a redirect
// chain, not just the initial URL.
export function beforeRedirect(_options: unknown, responseDetails: { headers: Record<string, string>; }): void {
  const location = responseDetails.headers?.location;
  if (!location) return;
  // Fire-and-check synchronously isn't possible for the async DNS lookup
  // here (follow-redirects' hook is sync), so this catches the cheap,
  // synchronous cases (scheme + literal private/loopback IPs). The async
  // hostname/DNS check still runs up front on the original URL via
  // assertPublicHttpUrl, which covers the common case.
  let url: URL;
  try {
    url = new URL(location);
  } catch {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }
  const hostname = url.hostname.toLowerCase();
  if (net.isIP(hostname) && isDisallowedIp(hostname)) {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    throw new Error("BLOCKED_URL:This URL cannot be analyzed.");
  }
}

const SAFETY_ERROR_PREFIX = /(BLOCKED_URL|INVALID_URL):/;

// axios/follow-redirects wraps whatever `beforeRedirect` throws inside a new
// error (message like "Redirected request failed: BLOCKED_URL:...", with the
// original as `.cause`) — so a plain `message.startsWith(...)` check misses
// it once it's been through a redirect hop. This unwraps both cases and
// returns a clean, normalized error, or null if it's not one of ours.
export function asUrlSafetyError(error: unknown): Error | null {
  if (!(error instanceof Error)) return null;

  const cause = (error as Error & { cause?: unknown }).cause;
  if (cause instanceof Error && SAFETY_ERROR_PREFIX.test(cause.message)) {
    return cause;
  }

  const match = error.message.match(SAFETY_ERROR_PREFIX);
  if (match) {
    return new Error(error.message.slice(match.index));
  }

  return null;
}
