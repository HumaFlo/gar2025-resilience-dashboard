"use client";

import { useState, useEffect } from "react";
import { reportMeta } from "@/lib/gar-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu, Globe2, FileText, ExternalLink } from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "true-cost", label: "True Cost" },
  { id: "big-five", label: "Big Five Hazards" },
  { id: "spirals", label: "Three Spirals" },
  { id: "sendai", label: "Sendai Progress" },
  { id: "vulnerable", label: "Vulnerable Countries" },
  { id: "future-roi", label: "Future & ROI" },
  { id: "funding-gap", label: "Funding Gap" },
  { id: "actions", label: "Six Action Areas" },
  { id: "stakeholders", label: "Stakeholder Pathways" },
];

export function DashboardHeader() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 text-white shadow-md">
            <Globe2 className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">GAR 2025 — Resilience Pays</p>
            <p className="text-[10px] text-muted-foreground hidden sm:block">
              Policy Intelligence Dashboard · UNDRR
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex h-8 text-xs"
            asChild
          >
            <a href={reportMeta.url} target="_blank" rel="noopener noreferrer">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Full Report
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Dashboard Sections</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    size="sm"
                    className="justify-start h-9"
                    onClick={() => scrollTo(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
                <a
                  href={reportMeta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  Open full UNDRR GAR report
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </header>
  );
}
