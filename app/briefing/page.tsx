import type { Metadata } from "next";
import BriefingExperience from "../features/briefing/BriefingExperience";

export const metadata: Metadata = {
  title: "Karachi Civic Briefing — Understand Karachi",
  description: "A sourced, printable briefing on Karachi's shape, districts, corridors, and infrastructure diagnostics for an institutional audience.",
};

export default function BriefingPage() {
  return <BriefingExperience />;
}
