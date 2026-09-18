"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { stakeholderPathways, sixActionAreas } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  ShieldAlert,
  Umbrella,
  Globe,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Users,
} from "lucide-react";

const stakeholderIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "finance-minister": Landmark,
  "drr-agency": ShieldAlert,
  "private-insurer": Umbrella,
  "multilateral-donor": Globe,
  humanitarian: HeartHandshake,
};

export function StakeholderSection() {
  const [activeId, setActiveId] = useState(stakeholderPathways[0].id);
  const active = stakeholderPathways.find((s) => s.id === activeId)!;
  const ActiveIcon = stakeholderIcons[active.id] ?? Users;
  const relevantAreas = sixActionAreas.filter((a) => active.relevantActionAreas.includes(a.id));

  return (
    <section
      id="stakeholders"
      className="scroll-mt-16 border-t bg-gradient-to-b from-background to-amber-500/5"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Users className="h-4 w-4" />
            Multi-Stakeholder Decision Pathways
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One Report. Five Policymaker Views.
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Different decision-makers need different lenses on the same evidence. Choose your role to surface
            the most relevant statistics, action areas, and policy levers — all anchored to the same GAR 2025
            data.
          </p>
        </div>

        {/* Stakeholder selector tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {stakeholderPathways.map((s) => {
            const Icon = stakeholderIcons[s.id] ?? Users;
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-100 shadow-sm"
                    : "border-border/60 bg-background text-muted-foreground hover:border-amber-500/40 hover:bg-amber-500/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Active stakeholder panel */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left panel — identity & key stats */}
              <div className="lg:col-span-2 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/5 p-6 sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white shadow-md">
                  <ActiveIcon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{active.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium">Primary concern: </span>
                  {active.primaryConcern}
                </p>

                <div className="mt-6 space-y-2">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Key statistics for your lens
                  </p>
                  {active.keyStats.map((stat) => (
                    <div
                      key={stat}
                      className="rounded-lg border border-border/60 bg-background/80 p-3 text-sm font-medium"
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right panel — actions and relevant action areas */}
              <div className="lg:col-span-3 p-6 sm:p-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Priority actions for this stakeholder
                </h4>
                <ol className="mt-3 space-y-3">
                  {active.actions.map((action, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-700 dark:text-amber-300">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{action}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 border-t border-border/60 pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Most relevant action areas from Chapter 7
                  </h4>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relevantAreas.map((area) => (
                      <a
                        key={area.id}
                        href="#actions"
                        className="group rounded-lg border border-border/60 p-3 transition-all hover:border-amber-500/40 hover:bg-amber-500/5"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
                            style={{ background: `${area.color}20`, color: area.color }}
                          >
                            {area.id}
                          </span>
                          <p className="text-sm font-semibold leading-tight">{area.title}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3" style={{ color: area.color }} />
                          {area.policyActions.length} policy actions
                          <ArrowRight className="h-3 w-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cross-stakeholder matrix */}
        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-border/60 bg-muted/30 px-6 py-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Action area × stakeholder matrix
            </h3>
            <p className="text-xs text-muted-foreground">
              Each action area is most directly owned by specific stakeholder groups.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stakeholder</th>
                  {sixActionAreas.map((area) => (
                    <th key={area.id} className="px-2 py-3 text-center font-medium text-muted-foreground">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
                          style={{ background: `${area.color}20`, color: area.color }}
                        >
                          {area.id}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stakeholderPathways.map((s) => {
                  const Icon = stakeholderIcons[s.id] ?? Users;
                  return (
                    <tr key={s.id} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          {s.label}
                        </div>
                      </td>
                      {sixActionAreas.map((area) => {
                        const has = s.relevantActionAreas.includes(area.id);
                        return (
                          <td key={area.id} className="px-2 py-3 text-center">
                            {has ? (
                              <CheckCircle2
                                className="h-4 w-4 mx-auto"
                                style={{ color: area.color }}
                              />
                            ) : (
                              <span className="text-muted-foreground/30">·</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
