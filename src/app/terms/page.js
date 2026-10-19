import LegalPage from "@/components/sections/LegalPage";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { TERMS } from "@/data/legal";

export const metadata = {
  title: TERMS.title,
  description: TERMS.description,
  alternates: { canonical: TERMS.path },
};

export default function TERMSPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({ name: TERMS.title, description: TERMS.description, path: TERMS.path }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: TERMS.heading, path: TERMS.path },
          ]),
        ]}
      />
      <LegalPage doc={TERMS} />
    </>
  );
}
