export type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
};

export type Track = {
  id: string;
  title: string;
  romaji?: string;
  href?: string;
  image?: MicroCmsImage;
  releasedAt?: string;
};

const FALLBACK: Track[] = [
  {
    id: "fallback-1",
    title: "私",
    romaji: "watashi",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/01_watashi/jacket.jpg", width: 1200, height: 1200 },
  },
  {
    id: "fallback-2",
    title: "灯り",
    romaji: "akari",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/02_akari/jacket.png", width: 1200, height: 1200 },
  },
  {
    id: "fallback-3",
    title: "春",
    romaji: "haru",
    href: "https://www.youtube.com/@studio_zasiki",
    image: { url: "/music/03_haru/jacket.png", width: 1200, height: 1200 },
  },
];

type ListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

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

    const data = (await res.json()) as ListResponse<Track>;
    return data.contents.length > 0 ? data.contents : FALLBACK;
  } catch (err) {
    console.warn("[microCMS] tracks fetch error:", err);
    return FALLBACK;
  }
}
