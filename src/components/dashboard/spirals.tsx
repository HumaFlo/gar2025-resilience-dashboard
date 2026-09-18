"use client";

import { motion } from "framer-motion";
import { threeSpirals } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertCircle, ArrowRight, Lightbulb } from "lucide-react";

export function SpiralsSection() {
  return (
    <section id="spirals" className="scroll-mt-16 border-t bg-gradient-to-b from-background to-red-500/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
            <RefreshCw className="h-4 w-4" />
            Chapter 6 — Three Negative Spirals
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How Disaster Risk Destabilizes Economies
          </h2>
          <p className="max-w-3xl text-base text-muted-foreground">
            The report identifies three interconnected negative feedback loops — or &ldquo;spirals&rdquo; — that
            show how disaster risk can destabilize economies. These spirals{" "}
            <span className="font-semibold text-foreground">feed into one another</span>: failure to address one
            intensifies vulnerabilities elsewhere. Each has a specific breaker — a policy lever that interrupts
            the cycle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {threeSpirals.map((spiral, i) => (
            <motion.div
              key={spiral.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative h-full overflow-hidden border-l-4 p-6" style={{ borderLeftColor: spiral.color }}>
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-10" style={{ background: spiral.color }} />

                <div className="relative flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white shadow-md"
                    style={{ background: spiral.color }}
                  >
                    {spiral.number}
                  </div>
                  <RefreshCw className="h-5 w-5 animate-spin-slow text-muted-foreground/40" style={{ animationDuration: "6s" }} />
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-tight">{spiral.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground italic">{spiral.subtitle}</p>

                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Driver
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{spiral.driver}</p>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Symptoms
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {spiral.symptoms.map((s, j) => (
                      <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: spiral.color }} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-lg border border-border/60 bg-muted/40 p-3">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Consequence
                  </p>
                  <p className="mt-1 text-xs text-foreground leading-relaxed">{spiral.consequence}</p>
                </div>

                {/* Breaker */}
                <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
                      Breaker · {spiral.breaker}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {spiral.breakerDescription}
                  </p>
                  <a
                    href="#actions"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    See action area
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connector callout */}
        <Card className="mt-8 border-red-500/30 bg-red-500/5 p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <RefreshCw className="h-8 w-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-base font-semibold">The spirals compound one another</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                These spirals feed into each other: when Spiral 1 (risk creation) intensifies, insurers retreat
                (Spiral 2), pushing households and governments to absorb losses they can&apos;t afford — which
                deepens dependence on humanitarian response (Spiral 3). Breaking any one spiral weakens the
                others. That is why <span className="font-semibold text-foreground">integrated risk financing</span>{" "}
                — not siloed interventions — is the report&apos;s central recommendation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
