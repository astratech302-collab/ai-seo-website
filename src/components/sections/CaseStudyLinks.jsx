"use client";

import Link from "next/link";
import { CASE_STUDIES_PATH } from "@/data/caseStudies";
import { track } from "@/lib/track";

/** The tracked links on a case study page: back to the list, and the products used. */
export function BackToCaseStudies({ slug }) {
  return (
    <Link
      href={CASE_STUDIES_PATH}
      className="csd-back"
      onClick={() => track(`link_clicked/all_case_studies_${slug.replaceAll("-", "_")}`)}
    >
      <span aria-hidden>←</span> All case studies
    </Link>
  );
}

export function ProductsUsed({ slug, products }) {
  return (
    <ul className="csd-products">
      {products.map((p) => (
        <li key={p.key}>
          <Link
            href={p.href}
            onClick={() => track(`link_clicked/${p.key}_products_used_${slug.replaceAll("-", "_")}`)}
          >
            {p.name} <span aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
