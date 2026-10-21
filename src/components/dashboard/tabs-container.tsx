"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Globe2, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { reportMeta } from "@/lib/gar-data";
import { DashboardHeader } from "@/components/dashboard/header";
import { HeroSection } from "@/components/dashboard/hero";
import { TrueCostSection } from "@/components/dashboard/true-cost";
import { BigFiveSection } from "@/components/dashboard/big-five";
import { SpiralsSection } from "@/components/dashboard/spirals";
import { SendaiSection } from "@/components/dashboard/sendai";
import { VulnerableSection } from "@/components/dashboard/vulnerable";
import { FutureRoiSection } from "@/components/dashboard/future-roi";
import { FundingGapSection } from "@/components/dashboard/funding-gap";
import { ActionAreasSection } from "@/components/dashboard/action-areas";
import { StakeholderSection } from "@/components/dashboard/stakeholders";
import { DashboardFooter } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";

// Lazy-load the world map (echarts-gl is heavy — only load when user opens the Map tab)
const WorldRiskMap = lazy(() =>
  import("@/components/dashboard/world-map").then((m) => ({ default: m.WorldRiskMap }))
);

type Tab = "dashboard" | "map";

export function DashboardWithTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top-level tab bar (single header — no duplicate logo/title below) */}
      <div className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4">
            {/* Logo + brand (single occurrence) */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-[var(--rust-ink)]">
                <Globe2 className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">GAR 2025 — Resilience Pays</p>
                <p className="text-[10px] text-muted-foreground hidden sm:block">
                  Policy Intelligence Dashboard · UNDRR
                </p>
              </div>
            </div>

            {/* Tab switcher + Full Report link */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex min-h-11 text-xs"
                asChild
              >
                <a href={reportMeta.url} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Full Report
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </a>
              </Button>

              <div
                role="tablist"
                aria-label="Dashboard views"
                className="flex items-center gap-1 border border-border p-1"
                onKeyDown={(event) => {
                  const tabs = Array.from(
                    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                  );
                  const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
                  const nextIndex =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? tabs.length - 1
                        : event.key === "ArrowRight"
                          ? (currentIndex + 1) % tabs.length
                          : event.key === "ArrowLeft"
                            ? (currentIndex - 1 + tabs.length) % tabs.length
                            : -1;
                  if (nextIndex < 0) return;
                  event.preventDefault();
                  tabs[nextIndex].focus();
                  tabs[nextIndex].click();
                }}
              >
                <TabButton
                  active={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  icon={<LayoutDashboard className="h-3.5 w-3.5" />}
                  label="Policy Dashboard"
                  id="dashboard-tab"
                  controls="dashboard-panel"
                />
                <TabButton
                  active={activeTab === "map"}
                  onClick={() => setActiveTab("map")}
                  icon={<Globe2 className="h-3.5 w-3.5" />}
                  label="World Risk Map (3D)"
                  id="map-tab"
                  controls="map-panel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <main className="flex-1">
        {activeTab === "dashboard" && (
          <motion.div
            id="dashboard-panel"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section sub-nav (no logo, no title — just section links) */}
            <DashboardHeader />
            <HeroSection />
            <TrueCostSection />
            <BigFiveSection />
            <SpiralsSection />
            <SendaiSection />
            <VulnerableSection />
            <FutureRoiSection />
            <FundingGapSection />
            <ActionAreasSection />
            <StakeholderSection />
          </motion.div>
        )}

        {activeTab === "map" && (
          <motion.div
            id="map-panel"
            role="tabpanel"
            aria-labelledby="map-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WorldMapSection />
          </motion.div>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  id,
  controls,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  id: string;
  controls: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(" ")[0]}</span>
    </button>
  );
}

function WorldMapSection() {
  return (
    <section id="world-map" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <Globe2 className="h-4 w-4" />
            All Key Stats · One Map · 3D Visualization
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            World Risk Map — 3D Bar Visualization
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Every bar on this map represents a country. The bar&apos;s{" "}
            <span className="font-semibold text-foreground">height and color</span> visualize the selected
            risk metric — switch between direct losses, mortality, % of GDP, MHEWS coverage, and projected
            flood change by 2050. Hover any bar to see the full country profile across all six metrics.
          </p>
        </div>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center border-y border-border bg-muted/30">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin border-2 border-[var(--rust)] border-t-transparent" />
                  <p className="mt-3 text-sm text-muted-foreground">Loading 3D map visualization…</p>
                </div>
              </div>
            }
          >
            <WorldRiskMap height={680} />
          </Suspense>
        </div>

        {/* Methodology note */}
        <div className="mt-6 border-t border-border py-4 text-xs text-muted-foreground">
          <p>
            <span className="font-semibold">Methodology & sources:</span> Bar heights and colors are scaled
            to the selected metric&apos;s range. Country coordinates are approximate centroids. Data points
            are sourced from UNDRR GAR 2025 Chapter 1 (Sendai progress, vulnerable countries), Chapter 4
            (subregional direct losses 2000–2023, % of GDP), Chapter 5 (future flood risk projections by
            2050, RCP8.5), and Chapter 6 (sovereign credit rating impacts). Where country-level data is not
            reported in the source, subregional averages have been used. Some small island states and
            microstates may not be visible at this zoom level — use the filter buttons to isolate LDC, LLDC,
            and SIDS groups.
          </p>
        </div>
      </div>
    </section>
  );
}
