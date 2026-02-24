---
name: frontend-flow
description: ゼロからのクリエイティブデザイン→.penでレスポンシブ堅牢化→高精度コード実装までの一貫フロー。公式frontend-designスキル+独自サブスキルの6フェーズで手戻りゼロを実現。
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, Skill, mcp__pencil__batch_get, mcp__pencil__get_screenshot, mcp__pencil__snapshot_layout, mcp__pencil__get_guidelines, mcp__pencil__get_variables, mcp__pencil__batch_design, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_snapshot
argument-hint: [ページ名] [フェーズ番号(任意)] [.penファイルパス(任意)]
user-invocable: true
---

# フロントエンド制作フロー（マスタースキル）

## 目的

**ゼロから完成まで**を一貫したパイプラインで実行する。公式 frontend-design スキル（創造）と独自サブスキル群（精度）を組み合わせ、「美しく、かつ正確な」フロントエンドを実現。

**このスキル自体が ToDo リスト**: 未実装のサブスキル = やること。実践を通じてスノーボール式に完成させる。

## フルパイプライン

```
Phase 0: /creative-design ── ゼロからUI創造 ──── Gate: 美しいHTML/CSSが完成
       ↓
Phase 0.5: /code-to-pen ─── HTML→.pen変換 ──── Gate: .penに3幅デザイン完成
       ↓
Phase 1: /design-audit ──── 品質・堅牢性チェック ── Gate: 問題0件
       ↓
Phase 2: /responsive-diff ── 3幅差分+CSS戦略 ── Gate: 戦略確定
       ↓
Phase 3: /responsive-test ── Playwright定量検証 ── Gate: 計測値一致
       ↓
Phase 4: /pen-to-code ────── 最終コード生成 ──── Gate: ブラウザ=デザイン
       ↓
[実装完了 — 手戻りゼロ]
```

**エントリーポイントは柔軟**: 既にデザインがある場合は Phase 1 から、CSSだけ検証したい場合は Phase 3 から開始可能。

---

## Phase 0: クリエイティブデザイン（公式スキル活用）

**担当**: 公式 `frontend-design` スキル（Anthropic提供）

```
Skill: frontend-design [要件の説明]
```

**役割**: ゼロから美しいHTML/CSS/JSを創造する。
- 独自性のあるタイポグラフィ・色・モーション
- 「AI臭くない」デザイン
- プロダクショングレードの実装

**Gate**: ユーザーが「この方向性でいい」と承認。

**出力**: HTML/CSS/JS ファイル（デザインの方向性を確立するプロトタイプ）

---

## Phase 0.5: HTML → .pen 変換

**担当**: `/code-to-pen` サブスキル

```
Read .claude/skills/code-to-pen/SKILL.md
```

**役割**: Phase 0 で作ったHTML/CSSを .pen デザインファイルに変換し、3幅（PC/Tablet/Mobile）に展開。
- HTML の構造を .pen のフレーム構造にマッピング
- CSS の値を .pen のプロパティに変換
- PC デザインを基準に Tablet/Mobile を派生
- コンポーネント化（reusable: true）の適用

**Gate**: 3幅のデザインが .pen 上で美しく表示される。

**出力**: .pen ファイル内に PC/Tablet/Mobile の全セクション + コンポーネント

---

## Phase 1: デザイン品質監査

**担当**: `/design-audit` サブスキル

```
Read .claude/skills/design-audit/SKILL.md
```

**チェック項目** (tasks/lessons.md の知見を自動適用):
- [ ] テキストノード: `textGrowth: "fixed-width"` + `width: "fill_container"` (Lesson 1)
- [ ] 固定 height + 可変コンテンツの不整合 (Lesson 2)
- [ ] fill_container 崩壊（親フレームの width 未設定）(Lesson 9)
- [ ] 横並びフレームの width 必須 (Lesson 9)
- [ ] タイポグラフィ階層の一貫性 (Lesson 8)
- [ ] コンポーネント保管フレームのデバイス幅 (Lesson 10)

