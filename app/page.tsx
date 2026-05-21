import { getTracks } from "@/lib/microcms";
import {
  AppleMusicIcon,
  AwaIcon,
  InstagramIcon,
  SpotifyIcon,
  XIcon,
  YouTubeIcon,
} from "./_components/icons";

function Divider({ label }: { label?: string }) {
  return (
    <div className="relative flex items-center gap-6 py-12">
      <span className="h-px flex-1 hairline" />
      {label && (
        <span className="font-jp text-xs tracking-[0.6em] text-bone-dim">
          {label}
        </span>
      )}
      <span className="h-px flex-1 hairline" />
    </div>
  );
}

export default async function Home() {
  const tracks = await getTracks();

  return (
    <div className="relative z-0 flex flex-1 flex-col overflow-x-hidden">
      {/* ───── TOP / HERO ───── */}
      <section
        id="top"
        className="relative isolate flex min-h-screen overflow-hidden"
      >
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="crt-video absolute inset-0 h-full w-full object-cover"
        >
          <source src="/top_background.mp4" type="video/mp4" />
        </video>

        {/* CRT / old-TV overlays */}
        <div className="crt-noise pointer-events-none absolute inset-0 z-[2]" />
        <div className="crt-scanlines pointer-events-none absolute inset-0 z-[3]" />
        <div className="crt-vignette pointer-events-none absolute inset-0 z-[4]" />

        {/* Bottom fade — smooth transition into discography */}
        <div className="ink-gradient pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40" />
      </section>

      <Divider label="楽曲" />

      {/* ───── DISCOGRAPHY ───── */}
      <section id="discography" className="relative px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {tracks.map((t) => (
              <div
                key={t.id}
                className="relative aspect-square overflow-hidden border border-bone/10 bg-ink-soft"
              >
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${t.image.url}?fit=crop&w=800&h=800`}
                    alt={`${t.title}${t.romaji ? ` ${t.romaji}` : ""}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%), #0a0a0a",
                    }}
                  />
                )}

                {!t.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-jp text-5xl tracking-[0.1em] text-bone/80 sm:text-6xl">
                      {t.title}
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider label="ご連絡" />

      {/* ───── CONTACT ───── */}
      <section id="contact" className="relative px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <a
            href="mailto:studiozasiki@gmail.com"
            className="inline-block font-en text-lg italic tracking-[0.3em] text-bone underline decoration-bone/40 underline-offset-8 transition hover:text-ember"
          >
            studiozasiki@gmail.com
          </a>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="relative mt-16 border-t border-bone/10 bg-ink-soft/40 px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
          <div className="flex items-center gap-8 text-bone-dim">
            <a
              href="https://open.spotify.com/intl-ja/artist/2S4BSVsysMfWuE1NQPdkzH"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="transition hover:text-bone"
            >
              <SpotifyIcon className="h-5 w-5" />
            </a>
            <a
              href="https://music.apple.com/jp/artist/zasiki/1842171650"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Music"
              className="transition hover:text-bone"
            >
              <AppleMusicIcon className="h-5 w-5" />
            </a>
            <a
              href="https://s.awa.fm/album/950b7380932fe8540379"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AWA"
              className="transition hover:text-bone"
            >
              <AwaIcon className="h-5 w-5" />
            </a>
          </div>

          <span className="h-px w-12 hairline" />

          <div className="flex items-center gap-8 text-bone-dim">
            <a
              href="https://x.com/studio_zasiki"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="transition hover:text-bone"
            >
              <XIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/studio_zasiki/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:text-bone"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@studio_zasiki"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition hover:text-bone"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>
          </div>

          <div className="font-en text-[0.6rem] uppercase tracking-[0.4em] text-mist">
            © Studio Zasiki
          </div>
        </div>
      </footer>
    </div>
  );
}
