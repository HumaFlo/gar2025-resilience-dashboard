"use client";

import { useState, useEffect } from "react";
import { reportMeta } from "@/lib/gar-data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu, FileText, ExternalLink } from "lucide-react";

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

  // Sub-navigation bar — section links only (no logo, no title, no brand block)
  // The top-level brand/logo/tabs are owned by <DashboardWithTabs/> in tabs-container.tsx
  return (
    <div className="sticky top-14 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop section nav */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8 flex-shrink-0"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle section navigation menu</span>
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

        {/* Right side: section indicator on mobile / spacer on desktop */}
        <div className="lg:hidden text-xs font-medium text-muted-foreground truncate ml-2">
          {navItems.find((n) => n.id === activeSection)?.label ?? "Overview"}
        </div>
      </div>
    </div>
  );
}

