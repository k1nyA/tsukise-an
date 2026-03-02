# Lessons Learned

## .pen デザインファイルのレイアウトルール

### 1. テキストノードは必ず `textGrowth: "fixed-width"` + `width: "fill_container"` を設定する

**問題**: テキストに width/textGrowth が未設定だと、親フレームからはみ出し、`clip: true` の親にクリップされてテキストが途中で切れる。

**ルール**: セクションタイトル・見出し・本文テキストには必ず以下を設定:
- `textGrowth: "fixed-width"` (Auto height)
- `width: "fill_container"` (Fill width)

これにより親フレーム幅に収まり、自動改行される。

### 2. 固定 height + 可変コンテンツ = 溢れリスク

**問題**: `height: 480` 等の固定高さを持つセクションに、可変長のコンテンツ（カードリスト等）を入れると、コンテンツが溢れて次のセクションに侵食する。

**ルール**:
- コンテンツが固定でない場合、セクションに固定 height を設定しない
- 横並びセクション（image + content）では、image側に固定heightを持たせ、セクション自体は auto height にする
- `height: "fill_container"` を image に使えば、content 側の高さに追従する

### 3. タブレット幅(768px)での横並びカード数の限界

**問題**: 768px幅のタブレットで4カード横並び → 各147px、3カード横並び → 各89px。テキストが収まらない。

**ルール**:
- タブレットでは横並びカードは最大2枚まで
- 3枚以上は2x2グリッドまたは縦積みにする
- 横並びセクション（image 380px + content 388px）内のカードは必ず縦積み

### 4. ボトムアップで設計する

レイアウト問題の調査手順:
1. **最下位要素**（テキスト）の設定を確認 → textGrowth/width
2. **親フレーム**のレイアウト方向・パディングを確認 → layout: "vertical"
3. **セクション全体**の高さ制約を確認 → 固定height vs auto
4. **ページレベル**で溢れ・クリップがないか確認

### 5. 承認済みデザインを勝手に変更しない

**問題**: コードで独自にフォントサイズやパディングを変更した。

**ルール**:
- .pen デザインが FIX してからコード実装
- デザインパターンの変更はユーザー承認が必要
- CSSでテクスチャ画像の代替を作らない（実画像ファイルを使用する）

### 6. スノーボール・コンポーネント化戦略

**背景**: 全ページのセクションを個別に修正すると、同じ構造のセクションに何度も同じ修正を繰り返すことになる。コンポーネント化すれば1箇所の修正が全インスタンスに伝播する。

**戦略**: ページを左から右へ順番に処理し、コンポーネントを雪だるま式に蓄積していく。

**手順**:
1. **最初のページ（トップ）** で全セクションをコンポーネント化
   - ImgText Section / TextImg Section（画像＋テキストの横並び）
   - Image BG Center Section（背景画像＋中央テキスト）
   - Header / Footer / CTA / Concept / Hero / Info
   - 各幅（PC/Tablet/Mobile）ごとに作成
2. **次のページ** へ移動
   - 既存コンポーネントを適用（ref で配置＋descendants でカスタマイズ）
   - そのページ固有のセクションのみ新規コンポーネント化
3. **繰り返し**: ページが進むほど既存コンポーネントのカバー率が上がる
4. **最終ページ** に到達する頃には、ほとんどのセクションが自動的にコンポーネント化済み

**コンポーネント堅牢性の3条件**:
- テキストノード: `textGrowth: "fixed-width"` + `width: "fill_container"`
- セクション高さ: `height: "fit_content(N)"` （固定heightを避ける）
- 画像ノード: `height: "fill_container"` でコンテンツに追従

**スロットパターン**: コンポーネント内に `placeholder: true` のフレーム（sectionContent）を設け、インスタンスごとに異なるコンテンツを挿入可能にする。料理セクションと過ごし方セクションで同一コンポーネントを共用する場合などに有効。

**実証結果（トップページ）**:
- 全30セクション（10×3幅）をコンポーネント化
- コンポーネントのテキスト設定変更 → 全5インスタンスに自動伝播（個別修正0件）
- 非コンポーネントの場合: 7件以上の個別修正が必要だった

### 7. コンポーネント伝播の検証結果

**発見**: コンポーネント（reusable: true）のプロパティ変更は、全ref インスタンスに自動伝播する。

**検証内容**:
- Tablet ImgText Section（8mxcj）のタイトル fontSize を 28→26 に変更
- 5つのインスタンス（Ftxko, ufWMb, fwGaZ, SOoWP, aSYUr）全てに伝播を確認
- テキストの textGrowth/width 設定も同様に伝播

**ルール**:
- デザイン完了後、可能な限り全セクションをコンポーネント化する
- コンポーネントの堅牢性を最初に確保すれば、インスタンス側の修正は不要
- 修正が必要な場合はコンポーネント本体を変更し、インスタンス側は触らない

### 8. 品質の2軸フレームワーク

**考え方**: デザインの品質を「横軸」と「縦軸」の2つの独立した軸で評価する。1つのコンポーネントが壊れていないか（横軸）と、ページ全体で統一感があるか（縦軸）は別の問題であり、両方を同時に満たす必要がある。

**横軸: コンポーネントの堅牢性・品質（個別の正しさ）**

各コンポーネントが単体で正しく動作するかを検証する軸。

チェック項目:
1. `snapshot_layout(problemsOnly=true)` で崩壊・クリップを検出
2. テキストが1px幅に崩壊していないか（Lesson 9）
3. 親フレームに `layout` が明示されているか（Lesson 22）
4. `fill_container` の循環依存がないか（Lesson 27）
5. 画像が正しくフィットしているか（clip + mode: fill）

**縦軸: ページ内の一貫性・リズム（全体の調和）**

ページを通して見たときに、同じ役割の要素が同じスタイルになっているかを検証する軸。

チェック項目:
1. `search_all_unique_properties` で全 fontSize/padding/gap/color を取得
2. 同じ役割のテキスト（Section Title 同士、Body 同士）で fontSize が揃っているか
3. セクション間の padding/gap パターンが規則的か
4. 色の使い分けが意味的に一貫しているか（暗背景=白テキスト、明背景=暗テキスト）

**監査手順（実証済み 2026-02-24）**:
1. 3ビューポート（PC/Tablet/Mobile）それぞれに `snapshot_layout(problemsOnly=true)` → 横軸問題を一括検出
2. 3ビューポートに `search_all_unique_properties` → 使用中の全プロパティ値を取得
3. `batch_get(patterns=[{type:"text"}])` で全テキストノードを取得 → 役割別に fontSize を対照表にまとめる
4. 対照表とタイポグラフィ階層表を突き合わせ → 不一致を特定
5. 明確なミス（色違い等）は即修正、デザイン判断はユーザー確認

**タイポグラフィ階層（確定 — 全3ビューポート）**:

| レベル | 用途 | PC | Tablet | Mobile |
|--------|------|----|--------|--------|
| H0 | Hero 見出し | 56 | 44 | 32 |
| H1 | Concept Title（特別） | 36 | 32 | 24 |
| H2 | Section Title（全幅） | 32 | 32 | 24 |
| H3 | Subsection Title（横並び内） | 38 | 28 | 24 |
| CTA | CTA Title | 28 | 24 | 20 |
| Sub Title | Info サブタイトル | 24 | 24 | 24 |
| Body | セクション本文 | 15 | 14-15 | 14 |
| Hero Sub | Hero サブテキスト | 16 | 14 | 13 |
| Card Title | 料理名等 | 16 | 16 | 16 |
| Timeline Hour | 時刻（EN） | 28 | 28 | 28 |
| Timeline Title | タイムライン見出し | 16 | 16 | 16 |
| Timeline Desc | タイムライン説明 | 13 | 13 | 13 |
| News Body | ニュース本文 | 14 | 14 | 14 |
| Nav | ナビゲーション | 13 | 12 | — |
| Label EN | 英語ラベル | 12-13 | 12-13 | 12-13 |
| Link | リンクテキスト | 14 | 14 | 14 |
| Footer Nav | フッターナビ | 12 | 12 | 12 |
| Legal | 法的テキスト | 11 | 11 | 11 |
| Copyright | 著作権表示 | 11 | 11 | 11 |

**セクション padding パターン（確定）**:

| セクション | PC | Tablet | Mobile |
|-----------|-----|--------|--------|
| Concept | [120,160] | [80,100] | [60,24] |
| Cuisine/Stay | [100,80] | [80,40] | [60,24] |
| ImgText/TextImg | コンテンツ内padding:80 | コンテンツ内padding:[40,36] | — |
| CTA | layout:none | layout:none | layout:none |
| Info | 80 | 48 | 32 |
| Footer | [60,80,32,80] | [48,48,24,48] | [40,24,24,24] |

**セクション gap パターン（確定）**:

| セクション | PC | Tablet | Mobile |
|-----------|-----|--------|--------|
| Concept | 56 | 48 | 40 |
| Cuisine/Stay | 60 | 48 | 40/32 |
| Info | 60 | 40 | 32 |
| Footer | 48 | 48 | 32 |

