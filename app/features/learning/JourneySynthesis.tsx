"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import {
  districtProfileFacts,
  districtsById,
  type DistrictId,
} from "../../karachi-data";
import type { Locale, SiteCopy } from "../../karachi-i18n";

const START_DISTRICT: DistrictId = "west";
const END_DISTRICT: DistrictId = "malir";

/** Bidirectional adjacency built from canonical `nextDistricts` so a chain is
 * "graph-plausible" even when only one side lists the relationship. */
const adjacency: Readonly<Record<DistrictId, readonly DistrictId[]>> = (() => {
  const map = new Map<DistrictId, Set<DistrictId>>();
  const add = (a: DistrictId, b: DistrictId) => {
    if (!map.has(a)) map.set(a, new Set());
    map.get(a)!.add(b);
  };
  for (const profile of districtProfileFacts) {
    for (const neighbour of profile.nextDistricts) {
      add(profile.districtId, neighbour);
      add(neighbour, profile.districtId);
    }
  }
  return Object.fromEntries(
    Array.from(map.entries()).map(([id, set]) => [id, Array.from(set)]),
  ) as unknown as Record<DistrictId, readonly DistrictId[]>;
})();

function findShortestChain(start: DistrictId, end: DistrictId): readonly DistrictId[] {
  const queue: DistrictId[][] = [[start]];
  const visited = new Set<DistrictId>([start]);
  while (queue.length > 0) {
    const path = queue.shift()!;
    const last = path[path.length - 1];
    if (last === end) return path;
    for (const neighbour of adjacency[last] ?? []) {
      if (visited.has(neighbour)) continue;
      visited.add(neighbour);
      queue.push([...path, neighbour]);
    }
  }
  return [start, end];
}

function isConnectedChain(chain: readonly DistrictId[]): boolean {
  for (let index = 0; index < chain.length - 1; index += 1) {
    if (!(adjacency[chain[index]] ?? []).includes(chain[index + 1])) return false;
  }
  return true;
}

export default function JourneySynthesis({ copy }: { readonly locale: Locale; readonly copy: SiteCopy["synthesis"] }) {
  const [path, setPath] = useState<readonly DistrictId[]>([]);
  const [checked, setChecked] = useState(false);
  const start = districtsById[START_DISTRICT];
  const end = districtsById[END_DISTRICT];
  const middleOptions = useMemo(
    () => Object.keys(districtsById)
      .filter((id): id is DistrictId => id !== START_DISTRICT && id !== END_DISTRICT),
    [],
  );
  const fullChain = useMemo(() => [START_DISTRICT, ...path, END_DISTRICT], [path]);
  const connected = useMemo(() => path.length > 0 && isConnectedChain(fullChain), [fullChain, path.length]);
  const expertChain = useMemo(() => findShortestChain(START_DISTRICT, END_DISTRICT), []);

  const toggleDistrict = (id: DistrictId) => {
    setChecked(false);
    setPath((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const reset = () => {
    setPath([]);
    setChecked(false);
  };

  return (
    <section className="journey-synthesis" aria-labelledby="synthesis-title">
      <h2 id="synthesis-title">{copy.title}</h2>
      <p className="journey-synthesis-instruction">{copy.instruction(start.name, end.name)}</p>

      <div className="journey-synthesis-chain" aria-live="polite">
        <span className="journey-synthesis-endpoint">{start.name}</span>
        {path.map((id) => (
          <span key={id}><ArrowRight size={14} aria-hidden="true" />{districtsById[id].name}</span>
        ))}
        <ArrowRight size={14} aria-hidden="true" />
        <span className="journey-synthesis-endpoint">{end.name}</span>
      </div>

      <div className="journey-synthesis-options">
        {middleOptions.map((id) => {
          const district = districtsById[id];
          const isSelected = path.includes(id);
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isSelected}
              className={isSelected ? "is-selected" : ""}
              onClick={() => toggleDistrict(id)}
            >
              {district.name}
            </button>
          );
        })}
      </div>

      <div className="journey-synthesis-actions">
        <button type="button" className="journey-synthesis-check" onClick={() => setChecked(true)}>
          {copy.checkButton}
        </button>
        <button type="button" className="journey-synthesis-reset" onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" />
          {copy.resetButton}
        </button>
      </div>

      {checked && (
        <p className="journey-synthesis-feedback" role="status">
          {path.length === 0
            ? copy.incompleteMessage
            : connected
              ? copy.successMessage
              : copy.disconnectedMessage}
        </p>
      )}
      {checked && (
        <p className="journey-synthesis-expert">
          <b>{copy.expertChainLabel}:</b>{" "}
          {expertChain.map((id) => districtsById[id].name).join(" → ")}
        </p>
      )}
    </section>
  );
}
