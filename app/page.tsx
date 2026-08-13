import type { Metadata } from "next";
import StoryExperience from "./StoryExperience";

export const metadata: Metadata = {
  title: "Understand Karachi — Shehar ko zero se samjhein",
  description: "Bike, car ya transit se Karachi cross karna samjhein: entry gates, bari roads, junctions, landmarks, districts aur last-mile handoff.",
};

export default function Home() {
  return <StoryExperience />;
}
