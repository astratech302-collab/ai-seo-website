/** Line icons for the product menu and cards. Colour follows `currentColor`. */
const PATHS = {
  onsite_discovery: <path d="M4 7h10M4 12h7M4 17h4M17 5v13m0 0-3-3m3 3 3-3" />,
  ad_to_landing: <path d="M4 5h16v14H4zM4 9h16M8 13h8M8 16h5" />,
  catalog_enrichment: <path d="M12 3l8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" />,
  ai_visibility: <path d="M11 4l1.8 5.2L18 11l-5.2 1.8L11 18l-1.8-5.2L4 11l5.2-1.8zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />,
  answer_engine_optimization: <path d="M4 5h16v11H10l-5 4v-4H4zM8.5 10.5l2.5 2.5 4.5-4.5" />,
  ai_seo: <path d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 20 20M10.5 7.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />,
  technical_seo: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  reddit_marketing: <path d="M4 5h16v11H10l-5 4v-4H4zM8 10.5h8" />,
  conversion_rate_optimization: <path d="M4 19V5M4 19h16M7 15l4-4 3 3 5-6" />,
};

export default function ProductIcon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
