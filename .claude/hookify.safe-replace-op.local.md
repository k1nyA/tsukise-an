---
name: safe-replace-op
enabled: true
event: all
action: warn
tool_matcher: mcp__pencil__batch_design
conditions:
  - field: operations
    operator: regex_match
    pattern: \bR\s*\(
---

## R() (Replace) 操作の安全性チェック

`batch_design` で R() (Replace) 操作が検出されました。

**R() は対象ノードを完全に置き換えるため、以下のリスクがあります:**

1. **ID 破壊リスク:**
   - 置換されたノードには新しい ID が割り当てられる
   - 他のスクリーンやコンポーネントからの参照（`ref`）が壊れる可能性がある

2. **実行前の確認事項:**
   - `batch_get` で対象ノード ID を検索し、他のスクリーンから参照されていないか確認したか？
   - 対象ノードが `reusable: true` のコンポーネントの一部でないか？
   - スロット内のノードを置換する場合、インスタンスパス（`instanceId/slotId`）が正しいか？

3. **安全な代替手段の検討:**
   - プロパティの変更だけなら `U()` (Update) で十分ではないか？
   - 子要素の追加なら `I()` (Insert) の方が安全ではないか？

R() が本当に必要な場合のみ実行し、実行後は `get_screenshot` で結果を確認すること。
