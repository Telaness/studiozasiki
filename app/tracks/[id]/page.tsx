import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, getTracks, type Track } from "@/lib/microcms";
import { ARTIST_JSON_LD, OPEN_GRAPH_BASE, SITE_URL } from "@/lib/site";
import {
  AppleMusicIcon,
  AwaIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../../_components/icons";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const tracks = await getTracks();
  return tracks.map((t) => ({ id: t.id }));
}

function releaseDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function describe(track: Track) {
  const name = track.romaji ? `「${track.title}」（${track.romaji}）` : `「${track.title}」`;
  const date = releaseDate(track.releasedAt);
  return `シンガーソングライター Zasiki（ざしき）の楽曲${name}。${date ? `${date}リリース。` : ""}Spotify、Apple Music などで配信中。`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) return {};
  const title = track.romaji ? `${track.title} / ${track.romaji}` : track.title;
  const description = describe(track);
  return {
    title,
    description,
    alternates: { canonical: `/tracks/${track.id}` },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: "music.song",
      title: `${title} | Zasiki（ざしき）`,
      description,
      url: `/tracks/${track.id}`,
      images: track.image ? [{ url: track.image.url, alt: track.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Zasiki（ざしき）`,
      description,
      images: track.image ? [track.image.url] : undefined,
    },
  };
}

export default async function TrackPage({ params }: Props) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) notFound();

  const links = track.links ?? {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    alternateName: track.romaji,
    url: `${SITE_URL}/tracks/${track.id}`,
    description: describe(track),
    image: track.image?.url,
    datePublished: track.releasedAt,
    byArtist: { "@id": ARTIST_JSON_LD["@id"], name: ARTIST_JSON_LD.name },
    sameAs: Object.values(links).filter(Boolean),
  };

  return (
    <div className="relative z-0 flex flex-1 flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative px-6 py-20 sm:px-12 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <Link
              href="/tracks"
              className="font-en text-xs tracking-[0.4em] text-bone-dim transition hover:text-bone"
            >
              ← BACK
            </Link>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden border border-bone/10 bg-ink-soft sm:max-w-sm">
            {track.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${track.image.url}?fit=crop&w=800&h=800`}
                alt={`${track.title}${track.romaji ? ` ${track.romaji}` : ""}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-jp text-6xl tracking-[0.1em] text-bone/80">
                  {track.title}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/5" />
          </div>

          <div className="mt-12 text-center">
            <h1 className="font-jp text-4xl tracking-[0.2em] text-bone sm:text-5xl">
              {track.title}
            </h1>
            {track.romaji && (
              <p className="mt-4 font-en text-sm italic tracking-[0.4em] text-bone-dim">
                {track.romaji}
              </p>
            )}
          </div>

          {track.credits && (
            <>
              <div className="relative flex items-center gap-6 py-12">
                <span className="h-px flex-1 hairline" />
                <span className="font-jp text-xs tracking-[0.6em] text-bone-dim">
                  CREDITS
                </span>
                <span className="h-px flex-1 hairline" />
              </div>
              <div className="text-center">
                <p className="whitespace-pre-line font-jp text-sm leading-loose tracking-[0.15em] text-bone-dim">
                  {track.credits}
                </p>
              </div>
            </>
          )}

          {(links.spotify || links.appleMusic || links.awa || links.youtube) && (
            <>
              <div className="relative flex items-center gap-6 py-12">
                <span className="h-px flex-1 hairline" />
                <span className="font-jp text-xs tracking-[0.6em] text-bone-dim">
                  LISTEN
                </span>
                <span className="h-px flex-1 hairline" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 text-bone-dim">
                {links.spotify && (
                  <a
                    href={links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Spotify"
                    className="transition hover:text-bone"
                  >
                    <SpotifyIcon className="h-6 w-6" />
                  </a>
                )}
                {links.appleMusic && (
                  <a
                    href={links.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Apple Music"
                    className="transition hover:text-bone"
                  >
                    <AppleMusicIcon className="h-6 w-6" />
                  </a>
                )}
                {links.awa && (
                  <a
                    href={links.awa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="AWA"
                    className="transition hover:text-bone"
                  >
                    <AwaIcon className="h-6 w-6" />
                  </a>
                )}
                {links.youtube && (
                  <a
                    href={links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="transition hover:text-bone"
                  >
                    <YouTubeIcon className="h-6 w-6" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
