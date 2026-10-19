import LegalPage from "@/components/sections/LegalPage";
import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { PRIVACY } from "@/data/legal";

export const metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  alternates: { canonical: PRIVACY.path },
};

export default function PRIVACYPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({ name: PRIVACY.title, description: PRIVACY.description, path: PRIVACY.path }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: PRIVACY.heading, path: PRIVACY.path },
          ]),
        ]}
      />
      <LegalPage doc={PRIVACY} />
    </>
  );
}
