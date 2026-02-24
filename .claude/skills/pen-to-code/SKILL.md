---
name: pen-to-code
description: .penデザインからReact/Next.jsコンポーネントを生成。responsive-testの検証済みCSS戦略を適用し、flex-wrap+clamp()による統合コンポーネントを出力。
allowed-tools: mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__get_guidelines, mcp__pencil__get_variables, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, Bash, Read, Write, Edit, Glob, Grep
argument-hint: [セクション名] [CSS戦略ファイルパス(任意)]
user-invocable: true
---

# .pen → コード生成スキル

**状態: 未実装 — 次の制作実践を通じて構築予定**

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

## 実践で得たパターン

以下は実際の制作で蓄積したパターン。詳細は `tasks/lessons.md` を参照。

### .pen 固定幅 → CSS flex 比率変換 (Lesson #37)
.pen の `width: 560` は 1440px キャンバス基準の値。CSS にそのまま `maxWidth: 560` で持ち込むと、狭いビューポートでカラムバランスが崩壊する。`fill_container` + 固定幅の兄弟は、CSS では両方 `flex: 1` にして比例配分にする。