### 9. `fill_container` を持つ子要素の親フレームには必ず確定サイズを設定する（崩壊問題）

**問題**: 親フレームに `width`（または `height`）プロパティが未設定で、子要素が `width: "fill_container"` を使うと、子の幅が **1px に崩壊**する。テキストが1px幅×数百px高さになり、1文字ずつ改行されて縦書きのように見える。

**根本原因**: `fill_container` は親フレームの確定サイズを基準に計算される。親にサイズがなければ、親のサイズは子の intrinsic サイズの合計になるが、`fill_container` の子は intrinsic サイズが 1px → 全体が崩壊する循環参照。

**重要**: この問題は**横並び(horizontal)・縦並び(vertical)どちらのフレームでも発生する**。横並びフレームだけでなく、縦並びフレームの子テキストが `width: "fill_container"` を使う場合も、親に `width` が必要。

**典型的な発生パターン**:
```
// ❌ NG（横並び）: 親フレームに width 未設定
frame(gap: 16, alignItems: "center") {
  rectangle(width: 30, height: 1)           // ライン
  text(width: "fill_container", ...)         // → 1px に崩壊！
}

// ❌ NG（縦並び）: 親フレームに width 未設定
frame(layout: "vertical", gap: 16) {
  text(width: "fill_container", ...)         // → 1px に崩壊！
  text(width: "fill_container", ...)         // → 1px に崩壊！
}

// ✅ OK: 親フレームに width: "fill_container" を追加
frame(gap: 16, width: "fill_container") {
  text(width: "fill_container", ...)         // → 正しく展開
}
```

**影響箇所の代表例**:
- ラベル行（横線 + 英語テキスト）: `— NEWS`, `— ACCESS`
- リンク行（テキスト + 矢印アイコン）: `一覧を見る →`
- アイコン + テキスト行: `🚗 お車で：...`, `🚃 電車で：...`
- ヒーロー内ラベル行、スクロールダウンインジケーター
- **CTA セクションの ctaIntro フレーム**（縦並び + 子テキストが fill_container → 縦書き化）

**実被害**:
- PC/Tablet/Mobile の Top Info, Top Hero, Mobile ImgText/TextImg で合計23箇所のテキストが1px幅に崩壊
- PC CTA の ctaIntro（Cf986）: width 未設定 → ctaTitle/ctaSub が 1px 幅 → テキスト縦書き化

**診断方法**: `snapshot_layout` で各ノードの計算サイズを確認し、テキストノードに `width: 1` かつ `height > 15` のものを探す（装飾用の縦線 `width: 1, height: 40` 等は意図的なので除外）。

**ルール**: 子要素に `fill_container`（width または height）を持つフレームには、必ず対応する軸のサイズ（`width: "fill_container"` または明示的な固定幅）を設定すること。横並び・縦並び問わず適用。

### 10. コンポーネント保管フレームはデバイス幅別に独立フレームで分ける

**問題**: 全コンポーネント（PC/Tablet/Mobile）を単一の1440px幅フレームに縦積みで保管すると、`width: "fill_container"` を持つコンポーネントが全て1440pxで描画される。Mobile（375px設計）やTablet（768px設計）のコンポーネントがPC幅で表示され、見た目が崩壊する。

**進化の過程**:
1. 最初は topRow グループに PC/Tablet/Mobile を入れていたが、topRow という中間層が視覚的に分かりにくく「管理できてない」状態になった
2. ユーザーの直感：「グループではなくフレームで分けるべき。componentsフレームの中にPCフレーム、TABフレーム、MBフレームを作れば事故らなそう」
3. Sequential Thinking で検証 → 直感は正しかった

**ルール**: Components フレームの直下に、デバイス幅に合わせた独立フレームを横並びで配置する。中間グループ（topRow 等）は使わない。

**最終実装**:
```
Components (cRCB2, layout: "horizontal", gap: 40)
├── Parts (fUIrU, width: 400)   ← ボタン・ラベル等の小パーツ
├── PC (RlMpE, width: 1440)     ← PC用セクションコンポーネント
├── Tablet (IQzum, width: 768)  ← Tablet用セクションコンポーネント
└── Mobile (DwO7w, width: 375)  ← Mobile用セクションコンポーネント
```

**ポイント**:
- 各フレームの固定幅が **max width として機能** → `fill_container` のコンポーネントが自然にその幅に収まる
- `layout: "horizontal"` + `gap: 40` でフラットに横並び → 構造が一目瞭然
- 中間グループなし → Components 直下に I() しても事故りにくい

**効果**: 各コンポーネントが正しいデバイス幅で描画され、デザイン確認時の混乱を防止。`reusable: true` のノードはファイル内のどこに配置されていてもコンポーネントとして参照可能なため、保管場所の変更はインスタンスに影響しない。

### 11. flex-wrap パターンによるレスポンシブ統合（空間効率の最大化）

**背景**: PC/Tablet/Mobile で同じコンテンツを持つが「横並び ↔ 縦積み」が異なるだけのセクションが多数存在する。デバイス幅ごとに別コンポーネントを作ると、3幅 × N個の管理コストが発生する。

**発見**: CSS `flex-wrap` + `flex-basis` 閾値を使えば、**1つのコンポーネントで自動的にレイアウトが切り替わる**。

**パターン**:
```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 縦gap 横gap;
}
.fixed-item {
  flex: 0 0 auto;          /* 固定幅（日付、アイコン等） */
}
.flexible-item {
  flex: 1 1 <閾値>px;      /* 閾値未満で折り返し */
}
```

**閾値の決め方**: 可変アイテムのコンテンツが「読みにくい」と感じる直前の幅を閾値にする。内容が固定のセクション（アクセス情報、ニュース等）では確実に機能する。

**実証結果 — Top Info セクション**:

| 要素 | 閾値 | PC(1440) | Tablet(768) | Mobile(375) |
|------|------|----------|-------------|-------------|
| newsCol + accessCol | — | 横並び | 縦積み | 縦積み |
| accessInfo + accessMethod | 250px | 横(264px) | 横(320px) | 縦(311px<250×2) |
| newsDate + newsTitle | 250px | 横(536px) | 横(548px) | 縦(187px<250px) |

**accessInfoRow の下揃え**: `align-items: flex-end` により、右側の交通情報が下に揃い、直下の地図フレームとの整列ラインが保たれる。

**.pen デザインでの表現**:
- .pen には flex-wrap がないため、各幅で手動レイアウトが必要
- PC/Tablet: 横並びフレーム（gap + fill_container）
- Mobile: layout: "vertical" に変更
- ただし CSS 実装では1コンポーネントで済むことを前提にデザイン

**適用可能性の判定基準**:
1. 同じコンテンツが3幅で「横 ↔ 縦」切り替えだけで済むか
2. 固定アイテム（日付、アイコン等）と可変アイテム（テキスト等）に分離できるか
3. 閾値を決められる程度にコンテンツ長が予測可能か

**効率への影響**: コード実装時に PC/Tablet/Mobile 別コンポーネントが不要になり、1コンポーネント + CSS で対応可能。保守コスト 1/3。

**実証結果 — ImgText/TextImg セクション（大型コンポーネント）**:

6コンポーネント（3幅×2タイプ）→ 2コンポーネントへの統合を検証。

| Property | PC(1440) | Tablet(768) | Mobile(375) | 手法 |
|----------|----------|-------------|-------------|------|
| Layout | 横並び ✓ | 横並び ✓ | 縦積み ✓ | flex-wrap (breakpoint不要) |
| Title | 38px ✓ | 26px ✓ | 24px ✓ | clamp() 2区間 + 1 breakpoint |
| Desc | 15px ✓ | 13px ✓ | 13px ✓ | clamp() 1区間 |
| Image幅 | 810px ~✓ | 430px (+50) | 375px ✓ | flex: 1.3 1 380px |
| Padding | 79px ~✓ | 42×38 ~✓ | 40×24 △ | clamp() |

**非線形タイポグラフィの解法**: 設計値が非線形（24→26→38）の場合、clamp() 1本では中間点がズレる。breakpoint で2区間に分離すれば完全一致:
```css
/* Mobile→Tablet: 24→26 */
font-size: clamp(24px, 0.51vw + 22.09px, 26px);
@media (min-width: 769px) {
  /* Tablet→PC: 26→38 */
  font-size: clamp(26px, 1.79vw + 12.25px, 38px);
}
```

**flex-grow 比率による画像サイズ制御**: `flex: 1.3 1 380px`（画像）と `flex: 1 1 300px`（コンテンツ）で、PC時に画像が約56%を占める。Tablet時は+50pxのズレが発生するが、視覚的には許容範囲。完全一致が必要なら `@media (max-width: 1024px) { flex-grow: 0 }` を1行追加。

### 12. レスポンシブ統合の事前検証フレームワーク

