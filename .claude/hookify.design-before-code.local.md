---
name: design-before-code
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.(tsx|css)$
---

## .pen デザイン確定前のコード実装検出

`.tsx` または `.css` ファイルの編集が検出されました。

**.pen デザインファイルが Single Source of Truth (SSOT) です。**

**以下を確認してから実装を進めること:**

1. **対応する .pen デザインは確定済みか？**
   - `design/` ディレクトリ内の .pen ファイルで該当セクションのデザインが完成しているか
   - `get_screenshot` でデザインの最終状態を確認したか

2. **ユーザー承認は得ているか？**
   - デザインをユーザーに提示し、承認を受けたか
   - 承認内容は `tasks/decisions.md` に記録済みか

3. **正しい実装順序:**
   - .pen デザイン作成・更新 → ユーザー承認 → コード実装
   - .pen 未確定の状態でコード先行しない

**デザインが確定済みなら、このまま実装を続行してください。**
