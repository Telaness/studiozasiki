import Link from "next/link";
import { ViewTransition } from "react";
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
        <h2 className="font-jp text-xs font-normal tracking-[0.6em] text-bone-dim">
          {label}
        </h2>
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

        {/* Site logo */}
        <h1 className="absolute inset-0 z-[1] flex items-center justify-center px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-trimmed.png"
            alt="Zasiki（ざしき）"
            width={812}
            height={534}
            className="w-full max-w-[16rem] sm:max-w-sm"
          />
        </h1>

        {/* CRT / old-TV overlays */}
        <div className="crt-noise pointer-events-none absolute inset-0 z-[2]" />
        <div className="crt-scanlines pointer-events-none absolute inset-0 z-[3]" />
        <div className="crt-vignette pointer-events-none absolute inset-0 z-[4]" />

        {/* Bottom fade — smooth transition into discography */}
        <div className="ink-gradient pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40" />
      </section>

      <Divider label="プロフィール" />

      {/* ───── PROFILE ───── */}
      <section id="profile" className="relative px-6 py-16 sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:gap-12">
          {/* 端を背景に溶かして境目を消す */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/zasiki_arsha.jpg"
            alt="シンガーソングライター Zasiki（ざしき）のアーティスト写真"
            width={160}
            height={160}
            loading="lazy"
            className="fade-edges h-64 w-64 shrink-0 object-cover sm:h-80 sm:w-80"
          />
          <div className="space-y-6 text-center font-jp text-sm leading-loose tracking-[0.12em] text-bone-dim sm:text-left sm:text-base">
            <p>
              Zasiki（ざしき）は、作詞・作曲・歌唱を自ら手がけるシンガーソングライター・アーティストです。
            </p>
            <p>
              制作では「黄泉にわたらない私の感情を大切にしよう」と考え、現代を日本人の私として生きている世界観や思考を「無」と定義し、制作のテーマとしております。
            </p>
            <p>
              日本人独自の感性、思考の形態を理解し、「無」を楽曲の中に作りこむ制作を行っております。
            </p>
          </div>
        </div>
      </section>

      <Divider label="楽曲" />

      {/* ───── DISCOGRAPHY ───── */}
      <section id="discography" className="relative px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {tracks.map((t) => (
              <Link
                key={t.id}
                href={`/tracks/${t.id}`}
                aria-label={`${t.title}${t.romaji ? ` (${t.romaji})` : ""}`}
                className="group relative aspect-square overflow-hidden border border-bone/10 bg-ink-soft transition hover:border-bone/30"
              >
                {t.image ? (
                  <ViewTransition name={`jacket-${t.id}`} share="jacket">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${t.image.url}?fit=crop&w=800&h=800`}
                      alt={`${t.title}${t.romaji ? ` ${t.romaji}` : ""}`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </ViewTransition>
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
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/tracks"
              className="font-jp text-sm tracking-[0.4em] text-bone-dim transition hover:text-bone"
            >
              楽曲一覧 →
            </Link>
          </div>
        </div>
      </section>

      <Divider label="お問い合わせはこちらまで" />

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
          <a
            href="#top"
            aria-label="Zasiki"
            className="opacity-80 transition hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-trimmed.png"
              alt=""
              width={812}
              height={534}
              loading="lazy"
              className="h-auto w-24"
            />
          </a>

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
