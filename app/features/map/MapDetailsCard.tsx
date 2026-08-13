import { AlertTriangle, ChevronRight, X } from "lucide-react";
import type { Locale } from "../../karachi-i18n";
import type { MapEntityDetails } from "./map-entities";
import styles from "./MapDetailsCard.module.css";

type MapDetailsCardProps = {
  details: MapEntityDetails;
  locale: Locale;
  onClose: () => void;
  inline?: boolean;
};

const ui = {
  "ur-roman": { close: "Map detail band karein", aliases: "Is naam se bhi mil sakta hai", order: "Yeh tarteeb dekhein" },
  en: { close: "Close map details", aliases: "Also known as", order: "Recognition order" },
} as const;

export default function MapDetailsCard({ details, locale, onClose, inline = false }: MapDetailsCardProps) {
  const copy = ui[locale];
  return (
    <aside className={`${styles.card} ${inline ? styles.inline : ""}`} aria-label={`${details.name} — ${details.kindLabel}`} aria-live="polite">
      <div className={styles.top}>
        <span style={{ "--entity-color": details.color ?? "#F06F55" } as React.CSSProperties}>{details.kindLabel}</span>
        <button type="button" onClick={onClose} aria-label={copy.close}><X size={17} /></button>
      </div>
      <h3>{details.name}</h3>
      <p className={styles.summary}>{details.summary}</p>
      {details.facts.length > 0 && (
        <dl className={styles.facts}>
          {details.facts.map((fact) => <div key={`${fact.label}-${fact.value}`}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        </dl>
      )}
      {details.chain && details.chain.length > 0 && (
        <div className={styles.chain} aria-label={copy.order}>
          {details.chain.map((item, index) => <span key={item}>{item}{index < details.chain!.length - 1 && <ChevronRight size={13} aria-hidden="true" />}</span>)}
        </div>
      )}
      {details.aliases && details.aliases.length > 0 && <p className={styles.aliases}><b>{copy.aliases}:</b> {details.aliases.join(" · ")}</p>}
      {details.caution && <p className={styles.caution}><AlertTriangle size={15} aria-hidden="true" />{details.caution}</p>}
    </aside>
  );
}