**背景**: .pen デザインでは各幅を個別に設計するが、CSS実装時に本当に1コンポーネントで3幅に対応できるかは、実際にブラウザで検証しないとわからない。デザイン完了後・コード実装前に検証することで、手戻りを防ぐ。

**検証フレームワーク（4ステップ）**:

#### Step 1: デザイン差分の抽出
.pen の各幅コンポーネントを `batch_get` で読み取り、プロパティの差分表を作成:
```
| Property  | PC      | Tablet    | Mobile     |
|-----------|---------|-----------|------------|
| layout    | 横      | 横        | 縦         | ← flex-wrap で自動化
| title     | 38px    | 26px      | 24px       | ← clamp() or breakpoint
| padding   | 80px    | 40px 36px | 48px 24px  | ← clamp() or breakpoint
```

#### Step 2: CSS戦略の決定
差分の種類に応じて手法を選択:
| 差分パターン | CSS手法 | breakpoint要否 |
|-------------|---------|---------------|
| 横↔縦切替 | `flex-wrap: wrap` + `flex-basis` | 不要 |
| 線形スケーリング（A→B→C 単調） | `clamp(min, slope*vw + intercept, max)` | 不要 |
| 非線形スケーリング（A→B→C 非単調） | `clamp()` × 2区間 + 1 breakpoint | 1つ |
| 不連続な切替 | media query | 必要 |

**clamp() の係数計算式**:
```
slope = (target_max - target_min) / (viewport_max - viewport_min)
intercept = target_min - slope * viewport_min
→ clamp(target_min, slope*100vw + intercept, target_max)

例: 26px(768px) → 38px(1440px)
slope = (38-26)/(1440-768) = 0.01786
intercept = 26 - 0.01786*768 = 12.25
→ clamp(26px, 1.79vw + 12.25px, 38px)
```

#### Step 3: テストHTML作成 & ブラウザ検証
1. **テストHTML**: 実際のコンテンツ + flex-wrap + clamp() で単一コンポーネントを作成
2. **ローカルサーバー**: `python3 -m http.server` で配信
3. **Playwright MCP**: 3幅（1440/768/375）にリサイズしてスクリーンショット取得
4. **computed style 取得**: `browser_evaluate` で実測値を取得し設計値と比較

#### Step 4: .pen スクリーンショットとの目視比較
- `get_screenshot` で .pen の各幅コンポーネントを取得
- ブラウザスクリーンショットと並べて比較
- 許容範囲内なら統合採用、差異が大きければ breakpoint 追加 or 統合断念

**判定基準**:
- レイアウト切替: 完全一致が必須
- タイポグラフィ: ±1px は許容
- パディング/ギャップ: ±5px は許容
- 画像比率: ±10% は許容（視覚的に違和感なければ）

**適用タイミング**: デザインFIX後、コード実装前。特に以下の場合に有効:
- 3幅で「横↔縦」の切替があるセクション
- 同一構造でタイポグラフィだけ異なるセクション
- コンポーネント数の削減を検討している場合

### 13. モバイル縦積み時の視覚順序統一ルール

**問題**: PC/Tablet では ImgText（画像左・テキスト右）と TextImg（テキスト左・画像右）を交互に配置してリズムを作る。しかしモバイルで縦積みになると、ImgText は「画像→テキスト」、TextImg は「テキスト→画像」となり、**同種セクションなのに順序が逆転**して違和感が生じる。

**ルール**: モバイル縦積み時、同種セクションは**常に画像→テキストの順序で統一**する。

**理由**: 読み手は上から順にスクロールする。先行セクション（Room）で「画像→テキスト」のパターンを認識した直後に、同種セクション（Onsen）で「テキスト→画像」が来ると、無意識に違和感を覚える。順序の統一がスクロール体験のリズムを保つ。

**.pen での実装**:
- Mobile TextImg コンポーネントの子要素の順序を変更
- `M("imageNodeId", "componentId", 0)` で画像を先頭に移動
- PC/Tablet の TextImg は別コンポーネントなので影響なし

**CSS での実装**:
```css
/* PC/Tablet: テキスト(左) → 画像(右) — HTML順そのまま */
/* Mobile: flex-wrap で縦積みになった時、画像を上に移動 */
.textimg .section-image {
  order: 0; /* デフォルト */
}
@media (max-width: 680px) {
  .textimg .section-image {
    order: -1; /* 画像を上に */
  }
}
```

**適用範囲**: このルールは ImgText/TextImg に限らず、横並び→縦積みに変わる全てのセクションに適用。「先行セクションで確立された視覚パターンを後続セクションで崩さない」が原則。

### 14. Tailwind v4 のレスポンシブクラスが効かない問題

**問題**: `md:flex-row`, `md:w-[58.6%]`, `md:shrink-0` 等のTailwind v4レスポンシブクラスを使用したが、1440px viewportでもクラスが適用されず、flex-column（縦積み）のままだった。

**原因（推定）**: Tailwind v4 のJIT/AOTコンパイラがクラス名を検出できなかった可能性。動的に生成されたクラス名（`md:w-[58.6%]`等の任意値）がスキャン対象から漏れた、またはTailwind v4の設定で`md:`プレフィックスのbreakpoint定義に問題があった。

**影響**: Room/Onsenセクションが縦並びになり、各アイテムが全幅(1425px)を取り、セクション全体が異常に高くなった。ユーザーから「右側の高さおかしい」と報告。

**解決策**: Tailwindレスポンシブクラスの代わりに**インラインstyle**を使用:
```tsx
// ❌ NG: Tailwind v4 レスポンシブ（効かなかった）
<section className="flex w-full flex-col overflow-hidden md:flex-row">
  <div className="relative min-h-[400px] w-full overflow-hidden md:w-[58.6%] md:shrink-0">

// ✅ OK: インラインstyle（確実に動く）
<section className="flex w-full overflow-hidden" style={{ flexDirection: 'row' }}>
  <div className="relative overflow-hidden" style={{ width: '58.6%', flexShrink: 0, minHeight: 400 }}>
```

**ルール**:
- PC固定幅の実装ではインラインstyleが最も確実
- Tailwindレスポンシブを使う場合は、必ずブラウザで適用確認してから次に進む
- レスポンシブ対応が必要な場合はCSS media queryをグローバルCSSに書くか、Tailwind設定を検証する

### 15. flex-wrap + flex-grow では正確な比率制御ができない

**問題**: `flex: '1.414 1 400px'`（画像）と `flex: '1 1 400px'`（テキスト）で白銀比(1:√2 = 1:1.414)を実現しようとしたが、実測値は 1.069（ほぼ50:50）だった。

**根本原因**: flex-grow は「余剰スペース」のみに対して比率で分配する。flex-basisが大きいほど、余剰スペースの割合が小さくなり、比率の効果が薄れる。

**計算例（1440px幅、flex-basis 各400px）**:
```
余剰 = 1440 - 400 - 400 = 640px
画像 = 400 + 640 × 1.414/2.414 = 400 + 375 = 775px (53.8%)
テキスト = 400 + 640 × 1/2.414 = 400 + 265 = 665px (46.2%)
比率 = 1.165（目標1.414に対して大幅に不足）
```

**一般法則**: flex-grow比率が正確に反映されるのは flex-basis: 0 の場合のみ。ただし flex-basis: 0 だと flex-wrap による折り返しが発生しない（0+0は常にコンテナ内に収まる）。

**解決策**: `width` パーセント + `flexShrink: 0` で明示的に比率を指定:
```tsx
// ✅ 正確な白銀比 (58.6% : 41.4% = 1.414)
<div style={{ width: '58.6%', flexShrink: 0 }}>  {/* 画像 */}
<div style={{ flex: 1 }}>                         {/* テキスト */}
```

**実測結果**: 比率 1.415 = √2。完全一致。

**ルール**: 特定の比率を正確に実現したい場合は flex-grow に頼らず、widthパーセント指定を使う。flex-wrap による自動折り返しが必要なら、media query と組み合わせる。

### 16. .pen の stroke プロパティはオブジェクト形式

**問題**: `U("PxTEE", {"stroke": "#D4C5A0", "strokeThickness": 1})` でフレームの枠線を設定したが、枠線が表示されなかった。

**原因**: .pen ファイルの stroke はフラットなプロパティではなく、**オブジェクト形式**:
```json
// ❌ NG: フラットプロパティ（効かない）
{"stroke": "#D4C5A0", "strokeThickness": 1}

// ✅ OK: オブジェクト形式
{"stroke": {"fill": "#D4C5A0", "thickness": 1}}
```

**発見方法**: 既存の正常なノード（QwmQ4 等）を `batch_get` で読み取り、stroke の実際のデータ構造を確認した。

**ルール**: .pen のプロパティ形式が不明な場合、同種の既存ノードを `batch_get` で読み取って正しい形式を確認してから更新する。推測でプロパティ名を使わない。

### 17. 色変更は「関連色セット」を一括で変更する（詰めの甘さ防止）

