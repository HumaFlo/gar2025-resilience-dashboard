"use client";

import { motion } from "framer-motion";
import { sendaiTargets, mhewsCoverageTrend, nationalDRRStrategiesTrend } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CheckCircle2, XCircle, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

const statusStyles: Record<
  string,
  { badge: string; icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  "on-track": {
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle2,
    label: "On Track",
  },
  "off-track": {
    badge: "bg-red-500/15 text-red-700 dark:text-red-400",
    icon: XCircle,
    label: "Off Track",
  },
  mixed: {
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    icon: AlertCircle,
    label: "Mixed Progress",
  },
};

const directionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  improving: TrendingUp,
  worsening: TrendingDown,
  "improving-but-insufficient": TrendingUp,
  "improving-but-uneven": TrendingUp,
  "stable-but-costly": Minus,
};

export function SendaiSection() {
  return (
    <section id="sendai" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <CheckCircle2 className="h-4 w-4" />
            Chapter 1 — Sendai Framework 2015–2030 Progress
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Seven Targets, Mixed Progress
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            163 countries are now reporting to the Sendai Framework Monitor (up from 88 in 2018). The world is{" "}
            <span className="font-semibold text-foreground">not on track</span> to meet the Framework&apos;s 2030
            outcome — but progress on governance, strategy, and early warnings shows that investment in DRR is
            paying off.
          </p>
        </div>

        {/* Targets grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sendaiTargets.map((target, i) => {
            const status = statusStyles[target.status];
            const StatusIcon = status.icon;
            const DirectionIcon = directionIcons[target.direction] ?? Minus;
            return (
              <motion.div
                key={target.code}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full p-5 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-amber-500/50 bg-amber-500/10 font-bold text-amber-700 dark:text-amber-300">
                        {target.code}
                      </div>
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className={`text-[10px] ${status.badge}`}>
                      {status.label}
                    </Badge>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold leading-tight">{target.title}</h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <DirectionIcon
                      className={`h-3.5 w-3.5 ${
                        target.direction === "worsening"
                          ? "text-red-600"
                          : target.direction === "improving"
                            ? "text-emerald-600"
                            : "text-amber-600"
                      }`}
                    />
                    <span className="text-lg font-bold tabular-nums">{target.change}</span>
                  </div>

                  <div className="mt-3 space-y-1 border-t border-border/60 pt-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Baseline</span>
                      <span className="font-medium">{target.baseline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current</span>
                      <span className="font-medium">{target.current}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{target.insight}</p>

                  <p className="mt-2 text-[11px] italic text-amber-800 dark:text-amber-200/80">
                    ⚠ {target.caveat}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trend charts */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Countries with multi-hazard early warning systems
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">Target G · 2015 → 2023</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mhewsCoverageTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis domain={[50, 95]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v} countries`, "MHEWS"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="countries"
                    stroke="var(--chart-2)"
                    strokeWidth={3}
                    dot={{ r: 3, fill: "var(--chart-2)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Grew from <span className="font-semibold">59</span> in 2015 to{" "}
              <span className="font-semibold">90</span> in 2023 — but coverage is uneven. Only 38% of SIDS, 63%
              of LLDCs, and 49% of LDCs have MHEWS in place.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              National DRR strategies — quantity &amp; quality
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">Target E · 2015 → 2023</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nationalDRRStrategiesTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--background)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total strategies"
                    stroke="var(--chart-3)"
                    strokeWidth={2.5}
                    dot={{ r: 2.5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="highQuality"
                    name="High quality (score 0.75–1)"
                    stroke="var(--chart-2)"
                    strokeWidth={2.5}
                    dot={{ r: 2.5 }}
                    strokeDasharray="5 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Total strategies more than doubled; high-quality strategies{" "}
              <span className="font-semibold">quadrupled</span> from 14 → 57.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
