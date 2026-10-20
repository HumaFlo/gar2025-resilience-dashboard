"use client";

import { reportMeta } from "@/lib/gar-data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-red-700 text-white">
                <span className="text-xs font-bold">UN</span>
              </div>
              <div>
                <p className="text-sm font-semibold">GAR 2025 — Resilience Pays</p>
                <p className="text-xs text-muted-foreground">Policy Intelligence Dashboard</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">
              This dashboard transforms the UNDRR Global Assessment Report 2025 ({reportMeta.pages} pages) into
              a multi-stakeholder intelligence layer for evidence-based decision-making. All figures are
              attributed to source chapters of the underlying report. For feedback, use the{" "}
              <Link
                href="/timor-leste-stunting#feedback"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Timor-Leste brief feedback form
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Source report
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href={reportMeta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:text-amber-700 dark:hover:text-amber-400"
                >
                  UNDRR GAR 2025 (full)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/timor-leste-stunting"
                  className="text-foreground hover:text-amber-700 dark:hover:text-amber-400"
                >
                  Childhood stunting in Timor-Leste
                </Link>
              </li>
              <li className="text-muted-foreground">{reportMeta.publisher}</li>
              <li className="text-muted-foreground">Creative Commons CC BY-NC 3.0 IGO</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Citation
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              UNDRR (2025). Global Assessment Report on Disaster Risk Reduction 2025: Resilience Pays —
              Financing and Investing for our Future. United Nations Office for Disaster Risk Reduction,
              Geneva.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted-foreground">
            © 2025 UNDRR. Source material licensed under CC BY-NC 3.0 IGO. This dashboard is an analytical
            derivative, not an official UNDRR product.
          </p>
          <p className="text-[11px] text-muted-foreground">
            {reportMeta.callToAction}
          </p>
        </div>
      </div>
    </footer>
  );
}
