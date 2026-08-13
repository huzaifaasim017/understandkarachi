import type { Metadata } from "next";
import CrossingExperience from "../features/cross-city/CrossingExperience";

export const metadata: Metadata = {
  title: "Karachi Crossing Guide — Understand Karachi",
  description: "Learn safe city-scale Karachi crossings through mode, gate, spine, hub, and local checkpoints without mistaking the guide for live navigation.",
};

export default function CrossingsPage() {
  return <CrossingExperience />;
}
