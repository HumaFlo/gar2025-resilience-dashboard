"use client";

import { motion } from "framer-motion";
import { costIceberg } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export function TrueCostSection() {
  const visiblePct = (
    (costIceberg.visible.value /
      (costIceberg.visible.value + costIceberg.hidden.value)) *
    100
  ).toFixed(1);

  return (
    <section id="true-cost" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <Droplets className="h-4 w-4" />
            Chapter 4 — What Disasters Really Cost
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The &ldquo;Missing Millions&rdquo; Beneath the Surface
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Official figures capture only direct damage to assets. But the real economic burden of disasters
            cascades through health systems, livelihoods, ecosystems, displacement, and supply chains — pushing
            the true annual cost to roughly{" "}
            <span className="font-semibold text-foreground">$2.3 trillion</span>, nearly{" "}
            <span className="font-semibold text-foreground">{costIceberg.multiplier}× higher</span> than what
            governments officially report.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Iceberg visual */}
          <Card className="relative overflow-hidden border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0">
            <div className="relative h-full min-h-[28rem] p-6">
              <div className="absolute inset-x-0 top-0 h-[22%] bg-[var(--rust-soft)]/40" />
              <div className="absolute inset-x-0 top-[22%] bottom-0 bg-muted" />
              <div className="absolute inset-x-0 top-[22%] h-px bg-[var(--rust)]" />
              <div className="absolute left-4 top-[20%] font-mono text-[10px] uppercase tracking-wider text-[var(--rust-ink)]">
                Waterline — official reporting stops here
              </div>

              <div className="relative z-10 flex h-full flex-col">
                {/* Visible portion */}
                <div className="flex h-[22%] flex-col justify-center px-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Above the waterline · Direct losses
                  </p>
                  <p className="text-3xl font-semibold tabular-nums text-[var(--rust-ink)]">
                    ${costIceberg.visible.value}B / yr
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{visiblePct}% of true cost</p>
                </div>

                {/* Hidden portion */}
                <div className="flex flex-1 flex-col justify-end gap-2 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Below the waterline · Indirect & cascading losses
                  </p>
                  <p className="text-3xl font-semibold tabular-nums">
                    ${costIceberg.hidden.value}B / yr
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(100 - Number(visiblePct)).toFixed(1)}% of true cost — historically invisible
                  </p>

                  <div className="mt-3 space-y-2">
                    {costIceberg.hidden.breakdown.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span
                          className="h-2.5 w-2.5 flex-shrink-0"
                          style={{ background: item.color }}
                        />
                        <span className="flex-1 text-muted-foreground">{item.label}</span>
                        <span className="font-semibold tabular-nums">${item.value}B</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Right-side context */}
          <div className="space-y-6">
            <Card className="border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-4">
              <h3 className="text-lg font-semibold">Why this matters for policymakers</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                The direct-losses figure is what most finance ministries plan against. But it is{" "}
                <span className="font-semibold text-foreground">less than 10%</span> of the real cost.
                Fiscal plans built on the visible tip alone will systematically{" "}
                <span className="font-semibold text-foreground">under-invest in prevention</span> — because the
                return on prevention shows up mostly in the hidden layer below.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                For comparison, a national debt of just <span className="font-semibold text-foreground">$300B</span>{" "}
                was enough to trigger the European sovereign debt crisis. Disaster risk is increasingly a systemic
                threat to financial stability on a global scale.
              </p>
            </Card>

            <Card className="border-x-0 border-b-0 p-0 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Where the &ldquo;missing millions&rdquo; live
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" style={{ background: "var(--chart-1)" }} />
                  <span>
                    <span className="font-medium">Health & education losses</span> — long-term declines in
                    educational attainment and chronic health burden, e.g. extreme-heat hospital admissions in
                    Europe add ~$2.8B/yr.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" style={{ background: "var(--chart-2)" }} />
                  <span>
                    <span className="font-medium">Livelihoods & informal economy</span> — income losses that never
                    appear in formal GDP accounting but devastate poor households.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" style={{ background: "var(--chart-3)" }} />
                  <span>
                    <span className="font-medium">Ecosystems & natural capital</span> — degradation of mangroves,
                    forests, fisheries — buffers that, once lost, amplify future losses.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" style={{ background: "var(--chart-4)" }} />
                  <span>
                    <span className="font-medium">Displacement & migration</span> — costs that fall hardest on the
                    poorest and cross borders.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0" style={{ background: "var(--chart-5)" }} />
                  <span>
                    <span className="font-medium">Supply-chain cascades</span> — blackouts from a single tropical
                    cyclone can affect up to 80 million people.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
