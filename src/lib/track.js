import mixpanel from "mixpanel-browser";

/**
 * Fire a Mixpanel event.
 *
 * Event names follow a strict top-down hierarchy joined with "/":
 *   <action>/<element_descriptor>
 * e.g. "button_clicked/twitter_icon_footer".
 * See CLAUDE.md ("Mixpanel events") for the full convention and
 * `MIXPANEL_EVENTS.md` for the registry of every tracked element.
 *
 * Safe to call anywhere: it no-ops if Mixpanel isn't initialized
 * (Mixpanel only inits in production builds — see MixpanelProvider).
 *
 * @param {string} event  hierarchical event name, e.g. "button_clicked/linkedin_icon_footer"
 * @param {Object} [props] optional event properties
 */
export function track(event, props = {}) {
  // Mixpanel only initializes in production builds (see MixpanelProvider),
  // so match that condition to avoid noisy "not initialized" warnings in dev.
  if (process.env.NODE_ENV !== "production") return;
  try {
    mixpanel.track(event, props);
  } catch {
    // never let analytics break the UI
  }
}
