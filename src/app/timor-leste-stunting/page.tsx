import type { Metadata } from "next";
import { StuntingBrief } from "@/components/timor-leste-stunting/brief";

export const metadata: Metadata = {
  title: "Childhood Stunting in Timor-Leste | GAR 2025",
  description:
    "A data brief on childhood stunting in Timor-Leste: prevalence, trends, geographic disparities, causes, and evidence-based interventions.",
};

export default function TimorLesteStuntingPage() {
  return <StuntingBrief />;
}
