import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, getTracks } from "@/lib/microcms";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) return {};
  const title = track.romaji ? `${track.title} / ${track.romaji}` : track.title;
  return {
    title,
    openGraph: {
      title,
      images: track.image ? [{ url: track.image.url, alt: track.title }] : undefined,
    },
  };
}

export default async function TrackPage({ params }: Props) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) notFound();

  const links = track.links ?? {};

  return (
    <div className="relative z-0 flex flex-1 flex-col overflow-x-hidden">
      <section className="relative px-6 py-20 sm:px-12 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <Link
              href="/#discography"
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