**問題**: ボタンの枠線色を `#D4C5A088` → `#D4C5A0` に変更したが、テキスト色 `#faf8f3` を `#D4C5A0` に変え忘れた。結果、枠線とテキストの色がミスマッチした。

**根本原因**: 1つのプロパティだけ見て変更し、「この色が変わるなら他にも影響するプロパティがあるはず」という連鎖確認をしなかった。

**ルール — 色変更チェックリスト**:
ボタンやUIコンポーネントの色を変更するとき、以下を **必ずセットで確認**する:
1. **fill（背景色）** — ボタン背景
2. **stroke.fill（枠線色）** — ボーダー
3. **テキストの fill（文字色）** — 子テキストノード
4. **アイコンの fill** — 子アイコンノード

**実装手順**:
1. 変更対象ノードとその子ノードを `batch_get` で全て読む
2. 色に関するプロパティ（fill, stroke.fill, 子のfill）を全てリストアップ
3. 変更後に「枠線色 = テキスト色」「背景色とテキスト色のコントラスト」を目視確認
4. `get_screenshot` で変更結果を必ず確認

**一般化**: 1つのプロパティを変更するときは、**そのプロパティと意味的に関連する他のプロパティ**を必ず洗い出し、セットで変更する。「1箇所変えたら終わり」ではなく「この変更の影響範囲は？」と自問する。

### 18. .pen 変更後は必ず get_screenshot で目視確認する

**問題**: .pen のプロパティを更新した後、スクリーンショットで確認せずに次の作業に進んだ。結果、枠線が消えていた・テキストが縦書きになっていた等の視覚的問題を見逃した。

**ルール**: .pen ファイルに対する **すべての batch_design 呼び出しの後**に、変更したノード（またはその親）の `get_screenshot` を必ず撮る。視覚的に問題がないことを確認してから次に進む。

**チェック項目**:
1. テキストが正しい方向（横書き）で表示されているか
2. 枠線・背景色が意図通りか
3. 要素が見えているか（0x0 にクラッシュしていないか）
4. レイアウトが崩れていないか

### 19. .pen が正、コードが従 — 依存関係を常に意識する

**問題**: コードで先にUI変更（フッターにボタン枠追加）を行い、.pen を後追いで更新しようとした。結果、.pen とコードが乖離し、どちらが正しい状態か不明になった。

**ルール**:
1. **デザイン変更は常に .pen → コードの順序**で行う
2. コードだけで試したい場合は「仮実装」と明示し、.pen への反映を先に行ってからコードを確定させる
3. .pen とコードの差異が生じたら、.pen を正として コードを .pen に合わせる

### 20. .pen テキストノードの textGrowth と width の組み合わせに注意

**問題**: `textGrowth: "fixed-width"` + `width: "fit_content(0)"` でテキストが1文字ずつ改行され縦書きに見えた。

**原因**: `fit_content(0)` は「最小幅0pxでコンテンツに合わせる」という意味だが、`fixed-width` と組み合わさると幅0に固定され、全文字が改行される。

**解決策**: テキストノードを R() で新規作成し、width/textGrowth を設定せずデフォルトに任せた。

**ルール**: .pen テキストノードで表示が崩れた場合:
1. まず既存の正常なノードを `batch_get` で読み、正しいプロパティ構成を確認する
2. プロパティの修正で直らない場合は `R()` で新規テキストノードに置き換える
3. `textGrowth` と `width` の組み合わせは、同種の正常ノードを参考に設定する

### 22. 横並び子要素を持つ親フレームには必ず `layout: "horizontal"` を明示する

**問題**: PC ImgText / TextImg コンポーネント（TqnvP, mMzpU）の親フレームに `layout` プロパティが未設定だった。子要素が `width: "fill_container"` / `height: "fill_container"` を使っているのに、親のレイアウトモードが暗黙的（"none"）のまま。レイアウトエンジンが位置を推定して配置するため、一見正しく見えるが、`fill_container` の高さ計算が不安定になり、右下に隙間が発生するケースがあった。

**根本原因**: `fill_container` は親フレームのレイアウトモード（horizontal/vertical）に依存して計算される。`layout: "none"`（デフォルト）では flex レイアウトが無効で、`fill_container` の解釈がエンジンの暗黙推定に頼る。これが特定の条件下でサイズ不整合を引き起こす。

**ルール**: 子要素を横並びで配置し、かつ `fill_container` を使う場合、親フレームに必ず `layout: "horizontal"` を設定すること。縦並びなら `layout: "vertical"`。`layout` 未設定のまま `fill_container` を使うのは禁止。

**影響を受けたコンポーネント**:
- PC ImgText Section (TqnvP) ← `layout: "horizontal"` 追加
- PC TextImg Section (mMzpU) ← `layout: "horizontal"` 追加
- Tablet ImgText Section (8mxcj) ← `layout: "horizontal"` 追加
- Tablet TextImg Section (cdmD5) ← `layout: "horizontal"` 追加

**チェック方法**: `batch_get` で readDepth=1 で親フレームを読み取り、`layout` プロパティが存在するか確認。子に `fill_container` があるのに親に `layout` がなければ違反。

### 21. CLAUDE.md はプロジェクトルート直下に配置する

**問題**: `CLAUDE.md` を `.claude/CLAUDE.md` に配置したが、Claude Code がコンテキストに読み込まなかった。

**原因**: Claude Code は以下のパスから CLAUDE.md を読む:
- `~/.claude/CLAUDE.md`（ユーザーグローバル）
- プロジェクトのgitルート直下の `CLAUDE.md`
- gitルートから上位の各ディレクトリの `CLAUDE.md`

`.claude/` サブディレクトリ内の CLAUDE.md は読み込み対象外。

**ルール**: プロジェクト固有の指示は必ず **プロジェクトルート直下** に `CLAUDE.md` を配置する。`.claude/CLAUDE.md` ではない。

### 23. 読ませるテキストは最低 14px

**問題**: ボタンコンポーネント（Primary / Outline）の `fontSize` が 13px だった。13px は UI のキャプション・注釈レベルで、ボタンラベルとしてはやや小さく、可読性・タップ安心感を損なう。

**ルール**:
- **ボタンラベル・本文テキスト・見出し**: 最低 14px
- **キャプション・注釈・フッターの著作権表示**: 12px まで許容
- 13px は原則使わない（14px にするか 12px にするか二者択一）

**根拠**: 14px は Web/モバイルの本文サイズ下限として広く認知されている。旅館サイトのように落ち着いた雰囲気では、小さすぎるフォントは「安っぽさ」につながる。

**チェック方法**: `batch_get` でテキストノードを取得し、`fontSize < 14` のものがボタンラベル・本文に該当しないか確認。キャプション系以外で 13px 以下は修正対象。

### 24. reusable コンポーネントは必ず ref インスタンスとして配置する

**問題**: `reusable: true` のコンポーネントを34個定義していたが、`type: "ref"` のインスタンスが **0件**。全ての使用箇所が独立フレームのコピーとして存在しており、コンポーネント変更が伝播しなかった。Button Outline の色を変更しても、CTA や Hero のボタンに反映されない状態。

**根本原因**: `batch_design` の `I()` (Insert) でコンポーネントを配置する際、`type: "ref"` ではなく通常のフレームとしてコピーしていた。あるいは `C()` (Copy) で複製した結果、ref ではなく独立フレームになった。

**ルール**:
- 既存の reusable コンポーネントを使用する際は、必ず `type: "ref"` + `ref: "<component-id>"` で配置する
- テキスト等の変更は `descendants` オーバーライドで行う
- `C()` で reusable ノードをコピーすると ref になるが、非 reusable ノードのコピーは独立フレームになる点に注意

**正しい配置方法**:
```javascript
// ✅ ref として配置（コンポーネント変更が自動伝播）
btn=I("parentId", {"type": "ref", "ref": "er4M4", "descendants": {"cR2MW": {"content": "予約する"}}})

// ❌ 独立フレームとして配置（変更が伝播しない）
btn=I("parentId", {"type": "frame", "fill": "#8B6914", ...})
```

**チェック方法**: 各ページフレームを `batch_get` で `readDepth: 2` で読み、子ノードに `type: "ref"` が存在するか目視確認する。

**注意**: `batch_get` の `patterns: [{"type": "ref"}]` 検索は ref ノードを返さない（2025年時点の既知制限）。ref の存在確認にはパターン検索ではなく、親ノードの直接読み取りが必要。

### 25. batch_get の patterns 検索は ref ノードを検出できない

**問題**: 60件のボタンを ref に置換した後、`batch_get` で `patterns: [{"type": "ref"}]` を実行したところ **0件** が返った。実際にはページ内に多数の ref ノードが存在するにもかかわらず。

**原因**: `batch_get` のパターンマッチングは `type: "ref"` のノードをフィルタリングしない。これは Pencil MCP の現行仕様の制限。

