# Claude Code Instructions - 月瀬庵 (Tsukise-an)

## 最重要: 画像アセットのソース

**デザイン生成済み画像は `design/images/` にすべて保存されている。**

- .pen ファイルで G() 操作により生成された画像は `design/images/generated-*.png` として保存済み
- `public/images/` に配置する際は命名規則 `{page}-{section}-{descriptor}.png` でリネーム
- **実装時は必ず `design/images/` と .pen ファイルを確認して、画像の対応関係を特定すること**
- 画像が `public/images/` に存在しない場合、`design/images/` から探してコピーする

### 画像マッピング確認手順
1. .pen ファイルで対象セクションの画像ノードを `batch_get` で確認
2. ノードの fill image パス（`design/images/generated-*.png`）を特定
3. `public/images/{page}-{section}-{descriptor}.png` にコピー
4. コンポーネントの `src` で参照

### 命名規則
```
{page}-{section}-{descriptor}.{ext}
```
- page: `top`, `rooms`, `onsen`, `cuisine`, `experience`, `access`, `reservation`, `contact`, `shared`
- 詳細: `docs/IMAGE_GUIDELINES.md` を参照

---

## アーキテクチャ

### デザインソース (SSOT)
- `.pen` ファイル: `design/月瀬庵デザイン.pen`
- 全13ページ x 3VP (PC/Tablet/Mobile) = 39フレーム

### 技術スタック
- Next.js (App Router) + TypeScript
- Tailwind CSS + CSS Variables (レスポンシブ)
- `next/image` for all images

### レスポンシブ CSS パターン
- 共通変数: `src/lib/css/ryokan-responsive.css` (READ ONLY)
- ページ別: `src/components/{page}/{page}-responsive.css`
- ブレークポイント: Mobile(<768) / Tablet(768-1023) / PC(>=1024)
- `globals.css` に各ページCSS を `@import` で追加

### 共有コンポーネント
- `Header`, `Footer`, `CTASection`, `PageHero`, `Breadcrumb`
- 全ページで必ず使用すること

### 背景画像パターン
- CSS背景: `backgroundImage: 'url(/images/{page}-{section}-bg.png)'` (直接URL)
- **CSS変数経由は使わない** — 未定義になるリスクがあるため
- コンテンツ画像: `<Image src="/images/{page}-{section}-{descriptor}.png" />` (Next.js Image)

---

## GitHub ルール
- PR作成: `gh pr create -R k1nyA/tsukise-an` (upstream汚染防止)
- PR マージ: `gh pr merge -R k1nyA/tsukise-an --squash --delete-branch`
