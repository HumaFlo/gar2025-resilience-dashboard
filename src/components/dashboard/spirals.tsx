"use client";

import { motion } from "framer-motion";
import { threeSpirals } from "@/lib/gar-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertCircle, ArrowRight, Lightbulb } from "lucide-react";

export function SpiralsSection() {
  return (
    <section id="spirals" className="scroll-mt-32 border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--rust-ink)]">
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
              <Card className="h-full border-x-0 border-b-0 p-0 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-border font-mono text-xl font-semibold text-foreground">
                    {spiral.number}
                  </div>
                  <RefreshCw aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
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

                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Consequence
                  </p>
                  <p className="mt-1 text-xs text-foreground leading-relaxed">{spiral.consequence}</p>
                </div>

                {/* Breaker */}
                <div className="mt-4 border-t-2 border-emerald-700 pt-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[var(--green)]" />
                    <p className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[var(--green)]">
                      Breaker · {spiral.breaker}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {spiral.breakerDescription}
                  </p>
                  <a
                    href="#actions"
                    className="mt-3 inline-flex min-h-11 items-center gap-1 text-[11px] font-semibold text-[var(--green)] hover:underline"
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
        <Card className="mt-8 border-x-0 border-b-0 border-t-2 border-t-[var(--rust)] p-0 pt-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <RefreshCw className="h-8 w-8 text-[var(--rust-ink)] flex-shrink-0" />
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
