# 月瀬庵 バックエンド実装仕様（残タスク整理）

最終更新: 2026-02-22
対象リポジトリ: `k1nyA/tsukise-an`

## 1. 目的
- 現在のトップページ中心実装に対して、仕様書で定義されたバックエンド連携（Cal.com / Web3Forms / microCMS）を実装する。
- 子Issue単位でTDD（Red -> Green -> Refactor）を回し、並列開発可能な単位へ分解する。

## 2. スコープ
- 対象:
  - `Cal.com` 予約導線（`/reservation`）
  - `Web3Forms` お問い合わせ（`/contact`）
  - `microCMS` お知らせ/FAQ（`/news`, `/news/[slug]`, `/faq`）
  - トップページお知らせの動的化（`InfoSection`）
  - 環境変数・依存・運用ドキュメント
- 非対象:
  - 決済/PMS本連携
  - 会員認証/管理画面
  - OTA同期

## 3. 現状ギャップ
- ルーティングがトップページのみ（`src/app/page.tsx`）。
- API Route 未実装（`src/app/**/route.ts` が存在しない）。
- お知らせが静的配列（`src/components/InfoSection.tsx`）。
- 予約/お問い合わせはUIのみで外部連携なし（`src/components/CTASection.tsx`, `src/components/Header.tsx`）。
- 依存不足（`microcms-js-sdk`, `@calcom/embed-react` 未導入）。
- `next.config.ts` に外部画像ドメイン設定なし。

## 4. 要求仕様（バックエンド）

### 4.1 環境変数
- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
- `NEXT_PUBLIC_CALCOM_USERNAME`
- `NEXT_PUBLIC_CALCOM_EVENT_SLUG`

### 4.2 microCMS
- 実装ファイル:
  - `src/lib/microcms.ts`
- 実装関数:
  - `getNewsList({ page, category, limit })`
  - `getNewsDetail(slug)`
  - `getRelatedNews(category, excludeId)`
  - `getFaqList()`
- データモデル:
  - `news`: `title`, `slug`, `category`, `eyecatch`, `description`, `body`
  - `faq`: `question`, `answer`, `category`, `order`

### 4.3 Web3Forms
- 実装ファイル:
  - `src/lib/web3forms.ts`
  - `src/components/ContactForm.tsx`
- 要件:
  - `POST https://api.web3forms.com/submit`
  - 送信中/成功/失敗のUI状態管理
  - 必須項目のバリデーション

### 4.4 Cal.com
- 実装ファイル:
  - `src/components/ReservationCalendar.tsx`
  - `src/app/reservation/page.tsx`
- 要件:
  - `@calcom/embed-react` による埋め込み
  - ブランドカラー `#8B6914`
  - 環境変数から `calLink` を組み立て

## 5. ページ単位の実装要件
- `/reservation`: Cal.com埋め込み + 電話導線
- `/contact`: Web3Forms送信フォーム
- `/news`: カテゴリフィルタ + ページネーション
- `/news/[slug]`: 記事詳細 + 関連記事
- `/faq`: FAQカテゴリ表示

## 6. 非機能要件
- 失敗時フォールバック:
  - 外部API失敗時にユーザー向けメッセージを表示
  - ログで原因追跡可能にする
- テスト:
  - 主要処理に単体テスト
  - 主要導線にE2Eテスト
- 運用:
  - `.env.example` / セットアップ手順整備
  - 障害時Runbook整備

## 7. 並列開発の前提（依存関係）
- クリティカルパス:
  - 設定基盤（依存追加・環境変数・設定ローダー）
- 並列可能トラック（設定基盤完了後）:
  - Track A: Cal.com (`/reservation`)
  - Track B: Web3Forms (`/contact`)
  - Track C: microCMS (`/news`, `/news/[slug]`, `/faq`, `InfoSection`)
- 後追い:
  - E2E/Runbook（各トラック実装後）

## 8. Issue運用ルール
- 親Issue 1件 + 子Issueをマイクロタスク分割。
- 全Issueに以下ラベルを付与:
  - `area:backend`
  - `type:*`（`type:epic` or `type:task`）
  - `parallel:*`（`parallel:critical-path` / `parallel:ready` / `parallel:blocked`）
  - `stack:*`（`stack:infra` / `stack:calcom` / `stack:web3forms` / `stack:microcms` / `stack:test`）
  - `method:tdd`
- 各子Issue本文に `Red / Green / Refactor` を明記。

### 8.1 Issueマッピング（2026-02-22時点）
- 親Issue:
  - #10 親Issue: バックエンド実装エピック（Cal.com / Web3Forms / microCMS）
- 子Issue:
  - #11 [BE-01] 設定基盤（依存追加・環境変数検証・Next設定）
  - #12 [BE-02] `/reservation` + Cal.com埋め込み実装
  - #13 [BE-03] `/contact` + Web3Forms送信実装
  - #14 [BE-04] microCMSクライアント実装（news/faq取得関数）
  - #15 [BE-05] `/news` 一覧（カテゴリ/ページネーション）実装
  - #16 [BE-06] `/news/[slug]` 詳細 + 関連記事実装
  - #17 [BE-07] `/faq` 実装（microCMSカテゴリ表示）
  - #18 [BE-08] トップ `InfoSection` をmicroCMS連携に変更
  - #19 [BE-09] バックエンド連携E2E（予約/問い合わせ/お知らせ）
  - #20 [BE-10] 運用手順書・Runbook整備（バックエンド連携）

### 8.2 並列実行ガイド
- まず着手:
  - #11（`parallel:critical-path`）
- #11 完了後に並列着手:
  - Track A: #12
  - Track B: #13
  - Track C: #14
- #14 完了後に並列着手:
  - #15, #16, #17, #18
- 最後に集約:
  - #19（E2E）
  - #20（Runbook。並行可だが最終で更新）

## 9. 受け入れ条件
- バックエンド連携ページが仕様どおりに動作する。
- 環境変数未設定時に明確なエラーを返す。
- 主要E2Eがグリーン。
- 運用手順書で初期導入と障害時対応が可能。
