"use client";

import { motion } from "framer-motion";
import { futureRisk2050, roiOfResilience } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingDown, Rocket, CalendarClock, ArrowUpRight } from "lucide-react";

export function FutureRoiSection() {
  return (
    <section id="future-roi" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <CalendarClock className="h-4 w-4" />
            Chapter 5 — Future Risk to 2050 + Chapter 7 — ROI of Resilience
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trend Is Not Destiny
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Without action, climate-related hazards will shrink global incomes by{" "}
            <span className="font-semibold text-foreground">~19% by 2050</span>, with the heaviest losses in
            lower-income regions. But the same models show that{" "}
            <span className="font-semibold text-foreground">resilience investment can slow or reverse</span>{" "}
            this trajectory — and the benefit-cost ratios are extraordinary.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Future income decline chart */}
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Projected income decline by 2050
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Due to climate-related hazards · % decline vs no-climate-change baseline
            </p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={futureRisk2050.incomeDeclineRegions}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[-25, 0]}
                    tick={{ fontSize: 10 }}
                    stroke="var(--muted-foreground)"
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="region"
                    tick={{ fontSize: 10 }}
                    stroke="var(--muted-foreground)"
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v}%`, "Income decline"]}
                  />
                  <Bar dataKey="decline" radius={[0, 4, 4, 0]}>
                    {futureRisk2050.incomeDeclineRegions.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Global average decline: <span className="font-semibold text-red-700 dark:text-red-400">-19%</span>.
              Sub-Saharan Africa, South Asia, and MENA bear the largest projected losses.
            </p>
          </Card>

          {/* ROI of resilience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                The business case for resilience
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Benefit-cost ratios (BCR) from GAR 2025 case studies and reviews. Disasters are already
              <span className="font-semibold text-foreground"> considerably more expensive</span> than the
              measures that would prevent them.
            </p>

            <div className="space-y-3">
              {roiOfResilience.map((item, i) => {
                const bcrMultiple = item.bcr;
                return (
                  <motion.div
                    key={item.intervention}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="overflow-hidden border-l-4 border-emerald-500/60 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold leading-tight">{item.intervention}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">BCR</p>
                          <p className="text-xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                            {bcrMultiple.toFixed(1)}:1
                          </p>
                          <Badge variant="secondary" className="text-[9px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                            {item.bcrLabel}
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="mt-2 text-[10px] text-muted-foreground/70">{item.source}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Future hazards table */}
        <Card className="mt-8 p-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What changes by 2050 — by hazard
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {futureRisk2050.keyProjections.map((proj, i) => (
              <motion.div
                key={proj.hazard}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border border-border/60 bg-muted/30 p-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {proj.hazard}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  {proj.projection}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-900 dark:text-emerald-100">
            <ArrowUpRight className="h-4 w-4 flex-shrink-0" />
            <span>
              <span className="font-semibold">Resilience Pays:</span> even modest investments can slow or
              reverse these trajectories. BCRs of 2:1 to 10:1+ are typical — among the highest returns in
              development finance.
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}
