import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DistrictExperience from "../../features/districts/DistrictExperience";
import { districtsById, districts, type DistrictId } from "../../karachi-data";

type Props = { readonly params: Promise<{ districtId: string }> };

function isDistrictId(value: string): value is DistrictId {
  return value in districtsById;
}

export function generateStaticParams() {
  return districts.map((district) => ({ districtId: district.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { districtId } = await params;
  if (!isDistrictId(districtId)) return { title: "District not found — Understand Karachi" };
  const district = districtsById[districtId];
  return {
    title: `${district.name} District — Understand Karachi`,
    description: `Understand ${district.name} District through its position, major road chains, areas, anchors, and verified source references.`,
  };
}

export default async function DistrictPage({ params }: Props) {
  const { districtId } = await params;
  if (!isDistrictId(districtId)) notFound();
  return <DistrictExperience districtId={districtId} />;
}
