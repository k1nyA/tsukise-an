# コンポーネント化と管理の運用ガイド

最終更新: 2026-02-22

## 1. 目的
- UIの再利用性を上げる
- デザイン崩れの再発を減らす
- 並列開発で衝突しにくい構成にする

## 2. レイヤー分割（推奨）
- `primitives`:
  - ボタン、入力、タイポなど最小単位
- `ui`:
  - `Card`, `Tabs`, `Accordion` など汎用複合
- `section`:
  - ページ固有のセクション（Hero, CTA, Infoなど）
- `page`:
  - ルーティングページ（`src/app/**/page.tsx`）

ルール:
- `section` から `page` 以外への逆依存を作らない
- `section` は外部API呼び出しを直接持たず、必要データはpropsで受ける
- API呼び出しは `page` または `src/lib/*` に寄せる

## 3. 命名と責務
- コンポーネント名は `PascalCase`
- ファイル名はコンポーネント名に一致
- 1コンポーネント1責務（UI + 最小の表示ロジック）
- ビジネスロジックは `src/lib/` または hooks に分離

## 4. Props設計
- 必須と任意を明確にする
- `variant` で見た目差分を制御し、分岐だらけのpropsを避ける
- `children` の有無を意図的に設計する
- コールバック引数に型を付ける

## 5. スタイル運用
- ページ固有: `*.module.css`
- グローバルはトークンとリセットに限定
- 色/余白/タイポは変数参照を優先
- inline styleは最小限

## 6. 変更フロー（推奨）
1. Issue作成（`type:task` + `area:*` + `parallel:*`）
2. TDDで着手（Red -> Green -> Refactor）
3. Visual確認（Playwright screenshot）
4. PRレビュー（UI差分 + 影響範囲）
5. マージ後にチェックリスト更新

## 7. コンポーネントPRチェック
- [ ] 責務が1つに収まっている
- [ ] 既存コンポーネント再利用で実装できないか確認した
- [ ] a11y（aria/role/keyboard）を確認した
- [ ] Storyまたは再現手順を添えた
- [ ] CSSが他画面へ漏れない
- [ ] E2E/単体テストに影響があれば更新した

## 8. リンクチェックの運用
- 開発中:
  - `npm run check:links` を手動実行
- PR前:
  - 主要導線のスクリーンショットと一緒に実行結果を添付
- CI:
  - 将来的に `check:links` をworkflowに組み込み

## 9. このプロジェクトでの最小実装ルール
- Header/Footer/CTAは共通コンポーネントを維持
- セクション内の固定文言は最小化し、可能ならprops/データ駆動化
- 外部連携（Cal.com/Web3Forms/microCMS）は`src/lib`経由に集約
