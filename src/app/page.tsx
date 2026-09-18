"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { HeroSection } from "@/components/dashboard/hero";
import { TrueCostSection } from "@/components/dashboard/true-cost";
import { BigFiveSection } from "@/components/dashboard/big-five";
import { SpiralsSection } from "@/components/dashboard/spirals";
import { SendaiSection } from "@/components/dashboard/sendai";
import { VulnerableSection } from "@/components/dashboard/vulnerable";
import { FutureRoiSection } from "@/components/dashboard/future-roi";
import { FundingGapSection } from "@/components/dashboard/funding-gap";
import { ActionAreasSection } from "@/components/dashboard/action-areas";
import { StakeholderSection } from "@/components/dashboard/stakeholders";
import { DashboardFooter } from "@/components/dashboard/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1">
        <HeroSection />
        <TrueCostSection />
        <BigFiveSection />
        <SpiralsSection />
        <SendaiSection />
        <VulnerableSection />
        <FutureRoiSection />
        <FundingGapSection />
        <ActionAreasSection />
        <StakeholderSection />
      </main>
      <DashboardFooter />
    </div>
  );
}
