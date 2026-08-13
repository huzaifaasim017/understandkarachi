import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { photoManifest } from "./karachi-data";
import type { Locale, PhotoStoryId, SiteCopy } from "./karachi-i18n";

const mediaCopy = {
  "ur-roman": {
    source: "Wikimedia Commons",
    creator: "Tasveer",
    captured: "Tasveer ka saal",
    resized: "Asal tasveer se resize ki gayi",
  },
  en: {
    source: "Wikimedia Commons",
    creator: "Photo",
    captured: "Photo year",
    resized: "Resized from the original",
  },
} as const;

export default function PhotoCard({
  photoId,
  copy,
  locale,
}: {
  readonly photoId: PhotoStoryId;
  readonly copy: SiteCopy;
  readonly locale: Locale;
}) {
  const photo = photoManifest.find((item) => item.id === photoId);
  if (!photo) return null;
  const content = copy.photos[photoId];
  const labels = mediaCopy[locale];
  const externalHint = copy.common.externalLinkHint;

  return (
    <figure className="photo-pause">
      <Image
        src={photo.src}
        alt={content.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 760px) 100vw, 42vw"
      />
      <figcaption>
        <p>{content.title}</p>
        <div className="photo-credit">
          <span>{labels.captured}: {photo.capturedOn.slice(0, 4)}</span>
          <a
            href={photo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.common.photoCreditAria}: ${labels.source}. ${externalHint}`}
          >
            {labels.source}<ExternalLink size={13} aria-hidden="true" />
          </a>
          <a
            href={photo.creatorUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels.creator}: ${photo.creator}. ${externalHint}`}
          >
            {photo.creator}<ExternalLink size={13} aria-hidden="true" />
          </a>
          <a
            href={photo.licenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${photo.licence}. ${externalHint}`}
          >
            {photo.licence}<ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <small>{labels.resized}</small>
      </figcaption>
    </figure>
  );
}