**回避策**: ref の存在確認は、親ノードを `nodeIds` で直接指定して `readDepth: 1-2` で読み取り、子ノードの `type` / `ref` プロパティを目視確認する。

### 26. 1回しか使わないセクションでも reusable 化する価値がある

**問題**: Cuisine Section と Stay Section がコンポーネント化（`reusable: true`）されておらず、PC TOP ページ内にインラインフレームとして直接配置されていた。Tablet/Mobile でも同様のセクションが独立コピーとして存在する可能性が高い。

**ルール**: たとえ1ページでしか使わないセクションでも、3サイズ（PC/Tablet/Mobile）で同じコンセプトのセクションが存在するなら、各サイズ版を reusable コンポーネント化すべき。理由:
1. **デザイントークンの一括変更**: 色・フォント変更がコンポーネント定義1箇所で済む
2. **構造の見通し**: Components フレームを見れば全セクションの一覧が把握できる
3. **将来の再利用**: 他ページへの展開時にref 1行で済む
4. **コード実装との対応**: コンポーネント = React コンポーネントの1対1対応が明確

### 27. 横並びレイアウトで fill_container の循環依存を避ける

**問題**: Tablet ImgText / TextImg コンポーネントで、画像側 `height: "fill_container"` + コンテンツ側 `height: auto` の組み合わせにより、左右で1px の高さ差が発生。画像=295px、コンテンツ=294px。

**根本原因**: `fill_container` は親の高さに依存し、親の高さは子の最大値で決まる。コンテンツ側が auto (294) → 親=294 → 画像 fill_container=294 のはずが、レイアウトエンジンの丸め誤差で画像が295になる循環依存。

**解法**: 両方の子に `height: "fill_container"` を設定し、親の高さはコンテンツ量で決定させる。または PC パターン（片方に固定 height、もう片方に fill_container）を採用。

**パターン比較**:
- ✅ **PC パターン**: 画像=`height: 560`（固定）, コンテンツ=`fill_container` → 確定的、0px差
- ❌ **Tablet 旧パターン**: 画像=`fill_container`, コンテンツ=auto → 循環依存、1px差
- ✅ **Tablet 修正後**: 画像=`fill_container`, コンテンツ=`fill_container` → 両方一致、0px差

**チェック方法**: `snapshot_layout` で横並びセクションの子要素の高さを比較。1px でも差があればこの問題を疑う。

### 28. `reusable` は `I()` でのみ設定可能、`U()` / `C()` では不可

**問題**: 既存ノードを `U()` (Update) で `reusable: true` に変更しようとしても、サイレントに無視される。`C()` (Copy) でコピー時に指定しても同様。

**発見**: `I()` (Insert) で **新規作成時** には `reusable: true` が有効。過去の34コンポーネントもすべて `I()` 経由で作成されたもの。

**既存インラインセクションを reusable 化する手順**:
1. `I()` で viewport 別サブフレーム内に reusable な空フレームを作成（元と同じプロパティ）
2. `M()` で元セクションの子ノードを新フレームに移動
3. `D()` で元セクションを削除（⚠️ `R()` は使わない — Lesson #29 参照）
4. `I()` でページ内の正しい位置に ref ノードを挿入

```javascript
// Step 1: viewport別サブフレーム内に reusable フレーム作成
comp=I("pcSectionsFrame", {type: "frame", reusable: true, name: "PC Cuisine", layout: "vertical", ...})
// Step 2: 子を移動
M("childId1", comp)
M("childId2", comp)
// Step 3: 元ノードを削除
D("originalId")
// Step 4: ページに ref を挿入（位置を指定）
ref=I("pageFrame", {type: "ref", ref: comp})
M(ref, "pageFrame", 4)  // 正しい位置に移動
```

**操作別 reusable 対応**:
| 操作 | reusable 設定 |
|------|-------------|
| `I()` Insert | ✅ 新規作成時に有効 |
| `U()` Update | ❌ サイレント無視 |
| `C()` Copy | ❌ サイレント無視 |
| `R()` Replace | ❌ ref に置換可能だが親から脱落する（Lesson #29） |

### 29. ref ノードは batch_get / snapshot_layout で不可視 — セクションレベルでは使わない

**問題**: `type: "ref"` ノードをページ内に配置すると、以下の問題が発生する:

1. `batch_get` でページの children を取得しても ref ノードが返されない
2. `snapshot_layout` でもレイアウトの children に含まれない
3. `R()` で既存ノードを ref に置換すると、新ノードが元の親から脱落し孤立する

**発見経緯**: 12セクションを `I()+M()+R()` でコンポーネント化した際:
- R() で作成した ref ノードが全てページの children から消失
- M() で ref をページに移動しても batch_get/snapshot_layout で不可視
- get_screenshot ではレンダリングされるが、レイアウト計算への参加が不確実

**結論**: セクションレベルのコンポーネントには ref を使わない。ボタン等の小さなUIパーツには ref が有効だが、ページ構造を構成するセクションには reusable 定義をそのまま配置する。

**ルール**:

```javascript
// ❌ 誤り: ref はセクションレベルでは不可視になる
comp=I("components", {type: "frame", reusable: true, ...})
M(children, comp)
R("original", {type: "ref", ref: comp})  // 親から脱落 + 不可視

// ✅ 正しい: reusable 定義をページ内に直接配置
comp=I("pageFrame", {type: "frame", reusable: true, ...})
M(children, comp)
D("original")
```

### 30. セクションの reusable 化はページ内で直接行う

**問題**: Components フレームにコンポーネント定義を置き、ページに ref で参照する方式は、ref の不可視問題（Lesson #29）と Components フレームの幅問題（3400px に広がる）の両方で破綻する。

**ルール**: セクションの reusable 化は、ページ内のノードを直接 `I()` で reusable フレームとして作成する。

```
PC (1440px) ページ
├── PC Header           ← reusable: true（ページ内に直接配置）
├── PC Hero Section     ← reusable: true（ページ内に直接配置）
├── PC Concept Section  ← reusable: true
├── PC Cuisine Section  ← reusable: true
├── PC ImgText Section  ← reusable: true
├── ...
└── PC Footer           ← reusable: true
```

**メリット**:
- batch_get / snapshot_layout で全ノードが可視
- レイアウト計算に確実に参加
- 既存パターン（Header, CTA, Footer）と統一

**注意**: この方式ではコンポーネント変更がページ間で自動伝播しない。各ページ（PC/Tablet/Mobile）は独立したコンポーネント定義を持つ。これはレスポンシブデザインでは自然（各 viewport で異なるプロパティを持つため）。

### 31. コンポーネント化の手順テンプレート（事故防止版）

**目的**: Lesson #28-30 の知見を統合した、事故を起こさないコンポーネント化手順。

**手順**（ページ内直接配置方式）:

1. **I()**: ページ内の正しい位置に `reusable: true` のフレームを作成（元ノードと同じプロパティ）
2. **M()**: 元ノードの children を新コンポーネントに移動
3. **D()**: 元ノードを削除
4. **batch_get**: ページの children に新ノードが含まれることを確認
5. **get_screenshot**: 目視確認

```javascript
// 例: PC Cuisine Section をコンポーネント化
comp=I("RlMpE", {type: "frame", reusable: true, name: "PC Cuisine Section",
  layout: "vertical", gap: 60, padding: [100,80], alignItems: "center",
  fill: {type: "image", ...}, width: "fill_container"})
M(comp, "RlMpE", 4)  // 正しい位置に移動
M("child1", comp)
M("child2", comp)
D("originalId")
```

**チェックリスト**:

- [ ] `batch_get` でページの children にコンポーネントが含まれるか
- [ ] `snapshot_layout` でレイアウトに参加しているか
- [ ] スクリーンショットで正しく描画されているか
- [ ] `R()` や ref を使っていないか（セクションレベル）
- [ ] **他のページからの ref 参照が壊れていないか**（Lesson #32）

### 32. コンポーネントのノード ID を変更すると、他ページの ref が壊れる（影響範囲の事前調査必須）

**問題**: Components フレーム内のセクションは、複数の独立したページから ref で参照されている場合がある。`R()` でノードを置換すると元の ID が消失し、参照元の ref が全て壊れる。

**発見経緯**: 12セクションをコンポーネント化する際、Components 内の PC/Tablet/Mobile ページ (RlMpE/IQzum/DwO7w) のセクションノードに対して `R()` を実行。しかし、別のフレーム群：
- 「月瀬庵 トップページ」(1QcCy) — PC 実ページ
- 「トップページ Tablet」(Z0XnQ)
- 「トップページ Mobile」(HauwG)

がそれらのセクションを ref で参照していた。R() で元ノードの ID が消えたため、これらのページから Hero/Cuisine/Stay/Info セクションが消失した。

**ルール**: ノード ID を変更する操作（R(), D()）の前に、必ず**そのノードを ref で参照している他のページがないか**を調査する。

