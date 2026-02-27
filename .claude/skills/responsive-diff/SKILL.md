---
name: responsive-diff
description: .penの3幅コンポーネントのプロパティ差分を抽出し、CSS戦略（flex-wrap/clamp()/breakpoint）を自動提案。統合可能コンポーネントを特定。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, Read, Write
argument-hint: [ページ名] または [コンポーネント名パターン]
user-invocable: true
---

# レスポンシブ差分分析スキル

## 目的

.pen SSOT の PC/Tablet/Mobile 差分を、実装で再利用しやすい「1つの差分表 + 1つのCSS戦略」に圧縮する。

## 共通ゲート（DRAFT/FREEZE/RELEASE）

- `DRAFT`: 差分抽出と戦略案を作る。
- `FREEZE`: 戦略を固定し、契約チェックを通す。
- `RELEASE`: 実装担当がそのまま使える差分表/CSS方針を確定。

## 実行前チェック（必須）

1. Worktree health:
   - `npm run preflight:claude`
2. Design contract:
   - `npm run check:design-contract`

## 分析手順（再利用テンプレ）

1. 3幅取得  
`batch_get` で PC/Tablet/Mobile の同一コンポーネントを取得（`readDepth` は必要最小）。

2. 差分表を1枚に正規化  
`layout / width / height / fontSize / padding / gap / color` のみ比較対象にする。

3. 戦略分類（Lesson 11-12）
- 横↔縦切替: `flex-wrap`
- 線形変化: `clamp()` 1区間
- 非線形変化: `clamp()` 2区間 + breakpoint
- 不連続変化: media query

4. clamp 係数を算出  
2点 `(viewport, value)` から slope/intercept を算出し、CSS スニペット化。

5. FREEZE 判定  
`npm run check:design-contract` を再実行し、差分表と戦略を固定。

## 統合可否ルール（固定）

- 同一構造 + レイアウト切替のみ: 統合可（優先）
- 構造同一 + 値差分中心: 統合可（clamp吸収）
- 構造差分が大きい: 統合不可（幅別分離）

## 出力フォーマット（最小）

```md
## responsive-diff 結果
- Scope: [component/page]
- Gate: DRAFT|FREEZE|RELEASE
- Unified: yes/no

### Diff table
| Property | PC | Tablet | Mobile | Strategy |
|---|---|---|---|---|
| Title fontSize | 38 | 26 | 24 | clamp() x2 |
| Layout | row | row | column | flex-wrap |
```