**Gate**: 問題 0 件。問題があれば .pen を修正してから次へ。

---

## Phase 2: レスポンシブ差分分析

**担当**: `/responsive-diff` サブスキル

```
Read .claude/skills/responsive-diff/SKILL.md
```

**出力**:
- 3幅プロパティ差分表（layout, fontSize, padding, gap, colors）
- CSS 戦略マップ（flex-wrap / clamp() / breakpoint の組み合わせ）
- コンポーネント統合提案（例: 6→2）
- clamp() 係数の自動計算結果

**Gate**: ユーザーが CSS 戦略を承認。

---

## Phase 3: レスポンシブ統合テスト

**担当**: `/responsive-test` サブスキル **[実装済み]**

```
Skill: responsive-test [PC_ID] [Tablet_ID] [Mobile_ID]
```

**出力**:
- テスト HTML（flex-wrap + clamp() で単一コンポーネント化）
- 3幅スクリーンショット（Playwright）
- computed style 比較表（実測値 vs 設計値）
- 統合判定（可能 / 微調整で可能 / 不可）

**Gate**: 計測値が許容範囲内:
| 項目 | 許容範囲 |
|------|---------|
| Typography | ±1px |
| Padding/Gap | ±5px |
| 画像比率 | ±10% |
| Layout切替 | 完全一致必須 |

---

## Phase 4: 最終コード生成

**担当**: `/pen-to-code` サブスキル

```
Read .claude/skills/pen-to-code/SKILL.md
```

**入力**: Phase 2-3 の結果（CSS戦略 + 検証済み clamp() 値）
**出力**: React/Next.js コンポーネント + CSS（Tailwind or CSS Modules）

**Gate**: ブラウザ表示が .pen デザインと一致（Playwright で最終検証）。

---

## フロー制御ルール

1. **各 Phase の Gate を通過しないと次へ進まない**
2. **Phase 間でコンテキストを引き継ぐ**: 差分表、CSS戦略、検証結果
3. **問題発見時は前の Phase に戻る**（.pen修正 → Phase 1 からやり直し）
4. **ユーザー承認ポイント**: Phase 0（方向性）、Phase 2（CSS戦略）、Phase 3（統合判定）

## 並列実行パターン

複数セクションを並列で制作する場合:
1. Phase 0-2 はページ単位で実行（全セクションまとめて）
2. Phase 3-4 はセクション単位で並列化可能（Task tool でサブエージェント起動）
3. 各サブエージェントにサブスキルの SKILL.md パスとセクション情報を渡す

```
Task(subagent_type: "general-purpose", prompt: "
  Read .claude/skills/responsive-test/SKILL.md の手順に従って、
  以下のコンポーネントの検証を実行:
  PC: x8Dpr, Tablet: 8mxcj, Mobile: sb64h
  .pen ファイル: design/月瀬庵デザイン.pen
")
```

---

## サブスキル一覧 & 進捗

| Phase | スキル | パス | 状態 |
|-------|-------|------|------|
| 0 | /creative-design | 公式 `frontend-design` | **外部スキル（利用可能）** |
| 0.5 | /code-to-pen | `.claude/skills/code-to-pen/SKILL.md` | **未作成** |
| 1 | /design-audit | `.claude/skills/design-audit/SKILL.md` | プレースホルダー |
| 2 | /responsive-diff | `.claude/skills/responsive-diff/SKILL.md` | プレースホルダー |
| 3 | /responsive-test | `.claude/skills/responsive-test/SKILL.md` | **実装済み** |
| 4 | /pen-to-code | `.claude/skills/pen-to-code/SKILL.md` | プレースホルダー |

**残り作業**: Phase 0.5, 1, 2, 4 のスキルを実践を通じて肉付け。

---

## ナレッジベース

- `tasks/lessons.md`: 全 Lesson の蓄積（Lesson 1-12）
- 各サブスキルは lessons.md を参照して品質基準を適用する
- 新しい発見は即座に lessons.md に追記 → 全スキルに自動反映
