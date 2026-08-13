import type { CSSProperties } from "react";

type BrandMarkProps = {
  className?: string;
  showName?: boolean;
  size?: number;
  style?: CSSProperties;
};

/** Reusable Understand Karachi identity for headers, cards, and credits. */
export default function BrandMark({ className, showName = true, size = 40, style }: BrandMarkProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".7rem",
        minWidth: 0,
        ...style,
      }}
    >
      {/* This tiny local SVG is already the exact rendered size; optimization would only add overhead. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.svg"
        width={size}
        height={size}
        alt={showName ? "" : "Understand Karachi"}
        aria-hidden={showName || undefined}
        style={{ display: "block", width: size, height: size, flex: "0 0 auto" }}
      />
      {showName && (
        <strong
          style={{
            color: "inherit",
            fontSize: ".68rem",
            letterSpacing: ".13em",
            lineHeight: 1.25,
          }}
        >
          UNDERSTAND<br />KARACHI
        </strong>
      )}
    </span>
  );
}