**調査手順**:
```javascript
// 操作対象ノード ID を全ページでグレップ
// batch_get の patterns では ref が検出できない（Lesson #25）ため、
// 全ページの children を readDepth:1 で確認し、ref.ref プロパティを照合する

// 例: ノード "CpYJn" を変更する前に
batch_get({nodeIds: ["1QcCy", "Z0XnQ", "HauwG", ...], readDepth: 1})
// → children 内の ref ノードの "ref" プロパティに "CpYJn" があるか確認
```

**影響範囲マップ（この .pen ファイル）**:
```
Components フレーム (cRCB2, layout: "horizontal", gap: 40)
├── Parts (fUIrU)      ← ボタン・ラベル等の小パーツ
├── PC (RlMpE)         ← コンポーネント定義元
├── Tablet (IQzum)     ← コンポーネント定義元
└── Mobile (DwO7w)     ← コンポーネント定義元

参照先ページ群（ref でセクションを参照）:
├── 月瀬庵 トップページ (1QcCy) → RlMpE のセクションを ref
├── トップページ Tablet (Z0XnQ) → IQzum のセクションを ref
├── トップページ Mobile (HauwG) → DwO7w のセクションを ref
├── 客室ページ, 温泉ページ, ... → CTA/Footer を ref
└── 各サブページ Tablet/Mobile → 同様
```

**教訓**: `.pen` ファイルは「1つのノード = 複数ページから参照」という構造。ノード ID の変更は全参照先に波及する。変更前に影響範囲を必ず確認すること。

### 33. 横並びセクションの高さ制御: テキスト主導 vs 画像主導

**問題**: Tablet ImgText/TextImg セクション（8mxcj, cdmD5）で、画像に固定 `height: 360` を設定してダミーテキスト（短い）で検証 → 正常に動作。しかしダミーを実テキスト（長い）に入替えたところ、テキスト側が453〜479pxの高さを必要とし、360pxの制約内に収まらずオーバーフロー。ラベルがy=-6.5（上にはみ出し）、リンクがy=346.5+20=366.5（下にはみ出し）。

**根本原因**: 画像に固定heightを設定 → 親セクションの高さが画像で確定 → テキスト側 `height: fill_container` が画像の高さに拘束される → テキスト量が増えても親が伸びない → オーバーフロー。

**2つの正しいパターン**:

| パターン | テキスト側 | 画像側 | 親の高さ決定 | 適用条件 |
|---------|----------|-------|------------|---------|
| **テキスト主導** | height: auto（削除） | height: fill_container | テキスト量で決まる | テキスト量が可変・長文 |
| **画像主導** | height: fill_container | height: 固定値 | 画像の高さで決まる | テキスト量が確定・短い |

**テキスト主導パターンの動作**:
```
テキスト量 → コンテンツ intrinsic height (~453px)
  → 親セクション height = max(子のintrinsic) = 453px
    → 画像 fill_container = 453px
```
循環依存なし。テキストが長くなっても自動的に親が伸び、画像も追従する。

**画像主導パターン（PC方式）の制約**:
- PC では画像 height=560 で余裕があるため成立
- Tablet では画像 height=360 → テキスト量増加で破綻
- 固定heightはテキスト量に対して十分な余裕が必要

**ルール**: テキスト量が可変（ダミー→実テキスト、多言語対応等）のセクションでは**テキスト主導パターン**を使う。画像主導は「テキスト量が確定し、変わらない場合」のみ。

**注意**: 以前「両方 fill_container」で崩壊した（Lesson 27）のは、テキスト側も fill_container だったから。テキスト側の height を**削除（auto）**にすれば、テキストの intrinsic サイズで高さが確定するため循環しない。

### 34. テキスト入替え後はレイアウト再検証必須

**問題**: ダミーテキスト「説明文がここに入ります。」(1行) → 実テキスト(7行) に入替え後、`snapshot_layout` も `get_screenshot` も実行せずに次の作業に進んだ。結果、オーバーフローを見逃した。

**根本原因**: テキスト変更は `batch_design` のプロパティ更新と同じレイアウト影響を持つ。特に `textGrowth: "fixed-width"` のテキストは行数が変わると高さが大幅に変化する。ダミーテキストの行数と実テキストの行数が異なることは**必然**。

**ルール**: ダミーテキスト → 実テキストの入替え後は、Lesson 18（batch_design後の目視確認）と同等の検証を行う:
1. `snapshot_layout(problemsOnly=true)` でクリップ・オーバーフローを検出
2. `get_screenshot` で目視確認
3. 特に `fixed-width` テキストが含まれるセクションは必ず確認

**一般化**: 「見た目に影響しない」と思える変更（テキスト内容の変更）でも、レイアウトに重大な影響を与えうる。**変更の種類に関わらず、変更後は必ず検証する**。

### 35. .pen レイアウト制約とコード統合の2レイヤー分離

**問題**: PC Info Section で accessInfo(400px) と accessMethod(~300px) を横並びにしたが、親フレーム幅が560pxしかなく128pxにクリップされた。一方 Tablet では親がフル幅(~672px)で横並びが最適。1コンポーネントで対応できるか？

**分析**:
- .pen の `layout` は `"horizontal"` / `"vertical"` の2値のみ。CSS の `flex-wrap` は存在しない
- つまり .pen 上では「幅に応じて自動切替」は不可能
- しかしコード実装では CSS `flex-wrap` + `min-width` で1コンポーネント化が可能

**2レイヤー分離の原則**:
| レイヤー | 役割 | 手法 |
|---------|------|------|
| **.pen デザイン** | 各ビューポートでの「意図」を正確に表現 | 各サイズで最適な layout を個別設定 |
| **コード実装** | 実装を統合し管理コンポーネント数を最小化 | CSS flex-wrap / clamp() / media query |

**具体例（Info Section accessInfoRow）**:
```
.pen: PC=vertical, Tablet=horizontal(alignItems:end), Mobile=vertical
Code: flex-wrap + min-width:300px → 672px以上で横並び、560px以下で折り返し
```

**ルール**: .pen と コードは異なるレイヤーで最適化する。.pen で表現できない動的レイアウトは、各ビューポートで最終形を表現し、コードで flex-wrap 等を使って統合する。「コンポーネント統合原則」の実践パターン。

### 36. テキスト→コンポーネント置換時の幅増加に注意（特にMobile）

**問題**: フッターの「ご予約」テキスト(29px) を Button Ghost コンポーネント(91px = テキスト43px + padding 24px×2) に置換したところ、Mobile フッターナビ行（利用可能幅327px）で合計365pxとなりオーバーフロー。footerNav1 が x:-19 にクリップされた。

**根本原因**: テキストノードには padding がないが、ボタンコンポーネントには padding がある。この差分(+62px)が、幅の厳しいMobileビューポートで致命的なオーバーフローを引き起こした。PC/Tabletでは幅に余裕があるため問題にならなかった。

**修正**: Mobile のみボタン padding を縮小 (`[8,24]` → `[6,16]`) + gap を縮小 (`12` → `6`) で収容。

**ルール**:
1. テキスト→コンポーネント置換は「幅の増加」を伴う。特に padding 付きコンポーネントは要注意
2. 置換後は **全ビューポート** で `snapshot_layout(problemsOnly=true)` を実行。PCで問題なくてもMobileで溢れる
3. 幅が厳しいビューポートでは、コンポーネントの padding/gap のオーバーライドで対応する
4. 置換前に概算チェック: `既存要素幅の合計 + 新コンポーネントの幅増分 < 親の利用可能幅` を確認

**一般化**: コンポーネント化は「見た目の向上」だけでなく「幅の消費増加」を伴う。特にMobile等の制約ビューポートでは、コンポーネント置換=レイアウト変更と認識し、必ず全サイズで検証する。

### 37. .pen 固定幅カラムは CSS では flex: 1 比例配分に変換する

**問題**: .pen で `accessCol: width: 560` + `newsCol: fill_container` の2カラムレイアウトを CSS `flex-1` + `maxWidth: 560` に変換したところ、1024px〜1200px のPC幅で ACCESS カラム(560px固定)が支配的になり、NEWS カラムが270pxまで圧迫された。モバイル幅のカラムが横に並んでいるような不自然な表示になった。

**根本原因**: .pen の固定幅値（560px）は 1440px キャンバス基準。1440px では 560px は全体の約39%で自然だが、1050px では約60%を占めてバランスが崩れる。`maxWidth` で持ち込むと、ビューポート幅に関係なく片方が優先される。

**修正**: 両カラムとも `flex: 1` にして均等配分。
- Before: accessCol → `style={{ maxWidth: 560 }}`
- After: accessCol → `className="flex-1"`

**ルール**:
1. .pen の固定幅は「そのキャンバス幅でのピクセル値」であり、そのまま CSS に持ち込まない
2. `fill_container` + 固定幅の兄弟レイアウトは、CSS では両方 `flex: 1` にする
3. 特定の比率が必要なら `flex: 2` / `flex: 3` 等の比率指定を使う
4. `maxWidth` を使うのはコンテンツ幅の上限を設ける場合のみ（カラム幅制御には不適）

