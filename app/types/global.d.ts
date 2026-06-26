// Single-owner global type augmentations. `Window.dataLayer` is also declared
// in app/components/modules/home/PageViewedEvent.tsx (kept there for locality
// with the page_viewed push); `Window.posthog` lives here so the pre-lander
// button components don't each redeclare it.

export {};

declare global {
  interface Window {
    posthog?: {
      capture?: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}
