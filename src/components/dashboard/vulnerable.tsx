"use client";

import { motion } from "framer-motion";
import { vulnerableCountries } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, HeartPulse, Banknote, Bell } from "lucide-react";

export function VulnerableSection() {
  return (
    <section id="vulnerable" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <Users className="h-4 w-4" />
            Chapter 1 · Box 1 — Disproportionate Burden
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Countries Most at Risk Have the Least Protection
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Least Developed Countries (LDCs), Landlocked Developing Countries (LLDCs), and Small Island
            Developing States (SIDS) face steep challenges. Despite strong political will, many struggle with
            limited resources and technical capacity. Disasters are far deadlier and more disruptive in these
            countries — and yet their access to early warning systems is the lowest.
          </p>
        </div>

        {/* Country group cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {vulnerableCountries.map((country, i) => {
            const mortalityMultiple = (country.mortalityPer100k / country.globalAverage).toFixed(1);
            const lossMultiple = (country.shareOfLosses / country.shareOfGDP).toFixed(1);
            return (
              <motion.div
                key={country.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-x-0 border-b-0 p-0 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{country.group}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{country.fullName}</p>
                    </div>
                    <Badge variant="secondary" className="border border-border bg-transparent font-mono text-[10px] text-foreground">
                      {country.mhewsCoverage}% MHEWS
                    </Badge>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="border-t border-border pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <HeartPulse className="h-3 w-3" />
                        Mortality
                      </div>
                      <p className="mt-1 text-xl font-bold tabular-nums">{country.mortalityPer100k}</p>
                      <p className="text-[10px] text-muted-foreground">per 100k</p>
                      <p className="mt-2 text-[11px] font-semibold text-red-700 dark:text-red-400">
                        {mortalityMultiple}× global avg
                      </p>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Banknote className="h-3 w-3" />
                        Loss vs GDP share
                      </div>
                      <p className="mt-1 text-xl font-bold tabular-nums">{lossMultiple}×</p>
                      <p className="text-[10px] text-muted-foreground">over-represented</p>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {country.shareOfLosses}% of losses vs {country.shareOfGDP}% of GDP
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border/60 pt-3">
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Only <span className="font-semibold text-foreground">{country.mhewsCoverage}%</span> have
                      multi-hazard early warning systems. Closing this gap is essential to equitable progress.
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Disparity highlight callout */}
        <Card className="mt-8 border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-5 sm:pt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-red-700 dark:text-red-400">
                <Bell className="h-3.5 w-3.5" />
                The Imbalance
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                Countries most needing resilience investments are often least equipped to deliver them.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                A storm that costs <span className="font-semibold text-foreground">0.2% of GDP</span> in North
                America can wipe out <span className="font-semibold text-foreground">46% of GDP</span> in a
                Pacific island nation. A single disaster event in LDCs and SIDS can have devastating
                consequences for the national economy — and increasingly triggers sovereign credit downgrades
                that further constrain fiscal space.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                LLDCs report <span className="font-semibold text-foreground">3,126 disaster-affected people per
                100,000</span> — 54% higher than the global average. Between 2015 and 2023, LDCs accounted for
                <span className="font-semibold text-foreground"> 10.4%</span> of reported global disaster-related
                economic losses, despite making up only <span className="font-semibold text-foreground">1.06%</span> of
                the total GDP of reporting countries.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  MHEWS coverage gap
                </p>
                <div className="mt-2 space-y-2 text-xs">
                  {vulnerableCountries.map((c) => (
                    <div key={c.group} className="flex items-center gap-2">
                      <span className="w-12 text-muted-foreground">{c.group}</span>
                      <div className="flex-1 h-2 bg-muted overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${c.mhewsCoverage}%`,
                            background: c.color,
                          }}
                        />
                      </div>
                      <span className="font-semibold tabular-nums">{c.mhewsCoverage}%</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
                    Global target: universal coverage by 2027 (EW4All)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
