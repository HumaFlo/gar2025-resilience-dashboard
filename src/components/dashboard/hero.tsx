"use client";

import { motion } from "framer-motion";
import { reportMeta, headlineStats, costIceberg } from "@/lib/gar-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, TrendingDown, AlertTriangle, ChevronRight } from "lucide-react";

const severityStyles: Record<string, string> = {
  critical: "border-t-2 border-t-red-700",
  high: "border-t-2 border-t-orange-700",
  medium: "border-t-2 border-t-amber-700",
};

export function HeroSection() {
  return (
    <section id="overview" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-4xl flex-col items-start gap-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="border-0 bg-transparent px-0 font-mono text-[11px] uppercase tracking-wider text-[var(--rust-ink)]">
              UNDRR · Global Assessment Report 2025
            </Badge>
            <Badge variant="outline" className="text-xs">
              253 pages · 7 chapters
            </Badge>
          </div>

          <h1 className="text-balance">
            <span className="text-foreground">
              Resilience Pays
            </span>
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl text-pretty">
            {reportMeta.subtitle}. A multi-stakeholder intelligence layer on the UNDRR GAR 2025 report —
            turning 253 pages of analysis into{" "}
            <span className="font-semibold text-foreground">actionable intelligence</span> for evidence-based
            decision-making on disaster risk reduction.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 bg-red-700" />
              Direct losses $202B / year
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ArrowDown className="h-3.5 w-3.5 text-[var(--rust-ink)]" />
              True cost $2.3T / year (~10×)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-red-700" />
              19% income decline projected by 2050
            </span>
          </div>
        </motion.div>

        {/* Headline KPI grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {headlineStats.map((stat) => (
            <Card
              key={stat.id}
              className={`group relative border-x-0 border-b-0 p-0 pt-4 transition-colors ${severityStyles[stat.severity]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                {stat.severity === "critical" && (
                  <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.sublabel}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{stat.context}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
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
          <Card className="border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-6 sm:pt-8">
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
                    <p className="text-2xl font-semibold tabular-nums text-[var(--rust-ink)]">
                      ${costIceberg.visible.value}B
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90 lg:rotate-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Hidden / Indirect
                    </p>
                    <p className="text-2xl font-semibold tabular-nums">
                      ${costIceberg.hidden.value}B
                    </p>
                  </div>
                  <div className="ml-auto border border-red-700 px-3 py-2 text-xs font-semibold text-red-800">
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
