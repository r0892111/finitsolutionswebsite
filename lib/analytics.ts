/**
 * Shared analytics helper — single source of truth for all dataLayer events.
 * Every component should import `pushEvent` from here instead of defining its own.
 */
export function pushEvent(
  event: string,
  params?: Record<string, string>
) {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, ...params });
  }
}
