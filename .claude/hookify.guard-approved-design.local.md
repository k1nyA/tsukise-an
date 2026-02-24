---
name: guard-approved-design
enabled: true
event: all
action: warn
tool_matcher: mcp__pencil__batch_design
conditions:
  - field: operations
    operator: regex_match
    pattern: (fontSize|fontFamily|fontWeight|fill|background|Background|hero.*[Ii]mg|btn|[Bb]utton|CTA|cta)
---

## 承認済みデザイン要素の変更検出

`batch_design` でフォントサイズ・背景画像・ボタンスタイルに関わる変更を検出しました。

**以下を確認してから実行すること:**

1. **ユーザー承認済みの要素を変更していないか？**
   - `tasks/decisions.md` に記録されている承認済みデザイン決定と矛盾しないか確認
   - 該当 GitHub Issue のコメントも参照

2. **変更対象の確認:**
   - フォントサイズ (`fontSize`, `fontFamily`, `fontWeight`) の変更 → 承認済みタイポグラフィとの整合性
   - 背景画像 (`fill`, `background`) の変更 → 承認済みビジュアルとの整合性
   - ボタン・CTAスタイルの変更 → 承認済みインタラクションデザインとの整合性

3. **未承認の変更の場合:**
   - まずユーザーに変更内容を提示して承認を得ること
   - 承認後に `tasks/decisions.md` と GitHub Issue に記録してから実装
