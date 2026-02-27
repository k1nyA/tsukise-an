---
name: frontend-flow
description: ゼロからのクリエイティブデザイン→.penでレスポンシブ堅牢化→高精度コード実装までの一貫フロー。公式frontend-designスキル+独自サブスキルの6フェーズで手戻りゼロを実現。
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, Skill, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__get_guidelines, mcp__pencil__get_variables, mcp__pencil__batch_design, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_snapshot
argument-hint: [ページ名] [フェーズ番号(任意)] [.penファイルパス(任意)]
user-invocable: true
---

# フロントエンド制作フロー（マスタースキル）

## 目的

ゼロから完成までを、`.pen` SSOT と lessons 連携を維持しながら、DRAFT/FREEZE/RELEASE の3ゲートで安全に進める。

## 運用原則

1. `.pen` が設計の唯一ソース（SSOT）
2. 実装判断は `tasks/lessons.md` の既存ルールを優先
3. 各 Phase は Gate を通過しない限り次へ進まない
4. 生成物は次 Phase で再利用する（監査表/差分表/検証表）

## 共通チェック（全 Phase 共通）

開始時と FREEZE 前に以下を必須実行:

1. Worktree health
   - `npm run preflight:claude`
2. Design contract
   - `npm run check:design-contract`

いずれか失敗時は Phase を進めず修復を優先する。

## ゲート定義（DRAFT/FREEZE/RELEASE）

- `DRAFT`: 調査・作成・比較を行い、候補を揃える状態
- `FREEZE`: 変更範囲を固定し、契約チェック通過済みの状態
- `RELEASE`: 次工程へ引き渡せる成果物が確定した状態

## フルパイプライン

```
Phase 0: /creative-design ── ゼロからUI創造 ──── Gate: DRAFT
       ↓
Phase 0.5: /code-to-pen ─── HTML→.pen変換 ──── Gate: FREEZE
       ↓
Phase 1: /design-audit ──── 品質・堅牢性チェック ── Gate: FREEZE
       ↓
Phase 2: /responsive-diff ── 3幅差分+CSS戦略 ── Gate: FREEZE
       ↓
Phase 3: /responsive-test ── Playwright定量検証 ── Gate: FREEZE
       ↓
Phase 4: /pen-to-code ────── 最終コード生成 ──── Gate: RELEASE
       ↓
[実装完了 — 手戻りゼロ]
```

既にデザインがある場合は Phase 1 から開始可能。

## 最短実行手順（再利用重視）

1. DRAFT 開始  
`/creative-design` または既存 .pen から開始し、`/code-to-pen` で 3幅を揃える。

2. 品質固定（FREEZE-1）  
`/design-audit` で Lesson 1/2/8/9/10 を検証し、問題を閉じる。

3. 戦略固定（FREEZE-2）  
`/responsive-diff` で差分表と CSS 戦略を1セット化する。

4. 定量検証（FREEZE-3）  
`/responsive-test` で 3幅計測値を取り、許容差内を確認する。

5. 実装確定（RELEASE）  
`/pen-to-code` へ渡し、最終実装後に `npm run check:design-contract` を再実行して完了。

## Phase ごとの引き継ぎ物

- Phase 1 → 2: 監査表（Fail/Fix/Carry-over）
- Phase 2 → 3: 差分表 + CSS 戦略
- Phase 3 → 4: 実測比較表 + 採用判定

## ユーザー承認ポイント

1. DRAFT 完了時（方向性）
2. FREEZE-2 完了時（CSS 戦略）
3. RELEASE 前（最終差分）

## ナレッジ連携

- 参照元: `tasks/lessons.md`
- 追記条件: 新しい失敗パターン・再発防止ルールが確認できたときのみ
