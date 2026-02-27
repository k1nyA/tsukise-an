---
name: design-audit
description: .penデザインの品質・堅牢性を自動チェック。textGrowth/fill_container崩壊/固定height問題/タイポグラフィ一貫性をLessonsベースで検出・修正提案。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__batch_design, Read, Glob
argument-hint: [ページノードID] または [all]
user-invocable: true
---

# デザイン品質監査スキル

## 目的

.pen を SSOT（Single Source of Truth）として、横軸（崩壊/クリップ）と縦軸（一貫性）を短時間で監査し、次工程に渡せる修正案を確定する。

## 共通ゲート（DRAFT/FREEZE/RELEASE）

- `DRAFT`: 問題検出と修正案作成。必要なら .pen を最小修正。
- `FREEZE`: 監査結果を固定し、`tasks/lessons.md` との整合を確認。
- `RELEASE`: 次フェーズへ渡せる監査レポート（問題0件 or 残課題明示）を確定。

## 実行前チェック（必須）

1. Worktree health:
   - `npm run preflight:claude`
2. Design contract:
   - `npm run check:design-contract`

どちらかが失敗した場合は監査開始前に解消する。

## 監査手順（再利用テンプレ）

1. 対象確定  
引数のノード ID（または `all`）を監査対象にする。

2. 横軸監査（崩壊/クリップ）
- `snapshot_layout(problemsOnly: true)` で崩壊・クリップ・はみ出しを検出
- `batch_get` でテキスト幅崩壊（`width: 1` かつ高身長）候補を確認

3. 縦軸監査（一貫性）
- `batch_get` で text/frame を取得し、同役割の `fontSize/padding/gap/color` を比較
- `tasks/lessons.md`（特に Lesson 1,2,8,9,10）と照合

4. 修正と再監査
- 明確な不具合は `batch_design` で最小修正
- 再度 2-3 を回して差分を閉じる

5. FREEZE 判定
- `npm run check:design-contract` を再実行
- lessons への追記が必要な新知見のみ `tasks/lessons.md` に反映（既存ルールの言い換えは追記しない）

## チェック観点（固定）

tasks/lessons.md から自動適用:

1. **Lesson 1**: テキストノードに `textGrowth: "fixed-width"` + `width: "fill_container"` が設定されているか
2. **Lesson 2**: 固定 height + 可変コンテンツの組み合わせがないか
3. **Lesson 8**: タイポグラフィ階層（H0-Info）が一貫しているか
4. **Lesson 9**: fill_container 崩壊（親フレームの width 未設定）がないか
5. **Lesson 10**: コンポーネント保管フレームのデバイス幅が正しいか

## 出力フォーマット（最小）

```md
## design-audit 結果
- Scope: [node/all]
- Gate: DRAFT|FREEZE|RELEASE
- Blocking issues: N
- Fixed now: N
- Carry-over: N

### Findings
| Rule | Node | Status | Action |
|---|---|---|---|
| Lesson 9 | abc123 | FAIL | parent width を補完 |
```
