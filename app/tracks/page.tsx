import type { Metadata } from "next";
import Link from "next/link";
import { getTracks, type Track } from "@/lib/microcms";
import { OPEN_GRAPH_BASE } from "@/lib/site";
import { TrackBook, type BookEntry } from "./_components/track-book";

const TITLE = "楽曲一覧";
const DESCRIPTION =
  "Zasiki（ざしき）の楽曲一覧。シングル・EP、アルバム、コラボ作品をまとめています。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tracks" },
  openGraph: {
    ...OPEN_GRAPH_BASE,
    title: `${TITLE} | Zasiki（ざしき）`,
    description: DESCRIPTION,
    url: "/tracks",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Zasiki（ざしき）`,
    description: DESCRIPTION,
  },
};

function byRelease(a: Track, b: Track) {
  if (!a.releasedAt) return 1;
  if (!b.releasedAt) return -1;
  return a.releasedAt.localeCompare(b.releasedAt);
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso)
    .toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", ".");
}

export default async function TracksPage() {
  const tracks = [...(await getTracks())].sort(byRelease);
  const entries: BookEntry[] = tracks.map((t) => ({
    id: t.id,
    title: t.title,
    romaji: t.romaji,
    imageUrl: t.image?.url,
    date: formatDate(t.releasedAt),
    kind: t.kind,
  }));

  return (
    <div className="relative z-0 flex flex-1 flex-col overflow-x-hidden">
      <section className="relative px-4 py-16 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Link
              href="/"
              className="font-en text-xs tracking-[0.4em] text-bone-dim transition hover:text-bone"
            >
              ← TOP
            </Link>
          </div>

          <TrackBook entries={entries} />
        </div>
      </section>
    </div>
  );
}
