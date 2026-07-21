"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { MIXPANEL_TOKEN } from "@/config/site";

/**
 * Initializes Mixpanel once on the client.
 *
 * - `autocapture` auto-tracks pageviews, clicks, form submits, etc. site-wide
 *   with no per-element code.
 * - `record_sessions_percent: 100` enables Session Replay (screen recording)
 *   for every visitor. Dial this down to sample fewer sessions if volume grows.
 *
 * No user identification is required — Mixpanel assigns an anonymous
 * `distinct_id` per browser and stitches each visitor's events + replay
 * together automatically. Call `mixpanel.identify()` later if/when the site
 * gains authenticated users.
 *
 * Only runs in production builds — `npm run dev` (NODE_ENV="development")
 * is skipped so local traffic never pollutes real analytics or burns
 * session-replay quota. Amplify's `npm run build` sets NODE_ENV="production".
 *
 * Renders nothing. Mounted once in the root layout.
 */
export default function MixpanelProvider() {
  useEffect(() => {
    if (!MIXPANEL_TOKEN || process.env.NODE_ENV !== "production") return;

    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      record_sessions_percent: 100,
      persistence: "localStorage",
    });
  }, []);

  return null;
}
