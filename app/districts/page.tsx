import type { Metadata } from "next";
import DistrictIndexExperience from "../features/districts/DistrictIndexExperience";

export const metadata: Metadata = {
  title: "Karachi District Atlas — Understand Karachi",
  description: "Explore Karachi's seven districts through clear positions, routes, anchors, areas, and source-backed deep dives.",
};

export default function DistrictsPage() {
  return <DistrictIndexExperience />;
}
