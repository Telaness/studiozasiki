"use client";

import Link from "next/link";
import { useState, ViewTransition } from "react";
import type { TrackKind } from "@/lib/microcms";

export type BookEntry = {
  id: string;
  title: string;
  romaji?: string;
  imageUrl?: string;
  date: string | null;
  kind: TrackKind;
};

const TABS: { kind: TrackKind; label: string }[] = [
  { kind: "single", label: "シングル/EP" },
  { kind: "album", label: "アルバム" },
  { kind: "collab", label: "コラボ" },
];

// 3 / 4 / 6 列のどれでも行が揃うよう 12 の倍数で枠を用意し、常に空き枠を残す。
const MIN_SLOTS = 24;

function slotCount(filled: number) {
  return Math.max(MIN_SLOTS, Math.ceil((filled + 1) / 12) * 12);
}

// 貼り付けた写真のように少しずつ傾ける
const TILTS = ["-rotate-1", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-1", "rotate-[0.3deg]", "-rotate-[0.8deg]"];
const NOTE_TILTS = ["-rotate-2", "rotate-1", "-rotate-1"];

export function TrackBook({ entries }: { entries: BookEntry[] }) {
  const [active, setActive] = useState<TrackKind>("single");
  const shown = entries.filter((e) => e.kind === active);
  const slots = Array.from({ length: slotCount(shown.length) }, (_, i) => shown[i]);

  return (
    <div className="relative pt-14">
      {/* 付箋タブ — ページの裏に貼られ、上端からはみ出している */}
      <div role="tablist" aria-label="楽曲の種類" className="absolute right-3 top-0 z-0 flex items-end gap-2 sm:right-12 sm:gap-3">
        {TABS.map((tab, i) => {
          const selected = tab.kind === active;
          return (
            <button
              key={tab.kind}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="track-book"
              onClick={() => setActive(tab.kind)}
              className={`sticky-note relative flex min-w-20 whitespace-nowrap px-3 origin-bottom justify-center pt-3 font-jp text-xs tracking-[0.15em] transition-all duration-300 sm:min-w-24 sm:text-sm sm:tracking-[0.3em] sm:px-4 ${NOTE_TILTS[i % NOTE_TILTS.length]} ${
                selected
                  ? "h-20 pt-4 bg-bone text-ink"
                  : "h-16 bg-bone-dim/80 text-ink/80 hover:h-[4.5rem] hover:bg-bone-dim"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="track-book"
        role="tabpanel"
        className="notebook relative z-10 border border-bone/10 py-10 pl-12 pr-5 sm:py-14 sm:pl-24 sm:pr-12"
      >
        <div aria-hidden className="notebook-holes absolute inset-y-6 left-3 w-4 sm:left-6 sm:w-5" />
        <div aria-hidden className="absolute inset-y-0 left-9 w-px bg-bone/15 sm:left-16" />

        <div className="mb-10 border-b border-bone/15 pb-4">
          <h1 className="font-jp text-2xl tracking-[0.4em] text-bone sm:text-3xl">楽曲</h1>
        </div>

        <ol className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6">
          {slots.map((t, i) => {
            const no = `No.${String(i + 1).padStart(3, "0")}`;
            return (
              <li key={`${active}-${no}`}>
                {t ? (
                  <Link
                    href={`/tracks/${t.id}`}
                    transitionTypes={["jacket-morph"]}
                    aria-label={`${no} ${t.title}${t.romaji ? ` (${t.romaji})` : ""}`}
                    className="group block"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden border border-bone/20 bg-ink-soft shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition duration-300 group-hover:rotate-0 group-hover:-translate-y-1 group-hover:border-bone/50 ${TILTS[i % TILTS.length]}`}
                    >
                      {t.imageUrl ? (
                        <ViewTransition name={`jacket-${t.id}`} share={{ "jacket-morph": "jacket", default: "none" }} default="none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${t.imageUrl}?fit=crop&w=800&h=800`}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                        </ViewTransition>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-jp text-3xl text-bone/80">{t.title}</span>
                        </div>
                      )}
                    </div>
                    <SlotCaption no={no} title={t.title} date={t.date} />
                  </Link>
                ) : (
                  <div aria-label={`${no} 未発表`}>
                    <div className="flex aspect-square items-center justify-center border border-dashed border-bone/20">
                      <span className="font-en text-3xl text-mist sm:text-4xl">?</span>
                    </div>
                    <SlotCaption no={no} title="？？？" muted />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function SlotCaption({
  no,
  title,
  date,
  muted,
}: {
  no: string;
  title: string;
  date?: string | null;
  muted?: boolean;
}) {
  return (
    <div className="mt-3 space-y-1">
      <p className="font-en text-[0.65rem] tracking-[0.2em] text-mist">{no}</p>
      <p className={`truncate font-jp text-sm tracking-[0.15em] ${muted ? "text-mist" : "text-bone"}`}>
        {title}
      </p>
      {date && <p className="font-en text-[0.65rem] tracking-[0.15em] text-bone-dim">{date}</p>}
    </div>
  );
}
