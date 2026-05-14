/**
 * Token minting for intake magic links.
 *
 * Opaque, URL-safe, 32-char random tokens stored in Supabase. We do NOT sign
 * the token — lookup-only via the `token` column. Decision rationale:
 * [intake-flow.md §Open questions #3](../../../finit-os/docs/specs/intake-flow.md).
 */
import { randomBytes } from "crypto";

/**
 * Mints a URL-safe 32-character opaque token.
 * 24 random bytes → base64url → 32 chars (no padding).
 */
export function mintToken(): string {
  // 24 bytes of randomness encodes to 32 base64url chars exactly.
  return randomBytes(24).toString("base64url");
}

/**
 * Cheap structural check — rejects obviously malformed tokens before we hit
 * Supabase. NOT a security boundary: the real check is the DB lookup.
 */
export function isPlausibleToken(t: unknown): t is string {
  return typeof t === "string" && /^[A-Za-z0-9_-]{16,64}$/.test(t);
}
