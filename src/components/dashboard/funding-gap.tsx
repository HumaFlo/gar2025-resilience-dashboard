"use client";

import { motion } from "framer-motion";
import { fundingGap } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Wallet, Banknote, Globe, AlertOctagon } from "lucide-react";

export function FundingGapSection() {
  // Data for visualization
  const odaPie = [
    { name: "ODA for DRR (prevention & preparedness)", value: 1, color: "var(--rust)" },
    { name: "Other ODA", value: 99, color: "var(--hair)" },
  ];
  const humanitarianPie = [
    { name: "Prevention & preparedness", value: 3.3, color: "var(--rust)" },
    { name: "Response & recovery", value: 96.7, color: "var(--hair)" },
  ];

  return (
    <section id="funding-gap" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <Wallet className="h-4 w-4" />
            Chapter 6 — The Funding Gap
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            We Spend Billions on Response — Pennies on Prevention
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Despite BCRs of 2:1 to 10:1+ for disaster risk reduction, the global financial system is
            structurally biased toward response and recovery. The gap between what is needed and what is spent
            represents one of the highest-leverage policy opportunities in development finance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ODA chart */}
          <Card className="border-x-0 border-b-0 p-0 pt-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Official Development Assistance (ODA)
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">2019–2023 · % officially categorized as DRR</p>

            <div className="mt-4 grid grid-cols-2 gap-4 items-center">
              <div className="h-44" role="group" aria-label="Donut chart showing one percent of official development assistance categorized as disaster risk reduction and 99 percent other assistance">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={odaPie}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={35}
                      outerRadius={65}
                      paddingAngle={1}
                    >
                      {odaPie.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid var(--border)",
                        background: "var(--background)",
                        fontSize: "11px",
                      }}
                      formatter={(v: number) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-4xl font-semibold text-[var(--rust-ink)] tabular-nums">1%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  of total ODA is officially categorized as DRR, prevention, and preparedness.
                </p>
                <p className="mt-3 text-[11px] text-muted-foreground">{fundingGap.odaForDRR.context}</p>
              </div>
            </div>
          </Card>

          {/* Humanitarian chart */}
          <Card className="border-x-0 border-b-0 p-0 pt-4">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Humanitarian Aid for Prevention
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">2019–2023 · % allocated to prevention &amp; preparedness</p>

            <div className="mt-4 grid grid-cols-2 gap-4 items-center">
              <div className="h-44" role="group" aria-label="Donut chart showing 3.3 percent of humanitarian aid allocated to prevention and preparedness and 96.7 percent for other uses">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={humanitarianPie}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={35}
                      outerRadius={65}
                      paddingAngle={1}
                    >
                      {humanitarianPie.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid var(--border)",
                        background: "var(--background)",
                        fontSize: "11px",
                      }}
                      formatter={(v: number) => [`${v}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-4xl font-semibold text-[var(--rust-ink)] tabular-nums">3.3%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  of humanitarian aid goes to prevention &amp; preparedness — down from{" "}
                  <span className="font-semibold">3.6%</span> in 2015–2018.
                </p>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {fundingGap.humanitarianForPrevention.context}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom stats */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card className="border-x-0 border-b-0 p-0 pt-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center text-muted-foreground">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums">
                  {fundingGap.countriesWithDedicatedDRRFinance.count}
                </p>
                <p className="text-sm font-semibold">
                  countries received dedicated international DRR financial support in 2023
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {fundingGap.countriesWithDedicatedDRRFinance.context}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-x-0 border-b-0 p-0 pt-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center text-[var(--rust-ink)]">
                <AlertOctagon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums">
                  {fundingGap.costOfInaction.value}
                </p>
                <p className="text-sm font-semibold">true cost of disasters per year</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {fundingGap.costOfInaction.context}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Closing argument */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-5 sm:pt-6">
            <h3 className="text-lg font-semibold">
              The mismatch is structural — and structurally fixable
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              The mathematics are clear: investing in resilience pays back{" "}
              <span className="font-semibold text-foreground">2:1 to 10:1 or more</span>, while response-only
              spending keeps countries trapped in the response-repeat spiral. Yet only 1% of ODA flows to DRR.
              A reallocative shift — even just doubling that share — would unlock the multiplier effect of
              international financial mechanisms identified in GAR 2025&apos;s sixth action area.
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Tools exist: budget tagging, debt-for-resilience swaps, contingent financing, anticipatory
              finance tied to early warning triggers, and reinsurance-style coverage for LDCs and SIDS. The
              instruments are ready. The political will is the constraint.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
