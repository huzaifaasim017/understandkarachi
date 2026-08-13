import type { Metadata } from "next";
import StoryExperience from "./StoryExperience";

export const metadata: Metadata = {
  title: "Understand Karachi — Shehar ko zero se samjhein",
  description: "Karachi ko zero se samjhein: samandar, saat districts, bari roads, transport, gateways, infrastructure aur rozmarra direction language.",
};

export default function Home() {
  return <StoryExperience />;
}
