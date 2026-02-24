---
name: responsive-test
description: .penデザインの3幅コンポーネントをCSS flex-wrap + clamp()で統合可能か検証する。テストHTML自動生成→Playwright 3幅スクリーンショット→computed style比較→.penスクリーンショット比較を実行。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_snapshot, Bash, Read, Write, Glob, Edit
argument-hint: [PC_ID] [Tablet_ID] [Mobile_ID] または [セクション名]
user-invocable: true
---

# レスポンシブ統合テストスキル

## 目的

.pen デザインの PC/Tablet/Mobile 3幅コンポーネントが、**単一の CSS コンポーネント**（flex-wrap + clamp()）で統合可能かを、コード実装前に定量検証する。

## 前提条件

- .pen ファイルが存在し、3幅のコンポーネントが作成済み
- Pencil MCP が接続済み
- Playwright MCP が接続済み

## 入力

引数として以下のいずれかを受け取る:
- **3つのノードID**: `[PC_ID] [Tablet_ID] [Mobile_ID]`
- **セクション名**: `ImgText` など（batch_get で検索）

## 実行フロー

### Step 1: デザイン差分の抽出

3幅のコンポーネントを `batch_get(readDepth: 3, resolveInstances: true)` で読み取り、以下の差分表を生成:

```
| Property       | PC (1440px)    | Tablet (768px) | Mobile (375px)  |
|---------------|----------------|----------------|-----------------|
| layout        | horizontal/vertical |              |                 |
| width (image) | Npx / fill     |                |                 |
| height (image)| fill / Npx     |                |                 |
| title fontSize| Npx            |                |                 |
| desc fontSize | Npx            |                |                 |
| padding       | N / [N,N]      |                |                 |
| gap           | N              |                |                 |
| colors (bg/text) | #xxx        |                |                 |
```

### Step 2: CSS 戦略の決定

差分パターンに応じて手法を自動選択:

| 差分パターン | CSS 手法 | breakpoint |
|-------------|---------|-----------|
| 横↔縦切替 | `flex-wrap: wrap` + `flex-basis` | 不要 |
| 線形スケーリング（A→B→C 単調） | `clamp(min, slope*vw + intercept, max)` | 不要 |
| 非線形スケーリング（A→B→C 非単調） | `clamp()` x 2区間 | 1つ (769px) |
| 不連続な切替（色、構造の変化） | media query | 必要 |

**clamp() 係数の計算式**:
```
2点 (v1, t1) → (v2, t2) から:
  slope = (t2 - t1) / (v2 - v1)
  intercept = t1 - slope * v1
  → clamp(t1, slope*100vw + intercept_px, t2)

例: 26px(768px) → 38px(1440px)
  slope = (38-26)/(1440-768) = 0.01786
  intercept = 26 - 0.01786*768 = 12.25
  → clamp(26px, 1.79vw + 12.25px, 38px)
```

### Step 3: テスト HTML 生成

`test/responsive-test-{セクション名}.html` を生成:

1. **Google Fonts リンク**: デザインで使用するフォントを含める
2. **CSS 変数**: .pen のカラーを CSS 変数で定義
3. **flex-wrap コンポーネント**: Step 2 の戦略を適用した CSS
4. **実コンテンツ**: .pen から取得したテキスト・ラベル・リンクテキスト
5. **デバッグバー**: viewport サイズ表示（position: fixed）

画像は Unsplash の適切な画像 URL を使用（背景画像として）。

### Step 4: Playwright 3幅検証

```
1. python3 -m http.server 8765 でローカルサーバー起動（test/ ディレクトリ）
2. Playwright で http://localhost:8765/responsive-test-{name}.html にアクセス
3. 3幅でリサイズ & スクリーンショット & computed style 取得:

   [1440px × 900px] → screenshots/rt-{name}-pc.png
   [ 768px × 900px] → screenshots/rt-{name}-tablet.png
   [ 375px × 812px] → screenshots/rt-{name}-mobile.png

4. 各幅で browser_evaluate で計測:
   - imgWidth, contentWidth
   - titleFontSize, descFontSize
   - contentPadding, contentGap
   - layout direction (horizontal/vertical)

5. サーバー停止
```

### Step 5: .pen スクリーンショット取得 & 比較

```
1. get_screenshot で PC/Tablet/Mobile の .pen コンポーネントを取得
2. 差分表を更新:

| Property    | Width | Design (.pen) | flex-wrap 実測 | 判定     |
|-------------|-------|--------------|---------------|---------|
| Layout      | 1440  | horizontal   | horizontal    | MATCH   |
| Title       | 768   | 26px         | 26px          | MATCH   |
| Image W     | 768   | 380px        | 430px         | +50px   |
...

3. 判定基準:
   - Layout: 完全一致必須
   - Typography: ±1px 許容
   - Padding/Gap: ±5px 許容
   - 画像比率: ±10% 許容
```

### Step 6: 結果報告

ユーザーに以下を提示:
1. **3幅のスクリーンショット比較**（ブラウザ実測 vs .pen デザイン）
2. **計測値の差分表**（MATCH / DIFF の判定付き）
3. **統合判定**: 統合可能 / 微調整で可能 / 統合不可
4. **必要な CSS**: flex-wrap + clamp() のコードスニペット
5. **トレードオフ**: 統合による差異と許容判断

### Step 7: lessons.md への記録

検証結果を `tasks/lessons.md` に追記（新しいパターンが発見された場合のみ）。

## 出力例

```
## responsive-test 結果: ImgText Section

### 統合判定: 可能（1 breakpoint 追加）

| Property | PC(1440) | Tablet(768) | Mobile(375) | 手法 |
|----------|----------|-------------|-------------|------|
| Layout   | 横 ✓     | 横 ✓        | 縦 ✓        | flex-wrap |
| Title    | 38px ✓   | 26px ✓      | 24px ✓      | clamp() x2 + @media 769px |
| Desc     | 15px ✓   | 13px ✓      | 13px ✓      | clamp() |
| Image W  | 810 ~✓   | 430 (+50)   | 375 ✓       | flex: 1.3 1 380px |

CSS:
  .section { display: flex; flex-wrap: wrap; }
  .section-image { flex: 1.3 1 380px; min-height: 240px; }
  .section-content { flex: 1 1 300px; }
  .section-title { font-size: clamp(24px, 0.51vw + 22.09px, 26px); }
  @media (min-width: 769px) {
    .section-title { font-size: clamp(26px, 1.79vw + 12.25px, 38px); }
  }

6コンポーネント → 2コンポーネントへの統合が現実的。
```

## 注意事項

- テスト HTML はあくまで検証用。本番コードは `/pen-to-code` スキルで生成する
- .pen ファイルは変更しない（get_screenshot のみ）
- Unsplash 画像は検証用のプレースホルダー。本番では実際の画像を使用
- `python3 -m http.server` は検証後に必ず停止する
