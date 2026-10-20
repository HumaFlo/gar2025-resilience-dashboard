import type { Metadata } from "next";
import { StuntingBrief } from "@/components/timor-leste-stunting/brief";

export const metadata: Metadata = {
  title: "Child Stunting in Timor-Leste: Prevalence, Causes & Nutrition Actions",
  description:
    "Explore child stunting in Timor-Leste, including 2025–26 prevalence, survey trends, differences by municipality, contributing factors, and evidence-based nutrition actions.",
  alternates: {
    canonical: "/timor-leste-stunting/",
  },
  openGraph: {
    title: "Child Stunting in Timor-Leste: Prevalence, Causes & Nutrition Actions",
    description:
      "A sourced brief on child stunting in Timor-Leste: 2025–26 prevalence, survey trends, municipality differences, contributing factors, and nutrition actions.",
    url: "/timor-leste-stunting/",
    siteName: "GAR 2025 — Resilience Pays",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Child Stunting in Timor-Leste: Prevalence, Causes & Nutrition Actions",
    description:
      "A sourced brief on child stunting in Timor-Leste: 2025–26 prevalence, survey trends, municipality differences, contributing factors, and nutrition actions.",
  },
  authors: [],
};

export default function TimorLesteStuntingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Child Stunting in Timor-Leste: Prevalence, Causes & Nutrition Actions",
    description:
      "A sourced brief on child stunting in Timor-Leste, covering prevalence, survey trends, municipality differences, contributing factors, and nutrition actions.",
    url: "https://humaflo.github.io/gar2025-resilience-dashboard/timor-leste-stunting/",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "GAR 2025 — Resilience Pays",
      url: "https://humaflo.github.io/gar2025-resilience-dashboard/",
    },
    about: {
      "@type": "Thing",
      name: "Childhood stunting and nutrition in Timor-Leste",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <StuntingBrief />
    </>
  );
}
