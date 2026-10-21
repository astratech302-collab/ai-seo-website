import GoogleAdsConnect from "./GoogleAdsConnect";

export const metadata = {
  title: "Connect Google Ads — Landing Page Report | Geobuild",
  description:
    "Connect your Google Ads account with read-only access and get a report mapping every ad to its landing page.",
  alternates: { canonical: "/google-ads" },
  robots: { index: false, follow: false }, // customer tool, not a marketing page
};

export default function GoogleAdsPage() {
  return (
    <main className="wrap section-pad">
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Google Ads landing-page report</h1>
      <p style={{ color: "var(--ink-2)", marginBottom: 32, maxWidth: 640 }}>
        Connect your Google Ads account, pick the accounts to share, and we map every ad to the
        landing page it sends traffic to. Access is read-only.
      </p>
      <GoogleAdsConnect />
    </main>
  );
}