**一般化**: .pen → CSS 変換時、固定値のコピーではなく「意図」を読み取る。560px/880px = 約39:61 の比率意図なら、flex 比率で表現する。

### 38. ImgText 横並びセクションは Tablet 以下で段階的に縦積みに崩す

**問題**: PC で画像+テキスト横並びのセクション（客室 Facilities Section 等）を Tablet にそのまま持ち込むと、画像が幅を取りすぎてテキスト領域が窮屈になる。特に内部に2カラムリスト（col1/col2）を持つ場合は致命的。

**修正**:
- Tablet: 外側を縦積みに（画像上 + テキスト下）。内部カラムは横並びのまま（Tablet幅なら余裕あり）
- Mobile: 内部カラムも縦積みに（375pxで2カラム横並びは窮屈）

**ルール**: 横並び要素は、ビューポートが狭くなるにつれて**外側から内側の順**に縦積みに崩す。
1. PC: 画像+テキスト横並び / 内部カラム横並び
2. Tablet: 画像+テキスト**縦積み** / 内部カラム横並び
3. Mobile: 画像+テキスト縦積み / 内部カラムも**縦積み**

**一般化**: レスポンシブの崩し順序は「外側→内側」。一度にすべてを縦積みにするのではなく、ビューポートに応じて段階的に崩す。

### 39. Lesson #1 の再発防止 — テキストノード作成・変更時のチェックリスト義務化

**問題**: Lesson #1（textGrowth: "fixed-width" + width: "fill_container" 必須）は初期に学んだにも関わらず、客室ページ Facilities Section で18箇所のテキストノードが未設定のまま放置され、縦軸方向にテキストがオーバーフローした。既知のルールが適用されなかった再発ケース。

**再発の根本原因**:
1. **新規セクション作成時のチェック漏れ**: Facilities Section はトップページにない新規セクションだったため、既存コンポーネントからのコピーではなく新規作成。新規作成時にLesson #1 のルールが適用されなかった
2. **3ビューポート分の確認負荷**: PC/Tablet/Mobile の3フレームにまたがる18テキストノードを一括で確認する仕組みがなかった
3. **目視だけでは検出困難**: clip: true の親に隠れてオーバーフローが見えないケースがある

**再発防止ルール（義務化）**:

#### A. テキストノード新規作成時
`I()` でテキストノードを作成する場合、以下を**必ず**含める:
```javascript
I("parent", {type: "text", content: "...", textGrowth: "fixed-width", width: "fill_container", ...})
```
例外: 意図的に fit_content が必要なケース（アイコンラベル等の1行固定テキスト）のみ。

#### B. セクション作成完了時
新規セクション作成後、全テキストノードを `batch_get` で一括取得し、textGrowth/width の設定を確認:
```javascript
batch_get({nodeIds: ["sectionId"], readDepth: 5})
// → 全 type: "text" ノードの textGrowth と width を確認
// → "fixed-width" + "fill_container" でないものはリストアップ → 修正
```

#### C. 既存セクション変更時
テキスト内容を変更した場合も、Lesson #34（テキスト入替え後の再検証）と合わせて textGrowth/width を確認する。

**チェック観点まとめ**:
| タイミング | チェック内容 |
|-----------|-------------|
| テキストノード新規作成 | I() に textGrowth + width を含めたか |
| セクション作成完了 | 全テキストノードの textGrowth/width を batch_get で確認 |
| テキスト内容変更 | snapshot_layout + get_screenshot で再検証 |
| デザインレビュー | clip: true の親内テキストを重点確認 |

**教訓**: 「知っているルール」と「毎回適用するルール」は別物。再発を防ぐにはチェックリストとして手順に組み込み、義務化する必要がある。

### 40. fill_container を持つ子の親には必ず layout を設定する（Lesson #9/#22 再発）

**問題**: 客室ページ Facilities Section の facLabel フレーム（3ビューポート分）に `layout` が未設定。子テキストノードに `width: "fill_container"` + `textGrowth: "fixed-width"` を設定済みだったが、親の layout が "none" のため fill_container が機能せず、テキストが **1px 幅 × 150px 高**に崩壊。"FACILITIES" が縦書きのように見え、セクション全体が縦に不自然に長くなった。

**根本原因**: Lesson #9（fill_container の子は親に layout が必要）と Lesson #22（横並び子要素の親に layout:"horizontal" 必須）の再発。小さなラベルフレーム（facLabel = facLine + facLabelText の2要素横並び）でも例外ではない。

**修正**:
```javascript
// 全3ビューポートの facLabel に layout + width を追加
U("oajFo", {"layout": "horizontal", "width": "fill_container"})  // PC
U("E0Ajj", {"layout": "horizontal", "width": "fill_container"})  // Tablet
U("CgCwZ", {"layout": "horizontal", "width": "fill_container"})  // Mobile
```

**ルール — セクション作成完了時のレイアウトチェック強化**:

Lesson #39 のチェックリストに追加:
| タイミング | チェック内容 |
|-----------|-------------|
| フレーム作成時 | 子に fill_container がある → 親に layout を設定したか |
| セクション作成完了 | snapshot_layout で width:1 のテキストノードがないか確認 |

**診断方法**: `snapshot_layout` で `width: 1` かつ `height > 15` のテキストノードを探す。これは fill_container が機能していない典型的な症状。

**一般化**: `fill_container` + `textGrowth: "fixed-width"` は必要条件だが十分条件ではない。**親の layout 設定**が揃って初めて機能する。テキスト崩壊のチェックは「テキストノード自身のプロパティ」だけでなく「親フレームの layout」も含めて3点セットで確認する。

### 41. セクション間余白の意味的階層ルール

**問題**: 客室ページ Facilities Section（画像+テキスト縦積み）で、テキスト部分の下方向余白がセクション間の区切りとして不十分。画像とテキストはセットなので上方向の密着は正しいが、次セクション（relatedWrap）との間にも同程度の距離しかなく、セクション境界が曖昧だった。

**根本原因**: テキスト部分の `padding` が「セクション内のコンテンツ余白」と「セクション間の余白」を兼ねている。均等paddingでは境界方向の余白が不足する。

#### セクション端タイプの分類

| タイプ | 説明 | 自己提供余白 | 例 |
|-------|------|-----------|-----|
| **Edge-Image** | 画像が端まで来る | 0px | Hero端, ImgText端, CTA端, Facilities上端 |
| **Edge-Content** | padding付きコンテンツ | padding値 | Concept端, Cuisine端, Info端 |
| **Edge-Composite** | 複合セクションのテキスト側端 | テキスト部padding | Facilities下端 |

#### 境界パターンと目標間隔

| パターン | PC | Tablet | Mobile |
|---------|-----|--------|--------|
| Image ↔ Image | 0px | 0px | 0px |
| Image ↔ Content | 80-120 | 60-80 | 60 |
| Content ↔ Content | 160-240 | 120-160 | 96-120 |
| **Composite ↔ Content** | **80-100** | **80-112** | **80-100** |

#### ルール: Edge-Composite は非対称 padding 必須

複合セクション（画像+テキスト縦積み）のテキスト部分は:
- **画像側 padding**: セクション内余白として適切な値（32-48px）
- **境界側 padding**: そのVPの標準セクションpadding以上（60-80px）

これにより「画像とテキストのセット感」と「次セクションとの明確な区切り」を両立する。

**修正例（Facilities Section facContent）**:
| VP | 修正前 | 修正後 | 結果gap (+ relatedWrap top 40) |
|----|-------|-------|------|
| Mobile | padding: 32 | [32, 32, **60**, 32] | 60+40 = **100px** ✓ |
| Tablet | padding: 48 | [48, 48, **72**, 48] | 72+40 = **112px** ✓ |
| PC | padding: 60 | 変更なし | 60+40 = **100px** ✓ |

**チェック方法**: `snapshot_layout` で隣接セクションの y 座標差を確認し、目標間隔テーブルと照合する。

**一般化**: セクション間の余白は「意味的な関連性」で決まる。セットの要素間は密着、独立セクション間は標準間隔以上。paddingが二重責任を負う場合は非対称paddingで明示的に分離する。

### 42. 新ページ作成時は共通コンポーネントを ref で配置する（インラインコピー禁止）

**問題**: 客室ページ PC 版で Header / CTA / Footer がインラインフレームとしてコピー配置されていた。コンポーネント変更が伝播せず、ページごとにバラバラの状態になるリスクがあった。Tablet/Mobile 版は ref で配置されていたが、PC 版だけ漏れていた。

**根本原因**: ページ作成時に「とりあえずコピーで配置」してコンポーネント化を後回しにした。また、3ビューポート間で作業品質にバラツキがあり、PC だけチェックが漏れた。

**ルール — 新ページ作成手順の義務化**:

