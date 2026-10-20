"use client";

import { motion } from "framer-motion";
import { bigFiveHazards, risingCostsTrend } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  CartesianGrid,
} from "recharts";
import { Flame, Waves, CloudLightning, Mountain, Sun, Activity } from "lucide-react";

const hazardIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  storms: CloudLightning,
  floods: Waves,
  earthquakes: Mountain,
  droughts: Sun,
  "extreme-heat": Flame,
};

const trendLabels: Record<string, { label: string; color: string }> = {
  intensifying: { label: "Intensifying", color: "text-red-800 bg-red-100" },
  worsening: { label: "Worsening", color: "text-orange-900 bg-orange-100" },
  "stable-but-costly": { label: "Stable but Costly", color: "text-amber-900 bg-amber-100" },
  expanding: { label: "Expanding", color: "text-orange-900 bg-orange-100" },
  accelerating: { label: "Accelerating", color: "text-red-800 bg-red-100" },
};

export function BigFiveSection() {
  const totalLosses = bigFiveHazards.reduce((sum, h) => sum + h.shareOfLosses, 0);

  return (
    <section id="big-five" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <Activity className="h-4 w-4" />
            Chapter 4 — Five Hazards Drive 95% of Losses
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The &ldquo;Big Five&rdquo; Hazards
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Five hazards — earthquakes, floods, storms, droughts, and extreme heat — account for over 95% of
            recorded economic losses from disasters. Between 1970 and 2023, climate hazards alone caused more than{" "}
            <span className="font-semibold text-foreground">$5.18 trillion</span> in losses; earthquakes added{" "}
            <span className="font-semibold text-foreground">$1.59 trillion</span>.
          </p>
        </div>

        {/* Charts row */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Donut chart - share of losses */}
          <Card className="lg:col-span-2 border-x-0 border-b-0 p-0 pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Share of recorded economic losses
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">1970–2023, % of total</p>
            <div className="mt-4 h-64" role="img" aria-label="Donut chart of each hazard's share of recorded economic losses from 1970 to 2023">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bigFiveHazards}
                    dataKey="shareOfLosses"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {bigFiveHazards.map((h) => (
                      <Cell key={h.id} fill={h.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {bigFiveHazards.map((h) => (
                <div key={h.id} className="flex items-center gap-2 text-xs">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: h.color }}
                  />
                  <span className="flex-1 text-muted-foreground">{h.name}</span>
                  <span className="font-semibold tabular-nums">{h.shareOfLosses}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Rising costs trend */}
          <Card className="lg:col-span-3 border-x-0 border-b-0 p-0 pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Rising direct cost of recorded disasters
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Decade averages, USD billions (1970–2023)
            </p>
            <div className="mt-4 h-64" role="img" aria-label="Bar chart of average annual recorded direct disaster costs by decade from 1970 to 2023, in billions of US dollars">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={risingCostsTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="period" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`$${v}B`, "Direct cost"]}
                  />
                  <Bar dataKey="directCost" fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Direct disaster costs averaged <span className="font-semibold">$70–80B / yr</span> between 1970 and
              2000; between 2001 and 2020 they grew to <span className="font-semibold">$180–200B / yr</span>.
            </p>
          </Card>
        </div>

        {/* Hazard cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {bigFiveHazards.map((hazard, i) => {
            const Icon = hazardIcons[hazard.id] ?? Activity;
            const trend = trendLabels[hazard.trend];
            return (
              <motion.div
                key={hazard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-x-0 border-b-0 p-0 pt-4 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="flex h-9 w-9 items-center justify-center"
                      style={{ background: `${hazard.color}20`, color: hazard.color }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <Badge variant="secondary" className={`text-[10px] ${trend.color}`}>
                      {trend.label}
                    </Badge>
                  </div>
                  <h4 className="mt-3 text-base font-semibold">{hazard.name}</h4>
                  <p className="mt-1 text-[11px] text-muted-foreground">{hazard.frequency}</p>

                  <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Losses 1970–2023
                      </span>
                      <span className="text-sm font-bold tabular-nums">
                        ${hazard.economicLosses1970_2023}B
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Share
                      </span>
                      <span className="text-sm font-bold tabular-nums">{hazard.shareOfLosses}%</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    {hazard.futureOutlook}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
          Combined, the Big Five account for <span className="font-semibold">{totalLosses}%</span> of recorded
          economic losses from disasters (1970–2023). Other hazards — volcanic, landslide, wildfire, and
          biological — make up the remainder.
        </p>
      </div>
    </section>
  );
}
