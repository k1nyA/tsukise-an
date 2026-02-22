# バックエンド連携 Runbook（Cal.com / Web3Forms / microCMS）

## 1. 目的
- 新規メンバーがこのドキュメントだけで環境構築・動作確認・障害対応を実施できる状態を作る。
- 対象連携: `microCMS` / `Web3Forms` / `Cal.com`

## 2. 前提
- Node.js: `>=20`
- npm: `>=10`
- GitHub CLI: `gh`（任意、Issue/PR運用時）

## 3. セットアップ手順
### 3.1 リポジトリ準備
1. リポジトリを clone
2. 依存インストール

```bash
npm install
```

### 3.2 環境変数
`.env.example` を元に `.env.local` を作成し、以下を設定する。

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=your-microcms-service-domain
MICROCMS_API_KEY=your-microcms-api-key

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Cal.com
NEXT_PUBLIC_CALCOM_USERNAME=your-calcom-username
NEXT_PUBLIC_CALCOM_EVENT_SLUG=your-calcom-event-slug
```

### 3.3 起動と基本確認
```bash
npm run dev
```

確認URL:
- `/`（トップの「お知らせ」セクション）
- `/news`
- `/news/[slug]`
- `/faq`
- `/reservation`
- `/contact`

## 4. 受け入れ確認（Smoke Test）
### 4.0 自動スモーク（CI同等）
Next.js 本番サーバーを起動した状態で、主要導線の疎通をまとめて確認する。

```bash
npm run start -- --port 3000
# 別ターミナル
npm run test:backend:smoke
```

環境変数:
- `BACKEND_E2E_BASE_URL`（デフォルト: `http://127.0.0.1:3000`）
- `BACKEND_E2E_TIMEOUT_MS`（デフォルト: `12000`）

### 4.1 microCMS
- `/` で最新5件のお知らせが表示される
- `/news` で一覧取得できる
- `/news/[slug]` で詳細・関連記事が表示される
- `/faq` でカテゴリ別FAQが表示される

### 4.2 Cal.com
- `/reservation` でカレンダー埋め込みが表示される
- 環境変数未設定時は「準備中」メッセージにフォールバックする

### 4.3 Web3Forms
- `/contact` でフォームが表示される
- 必須項目チェックが効く
- 正常送信時に成功メッセージが表示される
- 環境変数未設定時は送信不可でガイド表示になる

## 5. CI/品質確認コマンド
ローカルで以下を通してからPRを作成する。

```bash
npm run lint
npm run typecheck
npm run build
```

必要に応じて:
```bash
node --test --import tsx src/lib/*.test.ts
npx vitest run
```

本番サーバー起動中に:
```bash
npm run test:backend:smoke
```

## 6. 障害時初動（共通）
1. 影響範囲を切り分ける（ページ/機能/環境）
2. GitHub Actions の最新 `CI` を確認
3. ブラウザの Network/Console で失敗箇所を特定
4. 環境変数設定漏れの有無を確認
5. 暫定回避（フォールバック表示）を優先し、ユーザー影響を最小化

## 7. 連携別トラブルシュート
### 7.1 microCMS
症状:
- `/news` `/faq` が空、または取得失敗
- ビルドログに `Missing required environment variables` / APIエラー

確認ポイント:
- `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` が正しいか
- microCMS 側で `news` / `faq` の公開状態・スキーマ変更有無
- APIキー権限（読み取り可）

復旧手順:
1. `.env.local` 修正
2. microCMS 側公開設定を修正
3. `npm run build` で再検証

### 7.2 Web3Forms
症状:
- フォーム送信が失敗する
- 常にエラーメッセージになる

確認ポイント:
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` が正しいか
- Web3Forms ダッシュボードで key の状態を確認
- 送信payload（name/email/message）が必須条件を満たすか

復旧手順:
1. Access Key 更新
2. フォーム入力バリデーションを確認
3. 送信再試行

### 7.3 Cal.com
症状:
- カレンダーが表示されない
- 初期化エラーが表示される

確認ポイント:
- `NEXT_PUBLIC_CALCOM_USERNAME` / `NEXT_PUBLIC_CALCOM_EVENT_SLUG`
- Cal.com 側イベントslugの存在
- 埋め込み先URL（`/{username}/{eventSlug}`）の有効性

復旧手順:
1. env修正
2. Cal.comイベントslug修正
3. `/reservation` 再確認

## 8. 監視観点
- GitHub Actions `CI`:
  - `Lint Typecheck Build`
  - `Internal Link Check`
  - `Backend integration smoke`
- PRレビュー:
  - `@claude /review` の結果
- 本番デプロイ:
  - 主要導線（`/news`, `/faq`, `/reservation`, `/contact`）の疎通

## 9. 復旧・ロールバック方針
- 重大障害時は `main` の直近安定コミットへロールバック
- 連携障害時はフォールバック表示を維持しつつ hotfix を優先
- 事後に原因・再発防止を Issue 化して追跡

## 10. 引き継ぎチェックリスト
- `.env.local` 作成済み
- 3サービスの接続確認済み
- ローカル品質コマンド通過済み
- 主要導線の手動確認済み
- 障害時の切り分け手順を説明できる
