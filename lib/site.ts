export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zasiki.net";

export const SITE_NAME = "Zasiki";

export const SITE_DESCRIPTION =
  "Zasiki（ざしき／ザシキ）のオフィシャルサイト。作詞・作曲・歌唱を自ら手がけるシンガーソングライター・アーティスト Zasiki の楽曲、プロフィール、お問い合わせ先を掲載しています。";

export const SOCIAL_LINKS = [
  "https://open.spotify.com/intl-ja/artist/2S4BSVsysMfWuE1NQPdkzH",
  "https://music.apple.com/jp/artist/zasiki/1842171650",
  "https://s.awa.fm/album/950b7380932fe8540379",
  "https://x.com/studio_zasiki",
  "https://www.instagram.com/studio_zasiki/",
  "https://www.youtube.com/@studio_zasiki",
];

// 構造化データ上のアーティスト本体。サイト全体と各楽曲ページから @id で参照する。
export const ARTIST_JSON_LD = {
  "@type": "MusicGroup",
  "@id": `${SITE_URL}/#artist`,
  name: "Zasiki",
  alternateName: ["ざしき", "ザシキ", "Studio Zasiki"],
  description:
    "作詞・作曲・歌唱を自ら手がけるシンガーソングライター・アーティスト。",
  url: SITE_URL,
  image: `${SITE_URL}/zasiki_arsha.jpg`,
  logo: `${SITE_URL}/logo-trimmed.png`,
  email: "studiozasiki@gmail.com",
  genre: ["J-Pop", "Indie"],
  sameAs: SOCIAL_LINKS,
};

// 子ページで openGraph を上書きすると親の値は引き継がれないため、共通部分をここに置く。
export const OPEN_GRAPH_BASE = {
  type: "website",
  siteName: SITE_NAME,
  locale: "ja_JP",
} as const;
