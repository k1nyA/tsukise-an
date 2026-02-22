# Engineering Automation Setup

最終更新: 2026-02-22

## 1. 導入済み項目
- Lint:
  - `npm run lint`
  - `npm run lint:fix`
- Typecheck:
  - `npm run typecheck`
- Verify:
  - `npm run verify`（lint + typecheck + build）
- Husky:
  - `.husky/pre-commit` -> `lint-staged`
  - `.husky/pre-push` -> `typecheck`, `lint`
- Link Check:
  - `npm run check:links`
- GitHub Actions:
  - `.github/workflows/ci.yml`
  - `.github/workflows/cd-vercel.yml`
  - `.github/workflows/claude-review.yml`

## 2. GitHub Secrets（設定が必要）

### 2.1 Claude Review
- `CLAUDE_CODE_OAUTH_TOKEN`
- 方針: API keyは使わず、Auth/OAuthベースで運用する

### 2.2 Vercel CD
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 2.3 認証方式ポリシー（本プロジェクト）
- OpenAI / Claude / Google 連携は Auth/OAuth 優先
- 直接API keyは原則使わない（必要時のみ例外申請）
- 本方針の詳細は Issue `#33` で追跡

## 3. Branch Protection 推奨
- 対象ブランチ: `main`
- 必須チェック:
  - `CI / Lint Typecheck Build`
  - `CI / Internal Link Check`
- 推奨:
  - Require pull request reviews
  - Dismiss stale approvals when new commits are pushed

## 4. @claude レビュー運用
- PR or Issueコメントで `@claude` をメンション
- `claude-review.yml` が起動してレビュー補助を実行
- 初回は小さいPRで動作確認する
- 実行者制限:
  - `OWNER` / `MEMBER` / `COLLABORATOR` のみ実行

### 4.1 初期セットアップ手順
1. Repository Secrets に `CLAUDE_CODE_OAUTH_TOKEN` を追加
2. テスト用PRを作成
3. PRコメントで `@claude` と記載して投稿
4. `Claude Review` workflow が走ることを確認

## 5. 補足（なぜ必要か）
- API仕様書: 実装差分と外部連携仕様のズレ防止
- テスト仕様書: 受け入れ基準をコードレビュー時に共通化
- スキーマ定義: 入力/外部レスポンスの不整合検知
- コンパイルチェック: 型崩れをPRで即検知
- テストライブラリ: 回帰防止を自動化