1. **まず共通コンポーネントを ref で配置**:
   - Header: `{type: "ref", ref: "[VP] Header"}`
   - CTA: `{type: "ref", ref: "[VP] CTA"}`
   - Footer: `{type: "ref", ref: "[VP] Footer"}`
   - Breadcrumb: `{type: "ref", ref: "[VP] Breadcrumb"}`
   - Page Hero: `{type: "ref", ref: "[VP] Page Hero"}`

2. **固有セクションはページに直接 I() で作成後、Components フレームへ移動**:
   - I() で reusable フレーム作成 → Components/[VP] に配置
   - ページには ref で配置

3. **全3ビューポートを同時にチェック**:
   - `batch_get` で各ページの children を取得し、全セクションの type を確認
   - `type: "ref"` でないセクションはインラインコピーの疑い → 修正

**チェック方法**: ページの children を readDepth:0 で取得し、`type` が `"ref"` でないセクションがあれば即座にコンポーネント化する。

**一般化**: コンポーネント化は「後でやる」ではなく「最初からやる」。特に Header/CTA/Footer のような全ページ共通部品は例外なく ref で配置する。

### 43. 完了宣言前に全トップレベルノードを列挙・監査する

**問題**: 「全8ページ完了」と報告したが、実際にはデザインファイルに13ページ（39フレーム）が存在していた。お知らせ一覧/詳細、よくあるご質問、プライバシーポリシー、特定商取引法の5ページが見落とされていた。

**根本原因**: ページ一覧を CLAUDE.local.md の記載（8ページ）のみで判断し、実際の .pen ファイルのトップレベルノードを列挙しなかった。

**ルール**:
- コンポーネント化の完了前に、必ず `batch_get()` でドキュメントのトップレベルノードを列挙する
- CLAUDE.local.md やドキュメントの記載ではなく、実際のファイル内容を正とする
- 完了宣言後に監査サブエージェントで全ページフレームを自動チェックする
- 「全部完了」の報告は監査結果（39/39 PASS等）を添えて行う

### 44. reusable プロパティは I() 作成時にのみ設定可能

**問題**: 既存フレームに `U("nodeId", {reusable: true})` を実行しても、成功メッセージが返るが実際には設定されない。C() でコピーしても ref にならずインラインコピーになる。

**根本原因**: `reusable` は U()（Update）では変更できない読み取り専用的なプロパティ。I()（Insert）の作成時にのみ設定可能。

**解決手法**:
1. I() で `reusable: true` 付きの新フレームを作成
2. M() で旧フレームの子ノードを新フレームに移動
3. D() で旧フレームを削除
4. C() で新 reusable フレームをコピー → `type: "ref"` のインスタンスが正しく作成される

**注意**: R()（Replace）や I() で `type: "ref"` を指定しても、参照先が reusable でない場合は `type: "frame"` に展開される。

### 45. CSS変数で背景画像を参照してはいけない

**問題**: `backgroundImage: 'var(--experience-concept-bg)'` のように CSS 変数で背景画像パスを参照するコードが、変数未定義のため画像が表示されない。

**根本原因**: 背景画像パスの CSS 変数がどの CSS ファイルにも定義されていなかった。他のページでは直接 `url(/images/...)` を使っている。

**ルール**: 背景画像は必ず直接 `url(/images/filename.png)` で指定する。CSS 変数化しない。

### 46. design/images/ がマスター画像ストア

**事実**: .pen ファイル作成時に G() オペレーションで生成された画像は `design/images/generated-*.png` として保存される。コード実装時はここから `public/images/` にリネームコピーする。

**ルール**: 画像が見つからない場合、まず `design/images/` を確認する。

### 47. .pen に存在しないデータをコードに追加してはいけない（SSOT違反）

**問題**: KaisekiMenuSection に9品あったが .pen には6品しかなく、3品は AI が勝手に追加したデータだった。

**ルール**: .pen が SSOT。コンテンツデータ（メニュー項目、客室リスト等）は .pen の内容のみ使用する。

### 48. Unsplash stock 画像はダウンロードが必要

**問題**: .pen の G() で `"stock"` タイプで取得した画像は外部 Unsplash URL として保存される（ローカルファイルではない）。

**ルール**: `batch_get` で画像 URL が `https://images.unsplash.com/...` の場合、curl でダウンロードして `public/images/` に保存する。

### 49. 並列サブエージェントは globals.css でマージコンフリクトを起こす

**問題**: 全サブエージェントが同じ `globals.css` に CSS import を追加するため、マージ時にコンフリクトが発生する。

**対策**: globals.css への import 追加は最後にオーケストレーターがまとめて行う。または各ページの CSS を page.tsx 側で import する。

### 50. サブエージェントがセクションを丸ごと実装し忘れることがある

**問題**: rooms ページで vacancyWrap と Facilities セクション、onsen ページで OnsenGuide セクションが未実装だったが、CSS 変数とレイアウトクラスは作成済みだった。

**根本原因**: サブエージェントが CSS 変数を先に定義したが、対応するコンポーネントの作成を忘れた。page.tsx への import も漏れた。

**ルール**: 実装後に .pen の全セクション ID を page.tsx の全コンポーネントと突合する構造監査を必ず行う。

### 51. Hero の title/subtitle は .pen SSOT に合わせる

**問題**: 全7サブページの Hero タイトルが簡潔なページ名（「客室」「温泉」等）で実装されたが、.pen では詩的なタイトル（「全八室の離れ」「湖を望む湯処」等）+ subtitle が定義されていた。

**ルール**: PageHero の title と subtitle は必ず .pen の heroTitle/heroSub テキストから取得する。Breadcrumb の label は簡潔な名前でよい（ナビゲーション用途のため）。

### 52. サブエージェントのハルシネーション検証

**問題**: 並列サブエージェントが実装した WaterQualitySection のデータが .pen SSOT と完全に異なっていた（泉質名、pH値、温度、効能の項目数・内容すべて間違い）。構造も3項目flex + 別立て効能セクションという設計と異なる形だった。

**教訓**:
- サブエージェントが生成したデータは必ず .pen SSOT と突き合わせて検証する
- 特に固有名詞（温泉名、泉質名）や数値（温度、pH）はハルシネーションリスクが高い
- 構造（カード数、レイアウト方向、分離セクションの有無）も検証が必要

### 53. .pen の alignItems/textAlign を見落とさない

**問題**: WaterQualitySection を .pen に合わせて書き直した際、カード内テキストの中央揃え（alignItems: "center", justifyContent: "center", textAlign: "center"）を見落とし、左揃えで実装してしまった。

**教訓**:
- .pen のレイアウトプロパティ確認時、alignItems/justifyContent/textAlign も必ずチェックする
- 特にカードコンポーネントは content alignment が重要

### 54. 画像重複チェックの重要性

**問題**: DiningRoomSection が IngredientsSection と同じ `cuisine-ingredients-main.png` を使用していた。サブエージェントが実装時に正しい画像をダウンロード・マッピングしなかった。.pen SSOT ではそれぞれ異なる画像（IngredientsSection=generated画像、DiningRoomSection=Unsplash stock画像）を使用するはずだった。

**教訓**:
- 各セクションの画像が異なるものを使っているか、実装後に Grep 等で重複チェックする
- `grep -r "cuisine-.*\.png" src/components/cuisine/` のように画像参照を一覧確認
- Unsplash外部URL画像は自動で public/images に保存されないため、手動DLが必要（Lesson 49 の再発パターン）
- サブエージェント実装時は画像DL漏れを検出するため、公開後に画像URL一覧をスクリーンショット・grep で確認する

### 55. icon_font ノードのプレースホルダー問題は全ページ共通

**問題**: サブエージェントが .pen の `icon_font` ノードを空divプレースホルダーとして実装するパターンが、客室ページ（PR #263）とお料理ページ（PR #272）で繰り返し発生。AllergyInfoSection では lucide-react アイコン（Utensils, Leaf, Baby）が未実装で空divのままだった。

**教訓**:
- 全ページの `icon_font` ノードを一括チェックする（`grep -r "aria-label.*アイコン" src/` で空divを検出）
- サブエージェント実装後、アイコン実装漏れを grep で確認するステップを追加
- lucide-react のアイコン名は .pen の `icon` プロパティから取得可能
- icon_font ノードは必ずコンポーネント化対象として明示的に指示し、単なる空divプレースホルダーにしないこと

**一般化**: コンポーネント間で似た命名の画像がある場合、実装後に全画像参照を一覧化し、各セクションが正しい画像を参照していることを必ず確認する。

### Lesson 56: モバイルタイムラインのCSS order パターン

**問題**: タイムラインのモバイル表示がflex-direction:column + border-left hackで実装されていたが、.penは水平3カラム（time|dot|content）を維持していた

**原因**: サブエージェントが.penモバイル仕様を確認せず「モバイル=縦積み」と推測した

**解決**: CSS order プロパティで DOM順序に関係なく視覚的な列順序を統一。even items のDOM順（info→center→time）を order:1,2,3 で time→center→info に修正

**教訓**: モバイルでも.penを確認すること。「モバイル=単純な縦積み」は危険な前提
