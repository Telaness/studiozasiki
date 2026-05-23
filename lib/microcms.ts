export type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
};

export type TrackLinks = {
  spotify?: string;
  appleMusic?: string;
  awa?: string;
  youtube?: string;
};

export type Track = {
  id: string;
  title: string;
  romaji?: string;
  href?: string;
  image?: MicroCmsImage;
  releasedAt?: string;
  credits?: string;
  links?: TrackLinks;
};

const ARTIST_LINKS: TrackLinks = {
  spotify: "https://open.spotify.com/intl-ja/artist/2S4BSVsysMfWuE1NQPdkzH",
  appleMusic: "https://music.apple.com/jp/artist/zasiki/1842171650",
  awa: "https://s.awa.fm/album/950b7380932fe8540379",
  youtube: "https://www.youtube.com/@studio_zasiki",
};

const FALLBACK: Track[] = [
  {
    id: "watashi",
    title: "私",
    romaji: "watashi",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/01_watashi/jacket.jpg", width: 1200, height: 1200 },
    credits: "Words & Music: Zasiki",
    links: ARTIST_LINKS,
  },
  {
    id: "akari",
    title: "灯",
    romaji: "akari",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/02_akari/jacket.png", width: 1200, height: 1200 },
    credits: "Words & Music: Zasiki",
    links: ARTIST_LINKS,
  },
  {
    id: "haru",
    title: "春",
    romaji: "haru",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/03_haru/jacket.png", width: 1200, height: 1200 },
    credits: "Words & Music: Zasiki",
    links: ARTIST_LINKS,
  },
];

type ListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type RawMicroCmsTrack = {
  id: string;
  // identifiers / display
  title?: string;
  name?: string;
  romaji?: string;
  reading?: string;
  // link out to detail (rarely used now we have /tracks/[id])
  href?: string;
  url?: string;
  // jacket / cover
  image?: MicroCmsImage;
  jacket?: MicroCmsImage;
  cover?: MicroCmsImage;
  coverImage?: MicroCmsImage;
  // metadata
  releasedAt?: string;
  releaseDate?: string;
  publishedAt?: string;
  credits?: string;
  credit?: string;
  // streaming — supports nested object OR flat fields
  links?: TrackLinks;
  spotify?: string;
  spotifyUrl?: string;
  appleMusic?: string;
  appleMusicUrl?: string;
  apple?: string;
  awa?: string;
  awaUrl?: string;
  youtube?: string;
  youtubeUrl?: string;
  youTube?: string;
};

function pickImage(raw: RawMicroCmsTrack): MicroCmsImage | undefined {
  return raw.image ?? raw.jacket ?? raw.cover ?? raw.coverImage;
}

function pickLinks(raw: RawMicroCmsTrack): TrackLinks | undefined {
  const links: TrackLinks = {
    spotify: raw.links?.spotify ?? raw.spotify ?? raw.spotifyUrl,
    appleMusic:
      raw.links?.appleMusic ?? raw.appleMusic ?? raw.appleMusicUrl ?? raw.apple,
    awa: raw.links?.awa ?? raw.awa ?? raw.awaUrl,
    youtube:
      raw.links?.youtube ?? raw.youtube ?? raw.youtubeUrl ?? raw.youTube,
  };
  const hasAny = Object.values(links).some((v) => typeof v === "string" && v.length > 0);
  return hasAny ? links : undefined;
}

function normalize(raw: RawMicroCmsTrack): Track {
  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? raw.id,
    romaji: raw.romaji ?? raw.reading,
    href: raw.href ?? raw.url,
    image: pickImage(raw),
    releasedAt: raw.releasedAt ?? raw.releaseDate ?? raw.publishedAt,
    credits: raw.credits ?? raw.credit,
    links: pickLinks(raw),
  };
}

export async function getTracks(): Promise<Track[]> {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;

  if (!domain || !key) {
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://${domain}.microcms.io/api/v1/tracks?orders=-releasedAt&limit=100`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      console.warn(`[microCMS] tracks fetch failed: ${res.status}`);
      return FALLBACK;
    }

    const data = (await res.json()) as ListResponse<RawMicroCmsTrack>;
    if (data.contents.length === 0) return FALLBACK;
    return data.contents.map(normalize);
  } catch (err) {
    console.warn("[microCMS] tracks fetch error:", err);
    return FALLBACK;
  }
}

export async function getTrack(id: string): Promise<Track | null> {
  const tracks = await getTracks();
  return tracks.find((t) => t.id === id) ?? null;
}
