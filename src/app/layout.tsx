import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://humaflo.github.io/gar2025-resilience-dashboard/"
  ),
  title: "GAR 2025 — Resilience Pays | Policy Intelligence Dashboard",
  description:
    "Multi-stakeholder dashboard transforming the UNDRR Global Assessment Report 2025 into actionable intelligence for policymakers. Direct losses $202B vs true cost $2.3T per year. Six action areas, three negative spirals, and the BCR case for resilience.",
  keywords: [
    "UNDRR",
    "GAR 2025",
    "Resilience Pays",
    "Disaster Risk Reduction",
    "Sendai Framework",
    "Climate Resilience",
    "Policy Dashboard",
    "Sovereign Risk",
    "Multi-Hazard Early Warning",
  ],
  authors: [{ name: "UNDRR — source report" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
