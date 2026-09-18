"use client";

import { motion } from "framer-motion";
import { reportMeta, headlineStats, costIceberg } from "@/lib/gar-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, TrendingDown, AlertTriangle, ChevronRight } from "lucide-react";

const severityStyles: Record<string, string> = {
  critical: "border-red-500/40 bg-red-500/5",
  high: "border-orange-500/40 bg-orange-500/5",
  medium: "border-amber-500/40 bg-amber-500/5",
};

export function HeroSection() {
  return (
    <section id="overview" className="relative scroll-mt-16 overflow-hidden">
      {/* Decorative gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-background" />
        <div className="absolute top-0 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/30">
              UNDRR · Global Assessment Report 2025
            </Badge>
            <Badge variant="outline" className="text-xs">
              253 pages · 7 chapters
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 bg-clip-text text-transparent">
              Resilience Pays
            </span>
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl text-pretty">
            {reportMeta.subtitle}. A multi-stakeholder intelligence layer on the UNDRR GAR 2025 report —
            turning 253 pages of analysis into{" "}
            <span className="font-semibold text-foreground">actionable intelligence</span> for evidence-based
            decision-making on disaster risk reduction.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Direct losses $202B / year
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ArrowDown className="h-3.5 w-3.5 text-orange-600" />
              True cost $2.3T / year (~10×)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
              19% income decline projected by 2050
            </span>
          </div>
        </motion.div>

        {/* Headline KPI grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {headlineStats.map((stat) => (
            <Card
              key={stat.id}
              className={`group relative overflow-hidden border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 ${severityStyles[stat.severity]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                {stat.severity === "critical" && (
                  <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.sublabel}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{stat.context}</p>
              <p className="mt-3 text-[10px] uppercase tracking-wide text-muted-foreground/70">
                Source: {stat.source}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Iceberg callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  The Disaster Cost Iceberg
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                  What policymakers see is only ~9% of what disasters actually cost. Below the waterline sit the
                  &ldquo;missing millions&rdquo; — health, livelihoods, ecosystems, displacement, supply chains. The
                  full economic logic for resilience investment lives there.
                </p>
                <div className="mt-4 flex flex-wrap items-baseline gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Visible / Direct
                    </p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                      ${costIceberg.visible.value}B
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90 lg:rotate-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Hidden / Indirect
                    </p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      ${costIceberg.hidden.value}B
                    </p>
                  </div>
                  <div className="ml-auto rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-300">
                    {costIceberg.multiplier}× undercount
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
