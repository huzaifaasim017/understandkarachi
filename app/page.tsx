import type { Metadata } from "next";
import StoryExperience from "./StoryExperience";

export const metadata: Metadata = {
  title: "Understand Karachi — Shehar ko zero se samjhein",
  description: "Karachi ke districts, bari roads, junctions, landmarks aur city systems ko zero se samjhein.",
};

export default function Home() {
  return <StoryExperience />;
}
