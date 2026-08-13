import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "Understand Karachi — Shehar ko zero se samjhein",
    description: "Roman Urdu-first interactive guide for crossing Karachi through entry gates, major roads, junctions, landmarks, districts, and last-mile checks.",
    applicationName: "Understand Karachi",
    manifest: "/site.webmanifest",
    keywords: ["Karachi map", "Karachi districts", "Karachi roads", "Karachi guide", "Sindh", "Pakistan"],
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      shortcut: "/favicon.svg",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: "Understand Karachi",
      description: "Karachi ke gates, routes aur junctions ko ek clear mental map mein samjhein.",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Understand Karachi — Sea below. City decoded." }],
    },
    twitter: { card: "summary_large_image", title: "Understand Karachi", description: "Karachi ke gates, routes aur junctions ko ek clear mental map mein samjhein.", images: [socialImage] },
  };
}

export const viewport: Viewport = { themeColor: "#071c24", colorScheme: "light dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ur-Latn-PK"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
