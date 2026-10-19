// Legal copy for /privacy-policy and /terms-and-conditions. Content is data: each section is
// { id, title, body: [string | { list: string[] }] }. Operator identity comes from
// LEGAL in config/site.js so it can be swapped when the company is registered.
import { ORG_NAME, LEGAL, SITE_URL } from "@/config/site";

const who = `${ORG_NAME}, operated by ${LEGAL.operator} (${LEGAL.entityType})`;
const mail = LEGAL.email;

export const PRIVACY = {
  path: "/privacy-policy",
  title: "Privacy Policy — How Geobuild Handles Your Data | Geobuild",
  description:
    "How Geobuild collects, uses and protects personal data, including Google Ads and Meta account data you connect, and how to access, correct or delete it.",
  eyebrow: "Privacy Policy",
  heading: "Privacy Policy",
  intro: `This policy explains what personal data ${ORG_NAME} collects, why, and the choices you have. It covers ${SITE_URL.replace("https://", "")} and the services we provide.`,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        `${who}, is the data controller for the information described here. You can reach us at ${mail}.`,
      ],
    },
    {
      id: "what-we-collect",
      title: "Information we collect",
      body: [
        "We collect only what we need to run the site and deliver our services:",
        {
          list: [
            "Information you give us: your website URL, work email, monthly marketing budget, optional phone number and any notes you add when you book a demo or contact us.",
            "Booking details: when you schedule a call, Calendly collects your name, email and chosen time on our behalf.",
            "Connected ad account data: if you connect a Google Ads or Meta ad account, we access the ad creative, headlines, copy, offers, audiences and related account details needed to build matching landing pages.",
            "Usage data: pages viewed, clicks, device and browser type, approximate location and referrer, collected through analytics and session replay.",
          ],
        },
      ],
    },
    {
      id: "google-user-data",
      title: "Google user data",
      body: [
        "If you connect a Google Ads account, you authorize us through Google's OAuth consent screen. We request access only to the Google Ads data needed to read your ads so we can suggest what each landing page should say and build pages that continue each ad.",
        "Our use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
        {
          list: [
            "We use Google user data only to provide and improve the user-facing features you asked for.",
            "We do not sell Google user data or use it for advertising, including retargeting or interest-based ads.",
            "We do not use Google user data to develop, improve or train generalized AI or machine-learning models.",
            "We do not allow humans to read your Google user data unless you give consent for specific data, it is needed for security or support, or the law requires it.",
            "We do not transfer Google user data to third parties except as needed to provide the service, to comply with law, or as part of a merger or sale with notice to you.",
          ],
        },
        "You can disconnect at any time and revoke our access at myaccount.google.com/permissions. On request, we delete the Google data we hold for your account.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      body: [
        {
          list: [
            "To respond to enquiries, schedule and prepare for demo calls, and deliver the services you request.",
            "To read your connected ads and generate landing pages and recommendations for your review.",
            "To operate, secure and improve the site, and understand which content is useful.",
            "To send service messages and, where you ask for them, updates about our work.",
            "To meet legal obligations and protect against fraud and abuse.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      title: "Who we share it with",
      body: [
        "We do not sell personal data. We share it only with service providers that help us run the business, under terms that limit their use of it:",
        {
          list: [
            "Calendly, for scheduling demo calls.",
            "Mixpanel, for product analytics and session replay.",
            "Amazon Web Services, for hosting and storage.",
            "AI model providers, to generate drafts and analysis for your brand. Google user data is never shared with them for model training.",
          ],
        },
        "We may also disclose information if required by law or to protect our rights, users or the public.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        "We use cookies and similar technologies for analytics and to remember preferences, such as a dismissed banner. Analytics may record interactions such as clicks and scrolls, and session replay may record how you move through pages. Form fields containing sensitive input are not intended to be captured. You can block cookies in your browser settings; the site will still work.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: [
        "We keep enquiry and booking details while we are in contact with you and for a reasonable period afterwards. Connected ad account data is kept while your account is connected and deleted after you disconnect and ask us to, or when it is no longer needed. We may keep limited records longer where the law requires.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "We use encryption in transit, access controls and least-privilege access to protect your data. No system is perfectly secure, so we cannot guarantee absolute security, but we will notify you of a breach affecting your data where the law requires.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights and choices",
      body: [
        `You can ask us to access, correct, export or delete your personal data, withdraw consent, or object to certain processing by emailing ${mail}. We respond within a reasonable time and in line with applicable law, including India's Digital Personal Data Protection Act, 2023 and, where relevant, the GDPR.`,
      ],
    },
    {
      id: "transfers",
      title: "International transfers",
      body: [
        `${ORG_NAME} is operated from ${LEGAL.country}, and our providers may process data in other countries. Where we transfer data, we rely on appropriate safeguards required by law.`,
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "Our services are for businesses and are not directed to anyone under 18. We do not knowingly collect data from children.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy. We will change the effective date above and, for material changes, tell you through the site or by email.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions or requests about privacy: ${mail}.`],
    },
  ],
};

export const TERMS = {
  path: "/terms-and-conditions",
  title: "Terms of Service — Using Geobuild's Site & Services | Geobuild",
  description:
    "The terms that apply when you use the Geobuild website and our agent-run AEO, GEO and SEO services, including connecting ad accounts and booking demos.",
  eyebrow: "Terms of Service",
  heading: "Terms of Service",
  intro: `These terms govern your use of the ${ORG_NAME} website and services. By using them you agree to these terms.`,
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [`The services are provided by ${who}. "We", "us" and "Geobuild" mean the operator.`],
    },
    {
      id: "services",
      title: "The services",
      body: [
        `${ORG_NAME} provides AEO, GEO and SEO work run by AI agents with a human strategist reviewing the output, plus tools such as ad-to-landing-page generation. A paid engagement may also be described in a proposal or order form; if it conflicts with these terms, that document controls for that engagement.`,
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility and accounts",
      body: [
        "You must be at least 18 and able to form a binding contract, and if you act for a business, you confirm you have authority to bind it. Keep any login or connection credentials secure and tell us promptly if you suspect misuse.",
      ],
    },
    {
      id: "connected-accounts",
      title: "Connected ad accounts",
      body: [
        "If you connect a Google Ads, Meta or other ad account, you confirm you are authorized to do so and to let us read its data to provide the services. You can disconnect at any time. How we handle that data is described in our Privacy Policy.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      body: [
        "You agree not to:",
        {
          list: [
            "break the law or infringe anyone's rights;",
            "submit content that is deceptive, harmful or that you have no right to use;",
            "probe, scrape, disrupt or reverse engineer the site or services;",
            "use the services to create misleading ads or landing pages, or to violate the policies of Google, Meta or any other platform.",
          ],
        },
      ],
    },
    {
      id: "your-content",
      title: "Your content and approvals",
      body: [
        "You keep ownership of your brand, ads and materials and give us the right to use them to deliver the services. You are responsible for reviewing and approving outputs, including landing pages and recommendations, before they are published or used in market.",
      ],
    },
    {
      id: "results",
      title: "No guarantee of results",
      body: [
        "Search and AI answer engines such as ChatGPT, Claude, Gemini, Perplexity and Google are controlled by third parties and change often. We work to improve your visibility and conversion but do not guarantee any ranking, citation, traffic or revenue outcome. AI-generated output can contain errors, which is why a human reviews it, and you should check it before relying on it.",
      ],
    },
    {
      id: "fees",
      title: "Fees and payment",
      body: [
        "Fees are those shown on the pricing page or agreed in writing for your engagement. Unless agreed otherwise, fees are due in advance, are non-refundable once work has started, and exclude taxes. Demo calls and audits offered as free carry no charge.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual property",
      body: [
        `The site, software, designs and the ${ORG_NAME} name are ours or our licensors'. Deliverables created for you become yours on payment in full, excluding our pre-existing tools, methods and templates, which we keep. Nothing here gives you rights to our trademarks.`,
      ],
    },
    {
      id: "third-parties",
      title: "Third-party services",
      body: [
        "The services depend on third parties such as Google, Meta, Calendly and AI model providers. Their terms apply to your use of them, and we are not responsible for their availability or changes.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      body: [
        'The site and services are provided "as is" and "as available". To the extent the law allows, we disclaim all warranties, including merchantability, fitness for a particular purpose and non-infringement.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the extent the law allows, we are not liable for indirect, incidental, special or consequential damages, or for lost profits, revenue or data. Our total liability for any claim is limited to the amount you paid us in the 3 months before the claim arose.",
      ],
    },
    {
      id: "indemnity",
      title: "Indemnity",
      body: [
        "You will defend and indemnify us against claims arising from your content, your misuse of the services or your breach of these terms.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      body: [
        "You can stop using the services at any time. We may suspend or end access if you breach these terms or if needed to comply with law. Sections that by nature should survive, such as ownership, disclaimers and liability, will survive.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      body: [
        `These terms are governed by ${LEGAL.governingLaw}. Courts in ${LEGAL.country} have jurisdiction over disputes, and we encourage you to contact us first so we can try to resolve it informally.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms. Changes take effect when posted, and continuing to use the services means you accept them. We will update the effective date above.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about these terms: ${mail}.`],
    },
  ],
};
