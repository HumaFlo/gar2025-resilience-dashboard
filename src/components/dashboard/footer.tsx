"use client";

import { useEffect } from "react";
import { reportMeta } from "@/lib/gar-data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function DashboardFooter() {
  useEffect(() => {
    const status = document.querySelector<HTMLElement>("#page-views-status");
    const badge = document.querySelector<HTMLImageElement>("#page-views img");
    if (!status || !badge) return;

    badge.addEventListener("load", () => status.remove(), { once: true });
    badge.addEventListener(
      "error",
      () => {
        badge.hidden = true;
        status.textContent = "Views unavailable";
        console.error("Unable to load HumaFlo's hosted view counter.");
      },
      { once: true }
    );
    badge.hidden = false;
  }, []);

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center border border-border text-[var(--rust-ink)]">
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
                  className="inline-flex min-h-11 items-center gap-1 text-foreground hover:text-[var(--rust-ink)]"
                >
                  UNDRR GAR 2025 (full)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/timor-leste-stunting"
                  className="inline-flex min-h-11 items-center text-foreground hover:text-[var(--rust-ink)]"
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
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="text-[11px] text-muted-foreground">{reportMeta.callToAction}</p>
            <a
              href="https://humaflo.github.io/#feedback"
              className="text-[11px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              HumaFlo feedback
            </a>
            <p id="page-views" className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span id="page-views-status" role="status" aria-live="polite">
                Views loading…
              </span>
              <img
                src="https://hits.sh/humaflo.github.io.svg?label=Views&labelColor=78716c&color=57534e"
                alt="Views counter showing the HumaFlo homepage visit total"
                width="60"
                height="20"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                hidden
                className="h-4 w-auto"
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
