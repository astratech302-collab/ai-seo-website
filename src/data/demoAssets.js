// Demo photography for the CRO / Ad-to-Landing mockups. Unbranded Unsplash photos
// (Unsplash License), hosted on S3 per the project's image convention.
import { ASSET_BASE } from "@/config/site";

export const DEMO_IMG = {
  product: `${ASSET_BASE}/demo-serum-product.jpg`, // amber dropper bottle, blank label
  lifestyle: `${ASSET_BASE}/demo-serum-lifestyle.jpg`, // hand + dropper in sunlight
  howto: `${ASSET_BASE}/demo-serum-howto.jpg`, // dropper over wrist
  routine: `${ASSET_BASE}/demo-serum-routine.jpg`, // morning routine at the mirror
};

// Fictional store used across every mockup.
export const DEMO_STORE = { name: "Dewlab", domain: "dewlab.com", product: "Glow Serum" };
