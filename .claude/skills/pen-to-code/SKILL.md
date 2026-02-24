---
name: pen-to-code
description: .penデザインからReact/Next.jsコンポーネントを生成。responsive-testの検証済みCSS戦略を適用し、flex-wrap+clamp()による統合コンポーネントを出力。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__get_guidelines, mcp__pencil__get_variables, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, Bash, Read, Write, Edit, Glob, Grep
argument-hint: [セクション名] [CSS戦略ファイルパス(任意)]
user-invocable: true
---

# .pen → コード生成スキル

**状態: 手順確立済み（Issue #10 TOPページ実践） — フル自動化は2-3ページ実践後に予定**

## 予定機能

1. **Pencil MCP の get_guidelines("code") でコーディングルール取得**

2. **コンポーネント構造の決定**
   - responsive-diff の統合判定に基づきコンポーネント数を決定
   - 統合可能なセクションは 1 コンポーネント + CSS で実装
   - 統合不可のセクションはデバイス幅別コンポーネント

3. **CSS 戦略の適用**
   - responsive-test で検証済みの clamp() 値をそのまま使用
   - flex-wrap + flex-basis 設定を適用
   - breakpoint は必要最小限

4. **コード生成**
   - React/Next.js コンポーネント（TypeScript）
   - CSS Modules または Tailwind CSS
   - アクセシビリティ属性（aria-hidden 等）
   - next/image 最適化

5. **ブラウザ検証**
   - 生成したコードを Next.js dev server で起動
   - Playwright で 3 幅スクリーンショット
   - .pen デザインとの最終比較

## TOPページ実践で確立した手順 (Issue #10)

以下は Issue #10（TOPページ3サイズレスポンシブ化）で確立した再現可能な5ステップ手順。

### Step 1: .pen スペック抽出
- `batch_get` で PC/Tablet/Mobile のセクションノードを読み取り
- padding, gap, fontSize, layout, width, height の値をスペックシートに一覧化
- 参考: `tasks/pen-specs-responsive.md`, `tasks/pen-specs-pc.md`

### Step 2: CSS変数設計
- 3幅の値差分を分析し、CSS変数名を決定（例: `--r-hero-title`, `--r-info-gap`）
- media query で3段階に分割: PC ≥1024px / Tablet 768-1023px / Mobile <768px
- セクション共通変数 + セクション個別変数の2層構造
- 参考: `src/lib/css/ryokan-responsive.css`

### Step 3: レイアウトユーティリティ判断
- **CSS変数のみ**: padding/fontSize/gap のスケーリングだけ → media query で十分
- **useBreakpoint hook**: flex-direction の切替（横→縦）、要素の表示/非表示 → DOM構造変更が必要
- 判断基準: 「同じDOMで値だけ変わるか、構造が変わるか」

### Step 4: コンポーネント実装
- inline style で CSS変数を参照（`style={{ fontSize: 'var(--r-title-lg)' }}`）
- Tailwind ユーティリティは構造的なもの（flex, items-center等）に限定
- 値のハードコードは避け、CSS変数経由にする
- **Lesson #37**: .pen の固定幅は flex 比率に変換する（maxWidth コピー禁止）

### Step 5: 検証
- Playwright で 3幅 + 中間幅（100px刻み、計18ビューポート）のスクリーンショット
- ブレイクポイント境界（1024↔1023, 768↔767）の遷移確認必須
- .pen の `get_screenshot` との目視比較

## 実践で得たパターン

詳細は `tasks/lessons.md` を参照。

### .pen 固定幅 → CSS flex 比率変換 (Lesson #37)
.pen の `width: 560` は 1440px キャンバス基準の値。CSS にそのまま `maxWidth: 560` で持ち込むと、狭いビューポートでカラムバランスが崩壊する。`fill_container` + 固定幅の兄弟は、CSS では両方 `flex: 1` にして比例配分にする。

### .pen とコードの2層分離 (Lesson #35)
.pen で表現できない動的レイアウト（flex-wrap等）は、各ビューポートで最終形を .pen に表現し、コードで統合する。.pen はスナップショット、コードは動的振る舞い。

### CSS変数 + useBreakpoint のハイブリッド (Issue #10 実践)
- 値のスケーリング → CSS変数 + media query（SSR-safe、パフォーマンス良好）
- DOM構造変更 → useBreakpoint hook（条件付きレンダリング）
- 両方を組み合わせることで、CSSだけでは不可能なレスポンシブを実現
