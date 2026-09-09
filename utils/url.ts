import ipaddr from "ipaddr.js";
import { z } from "zod";

/** Input-only check. Never grants permission for an outbound network request. */
export function normalizeUrl(input: string): string {
  const raw = input.trim();
  if (!raw || raw.length > 4096 || /[\\\u0000-\u0020\u007f]/u.test(raw)) {
    throw new Error("Enter a valid URL without spaces, control characters or backslashes.");
  }
  let url: URL;
  try { url = new URL(raw); } catch { throw new Error("Enter a complete URL starting with https:// or http://."); }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are supported.");
  if (url.username || url.password) throw new Error("URLs containing credentials are not allowed.");
  const hostname = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (!hostname || hostname === "localhost" || hostname.endsWith(".localhost") ||
      ["local", "internal", "test", "invalid", "onion"].some((suffix) => hostname.endsWith(`.${suffix}`))) {
    throw new Error("Local and internal destinations are not allowed.");
  }
  if (ipaddr.isValid(hostname)) {
    if (!isPublicAddress(hostname)) throw new Error("Private, reserved and internal IP addresses are not allowed.");
  } else if (!hostname.includes(".")) {
    throw new Error("Enter a public domain name.");
  }
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Only standard web ports (80 and 443) are permitted.");
  url.hash = "";
  return url.toString();
}

/** Fail closed on mapped IPv6, multicast, CGNAT, link-local and reserved ranges. */
export function isPublicAddress(address: string): boolean {
  try { return ipaddr.parse(address).range() === "unicast"; } catch { return false; }
}
export const scanUrlSchema = z.object({ url: z.string().min(1).max(4096) }).strict();
