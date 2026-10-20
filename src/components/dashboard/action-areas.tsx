"use client";

import { motion } from "framer-motion";
import { sixActionAreas } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  ShieldCheck,
  Umbrella,
  Briefcase,
  LifeBuoy,
  Globe2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": Database,
  "2": ShieldCheck,
  "3": Umbrella,
  "4": Briefcase,
  "5": LifeBuoy,
  "6": Globe2,
};

export function ActionAreasSection() {
  return (
    <section id="actions" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
            <CheckCircle2 className="h-4 w-4" />
            Chapter 7 — Conclusion · Six Strategic Action Areas
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Six Areas Where Action Must Concentrate
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            Managing risk for the 21st century requires action across six interlocking areas. Each area has
            specific policy levers, primary stakeholders, and measurable outcomes. Together they form the
            integrated agenda to break the destructive cycle of disaster, recovery, and debt.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sixActionAreas.map((area, i) => {
            const Icon = actionIcons[area.id] ?? CheckCircle2;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="group h-full border-x-0 border-b-0 p-0 pt-4 transition-colors">
                  <div className="p-0">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center border border-border"
                        style={{ background: `${area.color}20`, color: area.color }}
                      >
                        <Icon className="h-5.5 w-5.5" />
                      </div>
                      <span
                        className="font-mono text-3xl font-semibold tabular-nums text-muted-foreground"
                        style={{ color: area.color }}
                      >
                        0{area.id}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold leading-tight">{area.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{area.summary}</p>

                    <Accordion type="single" collapsible className="mt-3">
                      <AccordionItem value={`actions-${area.id}`} className="border-0">
                        <AccordionTrigger className="min-h-11 py-2 text-xs hover:no-underline">
                          <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                            <CheckCircle2 className="h-3 w-3" style={{ color: area.color }} />
                            Policy actions ({area.policyActions.length})
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-1">
                          <ul className="space-y-2">
                            {area.policyActions.map((action, j) => (
                              <li
                                key={j}
                                className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground"
                              >
                                <span
                                  className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                  style={{ background: area.color }}
                                />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-3 border-t border-border pt-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        Primary stakeholders
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {area.primaryStakeholders.map((s) => (
                          <Badge key={s} variant="secondary" className="text-[10px] py-0.5">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#stakeholders"
                      className="mt-4 inline-flex min-h-11 items-center gap-1 text-[11px] font-semibold text-[var(--rust-ink)] hover:underline"
                    >
                      See stakeholder pathway
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Closing call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-5 sm:pt-6">
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--rust-ink)]">Act Now</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Break the cycle. Build resilience.
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90">
                  The pathway beyond 2030 need not be defined by shocks and piecemeal, unplanned recovery.
                  Proactive investment in resilience can pave the way to a future defined by stability,
                  prosperity, and sustainable progress. The opportunities for transformative action are clear.
                  Now it is up to decision-makers across the globe to seize them.
                </p>
              </div>
              <div className="flex-shrink-0 border-t border-border px-6 py-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Resilience BCR
              </p>
                <p className="text-3xl font-bold tabular-nums">2:1 → 10:1+</p>
                <p className="mt-1 text-xs text-muted-foreground">across interventions</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
