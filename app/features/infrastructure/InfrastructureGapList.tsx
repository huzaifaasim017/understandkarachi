import { ExternalLink, TriangleAlert } from "lucide-react";
import { sourcesById } from "../../karachi-data";
import type { Locale } from "../../karachi-i18n";
import type { InfrastructureGap, InfrastructureGapCategory } from "./infrastructureData";

export interface InfrastructureCopy {
  readonly title: string;
  readonly disclosureCommonlyReported: string;
  readonly disclosureSourced: string;
  readonly verifiedOn: (date: string) => string;
  readonly categoryLabels: Readonly<Record<InfrastructureGapCategory, string>>;
}

/**
 * Renders nothing when there are no gaps — absence of a block, not an empty
 * one, per `docs/specs/infrastructure-diagnostics.md`. Never merges into
 * `caution`/`remember` copy; always visually distinct from teaching content.
 */
export default function InfrastructureGapList({
  gaps,
  locale,
  copy,
  headingLevel: Heading = "h2",
}: {
  readonly gaps: readonly InfrastructureGap[];
  readonly locale: Locale;
  readonly copy: InfrastructureCopy;
  readonly headingLevel?: "h2" | "h3";
}) {
  if (gaps.length === 0) return null;

  return (
    <section className="infrastructure-gaps" aria-labelledby="infrastructure-gaps-title">
      <Heading id="infrastructure-gaps-title">{copy.title}</Heading>
      <div className="infrastructure-gap-list">
        {gaps.map((gap) => (
          <article key={gap.id} className="infrastructure-gap-card" data-category={gap.category}>
            <div className="infrastructure-gap-top">
              <TriangleAlert size={16} aria-hidden="true" />
              <span className="infrastructure-gap-category">{copy.categoryLabels[gap.category]}</span>
              <span className="infrastructure-gap-confidence">
                {gap.confidence === "sourced" ? copy.disclosureSourced : copy.disclosureCommonlyReported}
              </span>
            </div>
            <p className="infrastructure-gap-summary">{gap.summary[locale]}</p>
            <p className="infrastructure-gap-detail">{gap.detail[locale]}</p>
            <div className="infrastructure-gap-footer">
              <span>{copy.verifiedOn(gap.verifiedOn)}</span>
              <div className="infrastructure-gap-sources">
                {gap.sourceIds.map((sourceId) => {
                  const source = sourcesById[sourceId];
                  return (
                    <a key={sourceId} href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.publisher}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
