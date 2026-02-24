---
name: responsive-diff
description: .penの3幅コンポーネントのプロパティ差分を抽出し、CSS戦略（flex-wrap/clamp()/breakpoint）を自動提案。統合可能コンポーネントを特定。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, Read, Write
argument-hint: [ページ名] または [コンポーネント名パターン]
user-invocable: true
---

# レスポンシブ差分分析スキル

**状態: 未実装 — 次の制作実践を通じて構築予定**

## 予定機能

1. **3幅差分表の自動生成**
   - batch_get で PC/Tablet/Mobile コンポーネントを読み取り
   - layout, width, height, fontSize, padding, gap, color の差分表を出力

2. **CSS 戦略の自動選択** (Lesson 11-12 ベース)
   - 横↔縦切替 → flex-wrap
   - 線形スケーリング → clamp() 1区間
   - 非線形スケーリング → clamp() 2区間 + breakpoint
   - 不連続切替 → media query

3. **clamp() 係数の自動計算**
   - 2点 (viewport, target) から slope/intercept を算出
   - CSS コードスニペットを生成

4. **統合可能コンポーネントの特定**
   - 同一構造で「横↔縦」の切替のみ → flex-wrap 統合候補
   - タイポグラフィのみ異なる → clamp() で吸収可能
   - 構造が異なる → 統合不可
