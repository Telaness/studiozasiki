# Studio Zasiki — Zasiki Official Web

シンガーソングライター **Zasiki(座敷)** の公式サイトです。Next.js 16 (App Router) + React 19 + Tailwind CSS v4 で構築しています。

楽曲データは [microCMS](https://microcms.io) から取得し、未設定時はリポジトリ同梱のフォールバックを表示します。

## 必要環境

- Node.js 20 以上
- npm(または pnpm / yarn / bun)

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くとローカルプレビューが起動します。

## 環境変数

`.env.local` をプロジェクトルートに作成し、必要な値を設定してください。

| 変数 | 用途 | 必須 |
| --- | --- | :-: |
| `NEXT_PUBLIC_SITE_URL` | 本番サイトの URL。OG / canonical / sitemap / robots に反映 | 任意(既定 `https://studio-zasiki.com`) |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン(`xxxx.microcms.io` の `xxxx` 部分) | 任意 |
| `MICROCMS_API_KEY` | microCMS の API キー | 任意 |

`MICROCMS_*` を設定しない場合は `lib/microcms.ts` のフォールバック楽曲(私 / 灯り / 春)が表示されます。

## microCMS スキーマ

API 名: `tracks`(リスト形式)

| フィールド ID | 種別 | 説明 |
| --- | --- | --- |
| `title` | テキスト | 曲名(日本語) |
| `romaji` | テキスト(任意) | ローマ字表記 |
| `href` | テキスト(任意) | 配信リンクなど |
| `image` | 画像(任意) | ジャケット |
| `releasedAt` | 日時(任意) | リリース日(並び順に使用) |

`orders=-releasedAt&limit=100` で取得しています。

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint 実行 |

## ディレクトリ構成

```
app/
  _components/icons.tsx   配信サービス / SNS の SVG アイコン
  globals.css             Tailwind v4 のテーマ・CRT エフェクト・各種アニメーション
  layout.tsx              ルートレイアウト / メタデータ / JSON-LD
  page.tsx                トップページ(ヒーロー・楽曲・連絡先)
  robots.ts               /robots.txt を生成
  sitemap.ts              /sitemap.xml を生成
lib/
  microcms.ts             楽曲データの取得とフォールバック
  site.ts                 SITE_URL / SITE_NAME などの共有定数
public/
  music/                  ローカルフォールバック用ジャケット
  top_background.mp4      ヒーローの背景動画
  zasiki_arsha.jpg        OG / アーティスト画像
```

## SEO

- `app/layout.tsx` で `metadata` / `viewport` / Open Graph / Twitter Card / robots / icons / keywords を一括設定
- `MusicGroup` の JSON-LD を `<body>` に出力
- `app/robots.ts` と `app/sitemap.ts` で `/robots.txt` と `/sitemap.xml` を生成

ドメインが変わる場合は `NEXT_PUBLIC_SITE_URL` を設定すれば canonical / OG / sitemap / robots すべてに反映されます。

## デプロイ

[Vercel](https://vercel.com/new) へのデプロイを想定しています。`NEXT_PUBLIC_SITE_URL` と microCMS の環境変数をプロジェクト設定に登録してください。

## ライセンス

© Studio Zasiki. All rights reserved.
