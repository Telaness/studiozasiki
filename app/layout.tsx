import type { Metadata, Viewport } from "next";
import { Shippori_Mincho_B1, Cormorant_Garamond, Cinzel } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";
import "./globals.css";

const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const SITE_TITLE = "Zasiki Official Website";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Zasiki Official Website",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "music",
  keywords: [
    "Zasiki",
    "座敷",
    "ザシキ",
    "ざしき",
    "Studio Zasiki",
    "スタジオ座敷",
    "シンガー",
    "シンガーソングライター",
    "歌手",
    "J-POP",
    "邦楽",
    "インディーズ",
    "音楽",
    "楽曲",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "ja_JP",
    images: [
      {
        url: "/zasiki_arsha.jpg",
        alt: "Zasiki — 座敷",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/zasiki_arsha.jpg"],
    site: "@studio_zasiki",
    creator: "@studio_zasiki",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Zasiki",
  alternateName: ["座敷", "Studio Zasiki"],
  url: SITE_URL,
  image: `${SITE_URL}/zasiki_arsha.jpg`,
  email: "studiozasiki@gmail.com",
  genre: ["J-Pop", "Indie"],
  sameAs: SOCIAL_LINKS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${shippori.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone selection:bg-bone selection:text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
