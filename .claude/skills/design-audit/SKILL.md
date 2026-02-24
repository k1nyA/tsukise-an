---
name: design-audit
description: .penデザインの品質・堅牢性を自動チェック。textGrowth/fill_container崩壊/固定height問題/タイポグラフィ一貫性をLessonsベースで検出・修正提案。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__batch_design, Read, Glob
argument-hint: [ページノードID] または [all]
user-invocable: true
---

# デザイン品質監査スキル

**状態: 未実装 — 次の制作実践を通じて構築予定**

## 予定チェック項目

tasks/lessons.md から自動適用:

1. **Lesson 1**: テキストノードに `textGrowth: "fixed-width"` + `width: "fill_container"` が設定されているか
2. **Lesson 2**: 固定 height + 可変コンテンツの組み合わせがないか
3. **Lesson 8**: タイポグラフィ階層（H0-Info）が一貫しているか
4. **Lesson 9**: fill_container 崩壊（親フレームの width 未設定）がないか
5. **Lesson 10**: コンポーネント保管フレームのデバイス幅が正しいか

## 検出方法（予定）

- `snapshot_layout` で全ノードの計算サイズを取得
- テキストノードで `width: 1, height > 15` を検出（Lesson 9）
- `batch_get` で reusable コンポーネントの textGrowth/width 設定を検証
- タイポグラフィ一貫性チェック: 同レベルの見出しで fontSize が異なるものを検出
