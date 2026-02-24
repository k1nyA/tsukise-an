---
name: code-to-pen
description: HTML/CSSプロトタイプを.penデザインファイルに変換。CSSの値を.penプロパティにマッピングし、PC/Tablet/Mobileの3幅デザインを生成。コンポーネント化まで実行。
allowed-tools: mcp__pencil__batch_design, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__get_editor_state, mcp__pencil__open_document, mcp__pencil__get_guidelines, mcp__pencil__find_empty_space_on_canvas, mcp__pencil__get_style_guide_tags, mcp__pencil__get_style_guide, Bash, Read, Write, Glob
argument-hint: [HTMLファイルパス] [.penファイルパス(任意)]
user-invocable: true
---

# HTML/CSS → .pen 変換スキル

**状態: 未実装 — 次の制作実践を通じて構築予定**

## 予定機能

### 1. HTML/CSS の解析
- HTML 構造をパース（セクション、フレーム、テキスト、画像）
- CSS プロパティを抽出（fontSize, color, padding, gap, layout direction）
- メディアクエリ / clamp() 値を解析して 3 幅の値を逆算

### 2. CSS → .pen プロパティマッピング

| CSS | .pen |
|-----|------|
| `display: flex` | `type: "frame"` |
| `flex-direction: column` | `layout: "vertical"` |
| `flex-direction: row` | `layout: "horizontal"` (default) |
| `gap: 24px` | `gap: 24` |
| `padding: 80px` | `padding: 80` |
| `padding: 40px 36px` | `padding: [40, 36]` |
| `font-size: 38px` | `fontSize: 38` |
| `font-weight: 600` | `fontWeight: "600"` |
| `color: #2C2418` | `fill: "#2C2418"` |
| `background: #EEEBE3` | `fill: "#EEEBE3"` |
| `width: 100%` | `width: "fill_container"` |
| `object-fit: cover` | `fill: { type: "image", mode: "fill" }` |

### 3. 3幅デザインの生成
- PC (1440px) をベースに作成
- Tablet (768px) はタイポグラフィ・パディングをスケールダウン
- Mobile (375px) は横並び→縦積みに変換
- Lesson 1-10 の堅牢性ルールを自動適用

### 4. コンポーネント化
- 繰り返しパターンを検出して `reusable: true` で定義
- Lesson 6 のスノーボール戦略に従う
- Lesson 10 のデバイス幅別保管フレームに配置
