# 月瀬庵（TSUKISE-AN）ウェブサイト 実装仕様書

> **最終更新**: 2026-02-22
> **デザインファイル**: `design/月瀬庵デザイン.pen`
> **対象**: コーディングAI向け実装ガイドライン

---

## 目次

1. [サイトコンセプト・デザイン方針](#1-サイトコンセプトデザイン方針)
2. [カスタマージャーニー](#2-カスタマージャーニー)
3. [技術スタック](#3-技術スタック)
4. [ページ構成・URL設計](#4-ページ構成url設計)
5. [ナビゲーション設計](#5-ナビゲーション設計)
6. [全ボタン・リンク遷移先マッピング](#6-全ボタンリンク遷先マッピング)
7. [各ページ詳細仕様](#7-各ページ詳細仕様)
8. [デザインシステム](#8-デザインシステム)
9. [バックエンド連携仕様](#9-バックエンド連携仕様)
10. [SEO・メタデータ設計](#10-seoメタデータ設計)
11. [レスポンシブ設計方針](#11-レスポンシブ設計方針)
12. [実装優先順位](#12-実装優先順位)

---

## 1. サイトコンセプト・デザイン方針

### 1.1 施設概要

| 項目 | 内容 |
|------|------|
| **施設名** | 月瀬庵（つきせあん） |
| **英語名** | TSUKISE-AN |
| **所在地** | 〒250-0522 神奈川県足柄下郡箱根町元箱根138 |
| **客室数** | 全8室（離れ形式） |
| **特徴** | 芦ノ湖畔の高級温泉旅館、明治28年（1895年）創業 |
| **温泉** | 単純硫黄泉（姥子温泉）、各室に露天風呂付き |
| **料理** | ミシュラン二つ星、月替わり懐石 |
| **電話** | 0460-83-XXXX（実番号に差し替え必要） |
| **FAX** | 0460-83-XXXX（実番号に差し替え必要） |

### 1.2 ブランドコンセプト

**キャッチコピー**: 「湖と月、そして静寂。」
**サブコピー**: 「芦ノ湖の湖面に映る月を眺める、全八室の離れ宿」
**コンセプト文**: 「百三十年、変わらぬもてなし。」

**ブランドの方向性**:
- **和の上質感**: 派手さではなく、静寂と品格
- **自然との調和**: 芦ノ湖、月、季節の移ろい
- **伝統と洗練**: 明治から続く歴史と現代的な快適さの融合
- **少数の特別感**: 全8室限定の希少性

### 1.3 デザイン方針

**ビジュアルスタイル**: 和モダン・ラグジュアリー

- 余白を活かした品格のあるレイアウト
- 写真を大きく見せ、施設の魅力を直感的に伝える
- テキストは最小限、行間・字間にゆとりを持たせる
- アニメーションは控えめで上品（フェードイン程度）
- 縦書きの装飾的な見出しラベル（Section Label）で和の趣を演出

---

## 2. カスタマージャーニー

### 2.1 ユーザー像

| ペルソナ | 特徴 |
|----------|------|
| **主要ターゲット** | 30-60代の高所得層カップル・夫婦 |
| **サブターゲット** | 記念日利用のファミリー、外国人旅行者 |
| **流入経路** | Google検索「箱根 高級旅館」「芦ノ湖 温泉」、OTA（一休.com等）、SNS |

### 2.2 ユーザーフロー

```
[検索/SNS/口コミ]
    │
    ▼
┌─────────────────────────────────┐
│  トップページ（/）              │
│  ヒーロー → コンセプト →        │
│  客室 → 温泉 → お料理 →        │
│  過ごし方 → お知らせ・アクセス  │
│  → CTA                         │
└─────────────────────────────────┘
    │                    │
    ▼                    ▼
┌──────────┐    ┌──────────────────┐
│各詳細ページ│    │  予約ページ（/reservation）│
│/rooms     │    │  Cal.com ウィジェット      │
│/onsen     │    └──────────────────┘
│/cuisine   │              ▲
│/experience│              │
│/access    │───「ご予約」ボタン
└──────────┘
    │
    ▼
┌──────────────────┐    ┌────────────────────┐
│お知らせ（/news）  │    │  お問い合わせ（/contact）│
│記事一覧 → 記事詳細│    │  Web3Forms フォーム      │
└──────────────────┘    └────────────────────┘
    │
    ▼
┌──────────────────┐
│  FAQ（/faq）      │
│  よくあるご質問   │
└──────────────────┘
```

### 2.3 コンバージョンポイント

| 優先度 | アクション | 動線 |
|--------|-----------|------|
| **最重要** | オンライン予約 | 全ページの「ご予約」ボタン → `/reservation`（Cal.com） |
| **重要** | 電話予約 | CTA セクション・お問い合わせページの電話番号 |
| **補助** | お問い合わせ | `/contact` のWeb3Formsフォーム |

---

## 3. 技術スタック

### 3.1 フロントエンド（既存）

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Next.js** | 15.3.1 | フレームワーク（App Router） |
| **React** | 19.0.0 | UIライブラリ |
| **TypeScript** | 5 | 型安全性 |
| **Liftkit** | 0.2.0 | カスタムデザインシステム（CSS） |
| **Radix UI** | - | NavigationMenu, Separator |
| **lucide-react** | 0.511.0 | アイコン |
| **class-variance-authority** | 0.7.1 | コンポーネントバリアント |
| **clsx** | 2.1.1 | className結合 |

### 3.2 バックエンド連携（新規導入）

| サービス | 用途 | 使用ページ |
|----------|------|-----------|
| **microCMS** | お知らせ記事管理、FAQ管理 | `/news`, `/news/[slug]`, `/faq` |
| **Web3Forms** | お問い合わせフォーム | `/contact` |
| **Cal.com** | 予約カレンダーウィジェット | `/reservation` |

### 3.3 環境変数（`.env.local`に追加が必要）

```bash
# microCMS
MICROCMS_SERVICE_DOMAIN=tsukise-an     # microCMSのサービスドメイン
MICROCMS_API_KEY=xxxxxxxx              # microCMSのAPIキー

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx  # Web3FormsのAccess Key

# Cal.com
NEXT_PUBLIC_CALCOM_USERNAME=tsukise-an     # Cal.comのユーザー名
NEXT_PUBLIC_CALCOM_EVENT_SLUG=stay         # Cal.comのイベントスラッグ
```

### 3.4 追加パッケージ（インストール必要）

```bash
npm install microcms-js-sdk    # microCMS SDK
npm install @calcom/embed-react  # Cal.com Reactウィジェット
# Web3Formsはfetch APIのみで実装可能（SDK不要）
```

---

## 4. ページ構成・URL設計

### 4.1 ルーティング構造

**現状**: SPA（シングルページ）+ ハッシュリンク（`#rooms`, `#onsen` 等）
**変更後**: Next.js App Router による**マルチページ構成**

```
src/app/
├── page.tsx                    # / （トップページ）
├── layout.tsx                  # ルートレイアウト（既存）
├── rooms/
│   └── page.tsx                # /rooms （客室ページ）
├── onsen/
│   └── page.tsx                # /onsen （温泉ページ）
├── cuisine/
│   └── page.tsx                # /cuisine （お料理ページ）
├── experience/
│   └── page.tsx                # /experience （過ごし方ページ）
├── access/
│   └── page.tsx                # /access （アクセスページ）
├── reservation/
│   └── page.tsx                # /reservation （予約ページ）
├── contact/
│   └── page.tsx                # /contact （お問い合わせページ）
├── news/
│   ├── page.tsx                # /news （お知らせ一覧）
│   └── [slug]/
│       └── page.tsx            # /news/[slug] （お知らせ詳細）
├── faq/
│   └── page.tsx                # /faq （よくあるご質問）
├── privacy/
│   └── page.tsx                # /privacy （プライバシーポリシー）
├── legal/
│   └── page.tsx                # /legal （特定商取引法に基づく表記）
└── sitemap/
    └── page.tsx                # /sitemap （サイトマップ）
```

### 4.2 全ページ一覧

| ページ名 | URL | .pen ID | バックエンド | ステータス |
|----------|-----|---------|-------------|-----------|
| トップページ | `/` | `1QcCy` | なし（静的） | 既存（改修必要） |
| 客室 | `/rooms` | `HN9dn` | なし（静的） | 新規作成 |
| 温泉 | `/onsen` | `Ghbhb` | なし（静的） | 新規作成 |
| お料理 | `/cuisine` | `SeRNo` | なし（静的） | 新規作成 |
| 過ごし方 | `/experience` | `DzrBF` | なし（静的） | 新規作成 |
| アクセス | `/access` | `BBsjr` | なし（静的） | 新規作成 |
| ご予約 | `/reservation` | `Xbfwp` | Cal.com | 新規作成 |
| お問い合わせ | `/contact` | `Kq0ek` | Web3Forms | 新規作成 |
| お知らせ一覧 | `/news` | `RxtFj` | microCMS | 新規作成 |
| お知らせ詳細 | `/news/[slug]` | `DL5lm` | microCMS | 新規作成 |
| よくあるご質問 | `/faq` | `oOBdV` | microCMS | 新規作成 |
| プライバシーポリシー | `/privacy` | `vCw0m` | なし（静的） | 新規作成 |
| 特定商取引法 | `/legal` | `Cx0nw` | なし（静的） | 新規作成 |
| サイトマップ | `/sitemap` | - | なし（静的） | 新規作成 |

### 4.3 トップページの再構成

**変更前**: 全セクションが1ページに統合（SPA）
**変更後**: トップページはサマリー表示 + 各詳細ページへのリンク

トップページの各セクションは**概要のみ**を表示し、「客室を見る」「温泉を見る」等のリンクボタンで各詳細ページへ遷移させる。

**トップページに残すセクション**:
1. HeroSection - そのまま維持
2. ConceptSection - そのまま維持
3. RoomSection（概要） - 「客室を見る →」ボタンで `/rooms` へ
4. OnsenSection（概要） - 「温泉を見る →」ボタンで `/onsen` へ
5. CuisineSection（概要） - 「お料理を見る →」ボタンで `/cuisine` へ
6. StaySection（概要） - 「過ごし方を見る →」ボタンで `/experience` へ
7. InfoSection（お知らせ + アクセス概要）
8. CTASection - 予約導線

---

## 5. ナビゲーション設計

### 5.1 ヘッダーナビゲーション（全ページ共通）

**現状**（要変更）:
```tsx
// 現在のHeader.tsx のナビゲーション（ハッシュリンク）
{ label: "客室", href: "#rooms" }
{ label: "温泉", href: "#onsen" }
{ label: "お料理", href: "#cuisine" }
{ label: "過ごし方", href: "#stay" }
{ label: "アクセス", href: "#access" }
// ＋「ご予約」ボタン
```

**変更後**:
```tsx
const navItems = [
  { label: "客室", href: "/rooms" },
  { label: "温泉", href: "/onsen" },
  { label: "お料理", href: "/cuisine" },
  { label: "過ごし方", href: "/experience" },
  { label: "アクセス", href: "/access" },
];

// ご予約ボタン（別枠・強調表示）
const reservationButton = { label: "ご予約", href: "/reservation" };
```

**ヘッダー仕様**:
- ロゴ: 「月」マーク + 縦線 + 「月瀬庵 TSUKISE-AN」→ クリックで `/` へ
- 5つのナビリンク（上記）
- 「ご予約」ボタン（ゴールド背景 `#8B6914`、白文字）
- スティッキーヘッダー（スクロール追従）
- モバイル時: ハンバーガーメニュー

### 5.2 フッターナビゲーション（全ページ共通）

```
【フッター構成】

[ブランドエリア]
  ロゴ: 月 | 月瀬庵
  住所: 〒250-0522 神奈川県足柄下郡箱根町元箱根138

[ページナビ（上段）]
  客室 → /rooms
  温泉 → /onsen
  お料理 → /cuisine
  過ごし方 → /experience
  アクセス → /access
  ご予約 → /reservation（ゴールド色で強調）

[ページナビ（下段）] ※実装時に追加
  お知らせ → /news
  よくあるご質問 → /faq
  お問い合わせ → /contact

[区切り線]

[リーガル・SNS]
  プライバシーポリシー → /privacy
  特定商取引法に基づく表記 → /legal
  サイトマップ → /sitemap

  [Instagram] [Facebook] [LINE] ← SNSアイコンリンク（外部URL）

[コピーライト]
  © 2026 月瀬庵 TSUKISE-AN. All Rights Reserved.
```

### 5.3 パンくずリスト

各詳細ページにはパンくずリストを設置する。

```
# 例: 客室ページ
ホーム > 客室

# 例: お知らせ詳細ページ
ホーム > お知らせ > 記事タイトル

# 例: FAQページ
ホーム > よくあるご質問
```

**パンくずの実装**:
- `ホーム` → `/`
- 各中間パス → 対応するページURL
- 最終要素はリンクなし（現在のページ）

---

## 6. 全ボタン・リンク遷移先マッピング

### 6.1 グローバル要素（全ページ共通）

| 要素 | テキスト | 遷移先 | 備考 |
|------|---------|--------|------|
| ヘッダーロゴ | 月 \| 月瀬庵 | `/` | トップへ戻る |
| ヘッダーナビ | 客室 | `/rooms` | |
| ヘッダーナビ | 温泉 | `/onsen` | |
| ヘッダーナビ | お料理 | `/cuisine` | |
| ヘッダーナビ | 過ごし方 | `/experience` | |
| ヘッダーナビ | アクセス | `/access` | |
| ヘッダーボタン | ご予約 | `/reservation` | ゴールドボタン |
| CTAボタン | オンライン予約 | `/reservation` | ゴールドボタン |
| CTAボタン | 0460-83-XXXX | `tel:046083XXXX` | 電話リンク |
| フッターナビ | 客室 | `/rooms` | |
| フッターナビ | 温泉 | `/onsen` | |
| フッターナビ | お料理 | `/cuisine` | |
| フッターナビ | 過ごし方 | `/experience` | |
| フッターナビ | アクセス | `/access` | |
| フッターナビ | ご予約 | `/reservation` | ゴールド色テキスト |
| フッターナビ（下段） | お知らせ | `/news` | 実装時追加 |
| フッターナビ（下段） | よくあるご質問 | `/faq` | 実装時追加 |
| フッターナビ（下段） | お問い合わせ | `/contact` | 実装時追加 |
| フッターリーガル | プライバシーポリシー | `/privacy` | |
| フッターリーガル | 特定商取引法に基づく表記 | `/legal` | |
| フッターリーガル | サイトマップ | `/sitemap` | |
| フッターSNS | Instagram | 外部URL（要設定） | 新規タブ |
| フッターSNS | Facebook | 外部URL（要設定） | 新規タブ |
| フッターSNS | LINE | 外部URL（要設定） | 新規タブ |

### 6.2 トップページ (`/`)

| 要素 | テキスト | 遷移先 | 備考 |
|------|---------|--------|------|
| ヒーローボタン | 宿を知る | `#concept`（ページ内スクロール） | アウトラインボタン |
| 客室セクションリンク | 客室を見る → | `/rooms` | arrowアイコン付き |
| 温泉セクションリンク | 温泉を見る → | `/onsen` | arrowアイコン付き |
| お料理セクションリンク | （なし - 写真グリッドのみ） | - | リンク追加推奨 |
| 過ごし方セクションリンク | （なし - タイムラインのみ） | - | リンク追加推奨 |
| お知らせリンク | 一覧を見る → | `/news` | |
| アクセスリンク | （マップ表示のみ） | - | |

### 6.3 客室ページ (`/rooms`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| ヒーローボタン | 予約する | `/reservation` |
| セクションリンク | 空室を確認する → | `/reservation` |
| 関連リンク | 温泉を見る → | `/onsen` |
| 関連リンク | お料理を見る → | `/cuisine` |

### 6.4 温泉ページ (`/onsen`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| ヒーローボタン | 予約する | `/reservation` |
| セクションリンク | 空室を確認する → | `/reservation` |
| 関連リンク | 客室を見る → | `/rooms` |

### 6.5 お料理ページ (`/cuisine`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| ヒーローボタン | 予約する | `/reservation` |
| セクションリンク | ご予約はこちら → | `/reservation` |
| 関連リンク | 過ごし方を見る → | `/experience` |

### 6.6 過ごし方ページ (`/experience`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| ヒーローボタン | 予約する | `/reservation` |
| タイムラインリンク（各項目） | 客室詳細 → | `/rooms` |
| タイムラインリンク（各項目） | お料理詳細 → | `/cuisine` |
| タイムラインリンク（各項目） | 温泉詳細 → | `/onsen` |
| 関連リンク | 客室を見る → | `/rooms` |
| 関連リンク | 温泉を見る → | `/onsen` |

### 6.7 アクセスページ (`/access`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| Googleマップリンク | Google Mapで見る | 外部URL（Google Maps） |
| 連絡先リンク | お問い合わせ → | `/contact` |

### 6.8 予約ページ (`/reservation`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| Cal.comウィジェット | （埋め込みカレンダー） | Cal.com内で完結 |
| 電話予約リンク | 0460-83-XXXX | `tel:046083XXXX` |
| 注意事項リンク | キャンセルポリシー | ページ内アンカー or モーダル |

### 6.9 お問い合わせページ (`/contact`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| フォーム送信ボタン | 送信する | Web3Forms API（POST） |
| 電話リンク | 0460-83-XXXX | `tel:046083XXXX` |
| FAXリンク | 0460-83-XXXX | - |
| メールリンク | info@tsukise-an.jp | `mailto:info@tsukise-an.jp` |
| LINEリンク | LINE公式アカウント | 外部URL |

### 6.10 お知らせ一覧ページ (`/news`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| カテゴリタブ | すべて / イベント / 季節のご案内 / お料理 / メディア掲載 / 施設情報 | `/news?category=xxx`（クエリパラメータ） |
| 記事カード | 記事タイトル | `/news/[slug]` |
| ページネーション | 1, 2, 3, < > | `/news?page=N` |

### 6.11 お知らせ詳細ページ (`/news/[slug]`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| パンくず | お知らせ | `/news` |
| 記事内CTAボタン | ご予約はこちら | `/reservation` |
| シェアボタン | X (Twitter) | 外部URL（シェアAPI） |
| シェアボタン | Facebook | 外部URL（シェアAPI） |
| シェアボタン | LINE | 外部URL（シェアAPI） |
| 関連記事カード | 記事タイトル | `/news/[slug]` |
| 一覧に戻る | お知らせ一覧に戻る | `/news` |

### 6.12 FAQページ (`/faq`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| お問い合わせボタン | お問い合わせ | `/contact` |
| 電話ボタン | 0460-83-XXXX | `tel:046083XXXX` |

### 6.13 特定商取引法ページ (`/legal`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| パンくず「ホーム」 | ホーム | `/` |

### 6.14 プライバシーポリシーページ (`/privacy`)

| 要素 | テキスト | 遷移先 |
|------|---------|--------|
| パンくず「ホーム」 | ホーム | `/` |
| 第8条 お問い合わせ窓口 | info@tsukise-an.jp | `mailto:info@tsukise-an.jp` |

---

## 7. 各ページ詳細仕様

### 7.1 トップページ (`/`) - .pen ID: `1QcCy`

**改修方針**: 現在のSPA構成を、マルチページ構成のトップページに変換

#### セクション構成

```
[Header] ← 全ページ共通コンポーネント
  │
  ├── HeroSection
  │   背景: hero.png（フルスクリーン）
  │   ロケーション: 「箱根 芦ノ湖畔」
  │   メインコピー: 「湖と月、そして静寂。」
  │   サブコピー: 「芦ノ湖の湖面に映る月を眺める、全八室の離れ宿」
  │   ボタン: 「宿を知る」→ #concept（ページ内スクロール）
  │   スクロールインジケーター: マウスアイコン + 「Scroll」
  │
  ├── ConceptSection (#concept)
  │   ラベル: 「月瀬庵について」(縦書き Section Label)
  │   英語: 「About」
  │   タイトル: 「百三十年、変わらぬもてなし。」
  │   本文: 創業明治二十八年...
  │
  ├── RoomSection (#rooms)
  │   ラベル: 「客室」
  │   英語: 「Rooms」
  │   画像: room.png（左配置）
  │   タイトル: 「全八室の離れ」
  │   本文: 客室の説明
  │   リンク: 「客室を見る →」→ /rooms
  │
  ├── OnsenSection (#onsen)
  │   ラベル: 「温泉」
  │   英語: 「Onsen」
  │   画像: onsen.png（右配置）
  │   タイトル: 「湖を望む湯処」
  │   本文: 温泉の説明
  │   リンク: 「温泉を見る →」→ /onsen
  │
  ├── CuisineSection (#cuisine)
  │   ラベル: 「お料理」
  │   英語: 「Cuisine」
  │   タイトル: 「旬を紡ぐ、月替わり懐石」
  │   サブテキスト: ミシュラン二つ星
  │   3カラムグリッド:
  │     [八寸] [焼物] [水菓子]
  │   ★リンク追加推奨: 「お料理を見る →」→ /cuisine
  │
  ├── StaySection (#stay)
  │   ラベル: 「過ごし方」
  │   英語: 「Experience」
  │   タイトル: 「月瀬庵での過ごし方」
  │   タイムライン:
  │     15:00 お出迎え → 17:00 庭園散策 → 18:30 夕食
  │     [翌朝]
  │     21:00 月見の湯 → 08:00 朝食 → 11:00 お見送り
  │   ★リンク追加推奨: 「過ごし方を見る →」→ /experience
  │
  ├── InfoSection (#access)
  │   2カラム:
  │   [お知らせ]                    [アクセス]
  │   - 2026.02.01 記事タイトル     住所
  │   - 2026.01.15 記事タイトル     電話・FAX
  │   - ...                        交通アクセス
  │   「一覧を見る →」→ /news       地図画像
  │
  ├── CTASection
  │   背景: cta.png + オーバーレイ
  │   コピー: 「あなたの特別な一日を、月瀬庵でお過ごしください。」
  │   サブ: 「ご予約・お問い合わせはお電話またはオンラインにて承ります」
  │   ボタン1: 「オンライン予約」→ /reservation
  │   ボタン2: 「0460-83-XXXX」→ tel:
  │
[Footer] ← 全ページ共通コンポーネント
```

### 7.2 客室ページ (`/rooms`) - .pen ID: `HN9dn`

```
[Header]
├── ヒーロー画像
│   ラベル: 「客室」(Hero Label)
│   英語: 「Rooms」
│   サブ: 「全八室、すべてが離れの贅沢」
│
├── イントロ
│   タイトル: 「湖と月に抱かれる、八つの離れ」
│   本文: 全室に専用露天風呂...
│   装飾線
│
├── 客室グリッドセクション（8室構成: 4行×2列）
│   各客室カード:
│   [画像] + [客室名 / 広さ / 説明 / 特徴タグ付き]
│   ※デザインでは「月見の間」「湖畔の間」「木漏れ日の間」等
│   リンク: 「空室を確認する →」→ /reservation
│
├── 客室設備セクション
│   アメニティ一覧
│   チェックイン/アウト時間
│
├── 関連ページリンク（Related Page Links コンポーネント）
│   「温泉を見る →」→ /onsen
│   「お料理を見る →」→ /cuisine
│
├── CTASection（共通）
[Footer]
```

### 7.3 温泉ページ (`/onsen`) - .pen ID: `Ghbhb`

```
[Header]
├── ヒーロー画像
│   ラベル: 「温泉」(Hero Label)
│   英語: 「Onsen」
│   サブ: 「姥子温泉の源泉を愉しむ」
│
├── イントロ
│   タイトル: 「湖を望む、癒しの湯」
│   本文: 箱根十七湯のひとつ...
│
├── 大浴場セクション
│   画像 + 説明
│   営業時間
│
├── 客室露天風呂セクション
│   画像 + 説明
│
├── 泉質情報セクション
│   泉質: 単純硫黄泉
│   効能一覧
│   源泉温度、pH値等
│
├── 入浴のご案内セクション（Icon Info Card × 4）
│   かけ湯 — ご入浴前にかけ湯をお願いいたします
│   タオル — 湯船にタオルを入れないようお願いいたします
│   飲酒禁止 — 飲酒後のご入浴はお控えください
│   撮影禁止 — 浴場内での撮影はご遠慮ください
│
├── 入浴マナーセクション
│
├── 関連ページリンク（Related Page Links コンポーネント）
│   「空室を確認する →」→ /reservation
│   「客室を見る →」→ /rooms
│
├── CTASection（共通）
[Footer]
```

### 7.4 お料理ページ (`/cuisine`) - .pen ID: `SeRNo`

```
[Header]
├── ヒーロー画像
│   ラベル: 「お料理」(Hero Label)
│   英語: 「Cuisine」
│   サブ: 「ミシュラン二つ星の懐石」
│
├── イントロ
│   タイトル: 「旬を紡ぐ、月替わりの懐石」
│   本文: 四季折々の食材...
│
├── 懐石コース紹介
│   各品の写真グリッド + 説明
│   八寸 / 焼物 / 水菓子 等
│
├── 朝食セクション
│   画像 + 説明
│
├── 食事処「月影」セクション
│   個室食事処の紹介
│   食事処の雰囲気・設備説明
│
├── アレルギー・特別対応セクション（3項目）
│   アレルギー対応 — 事前にお申し付けください
│   ベジタリアン対応 — ご相談承ります
│   お子様メニュー — お子様向けのお食事もご用意
│
├── 関連ページリンク（Related Page Links コンポーネント）
│   「ご予約はこちら →」→ /reservation
│   「過ごし方を見る →」→ /experience
│
├── CTASection（共通）
[Footer]
```

### 7.5 過ごし方ページ (`/experience`) - .pen ID: `DzrBF`

```
[Header]
├── ヒーロー画像
│   ラベル: 「過ごし方」(Hero Label)
│   英語: 「Experience」
│   サブ: 「心ほどける一日の流れ」
│
├── イントロ
│   タイトル: 「月瀬庵で過ごす、特別な一日」
│
├── タイムラインセクション（10項目 + 翌朝区切り）
│   15:00 チェックイン・お出迎え — 玄関にてお出迎え、お茶とお菓子のおもてなし
│   15:30 お部屋へご案内 — 離れの客室にて、ゆっくりとお寛ぎください
│   16:00 客室露天風呂 — プライベートな露天風呂で旅の疲れを癒して
│   17:00 庭園散策 — 四季折々の表情を見せる日本庭園を散策
│   18:30 夕食・懐石料理 — 食事処「月影」にて月替わりの懐石コースを
│   20:00 湯上がりラウンジ — ラウンジにてお飲み物とともにくつろぎのひととき
│   21:00 月見の湯（大浴場） — 芦ノ湖を望む大浴場・露天風呂で夜の湯を
│   [翌朝]
│   08:00 朝食 — 地元食材を使った和朝食で一日の始まりを
│   10:00 チェックアウト準備 — お荷物のご準備、お土産処のご案内
│   11:00 お見送り — 玄関にてお見送り
│
├── 季節のアクティビティ
│   春: 桜 / 夏: 蛍 / 秋: 紅葉 / 冬: 雪見
│
├── 関連ページリンク（Related Page Links コンポーネント）
│   「客室を見る →」→ /rooms
│   「温泉を見る →」→ /onsen
│
├── CTASection（共通）
[Footer]
```

### 7.6 アクセスページ (`/access`) - .pen ID: `BBsjr`

```
[Header]
├── ヒーロー画像
│   ラベル: 「アクセス」(Hero Label)
│   英語: 「Access」
│
├── 基本情報
│   施設名、住所、電話、FAX
│
├── 交通アクセス（4カード構成）
│   [お車でお越しの方]
│   東名高速 御殿場ICより約40分
│   無料駐車場あり（8台）
│
│   [電車でお越しの方]
│   箱根湯本駅よりバス30分「元箱根港」下車、送迎車5分
│   ※送迎要予約
│
│   [バスでお越しの方]
│   小田原駅より箱根登山バス
│
│   [送迎サービス]
│   元箱根港・箱根湯本駅より送迎あり（要予約）
│
├── 地図セクション
│   Google Maps埋め込み or 画像
│   「Google Mapで見る →」リンク（外部URL）
│
├── 送迎サービス
│   予約方法、時間帯
│
├── お問い合わせリンク
│   「お問い合わせ →」→ /contact
│
├── CTASection（共通）
[Footer]
```

### 7.7 予約ページ (`/reservation`) - .pen ID: `Xbfwp`

```
[Header]
├── ヒーロー画像
│   ラベル: 「ご予約」(Hero Label)
│   英語: 「Reservation」
│   サブ: 「特別な一日のご予約」
│
├── 宿泊プランセクション
│   スタンダードプラン — 基本の1泊2食付きプラン
│   記念日プラン — 特別な日のためのプラン（ケーキ・花束等）
│   連泊プラン — 2泊以上でお得な連泊割引プラン
│   各プランの料金目安
│
├── ご予約方法セクション
│   オンライン予約 — Cal.comウィジェットで24時間受付
│   お電話 — 0460-83-XXXX（受付 9:00-20:00）
│   旅行サイト — 一休.com等のOTAサイト経由
│
├── Cal.com ウィジェット埋め込み
│   客室選択（8室の選択肢）
│   日付選択（カレンダー）
│   人数選択
│   ※Cal.comの埋め込みウィジェットで実装
│
├── 予約に関する注意事項
│   チェックイン: 15:00 / チェックアウト: 11:00
│   キャンセルポリシー
│   お子様連れのご案内
│
├── CTASection（電話予約誘導）
[Footer]
```

**Cal.com 埋め込み実装**:
```tsx
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ReservationCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#8B6914" } },
      });
    })();
  }, []);

  return (
    <Cal
      calLink={`${process.env.NEXT_PUBLIC_CALCOM_USERNAME}/${process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
```

### 7.8 お問い合わせページ (`/contact`) - .pen ID: `Kq0ek`

```
[Header]
├── ヒーロー画像（温泉・旅館の外観）
│   タイトル: 「お問い合わせ」
│   英語: 「Contact」
│
├── イントロ
│   「お気軽にお問い合わせくださいませ。
│    ご予約・ご質問など、丁寧にお答えいたします。」
│
├── Web3Forms お問い合わせフォーム
│   ┌─────────────────────────────────┐
│   │ お名前（必須）     [テキスト入力]  │
│   │ メールアドレス（必須）[メール入力]  │
│   │ お電話番号        [電話番号入力]   │
│   │ お問い合わせ種別   [ドロップダウン]  │
│   │   - ご予約について                │
│   │   - 施設について                  │
│   │   - アクセスについて              │
│   │   - その他                       │
│   │ お問い合わせ内容（必須）[テキストエリア] │
│   │ □ プライバシーポリシーに同意する    │
│   │ [送信する]                        │
│   └─────────────────────────────────┘
│
├── その他のお問い合わせ方法
│   2カラム:
│   [お電話]                [FAX]
│   0460-83-XXXX           0460-83-XXXX
│   受付: 9:00-20:00
│
│   [メール]               [LINE]
│   info@tsukise-an.jp     LINE公式アカウント
│
├── CTASection（共通）
[Footer]
```

**デザイン仕様**:
- フォームパディング: 120px（左右）

**Web3Forms 実装**:
```tsx
// POST先: https://api.web3forms.com/submit
// Content-Type: application/json
// Body: {
//   access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
//   name: "お名前",
//   email: "メールアドレス",
//   phone: "電話番号",
//   subject: "お問い合わせ種別",
//   message: "お問い合わせ内容",
//   from_name: "月瀬庵ウェブサイト"
// }
```

### 7.9 お知らせ一覧ページ (`/news`) - .pen ID: `RxtFj`

```
[Header]
├── ヒーロー画像
│   タイトル: 「お知らせ」
│   英語: 「News」
│
├── パンくず: ホーム > お知らせ
│
├── カテゴリタブフィルタ
│   [すべて] [イベント] [季節のご案内] [お料理] [メディア掲載] [施設情報]
│   ※クエリパラメータで制御: /news?category=event
│
├── 記事カード一覧（5件/ページ）
│   各カード:
│   ┌──────────────────────────────┐
│   │ [画像]  日付 | カテゴリバッジ  │
│   │         記事タイトル          │
│   │         記事概要テキスト...    │
│   └──────────────────────────────┘
│   → クリックで /news/[slug] へ
│
├── ページネーション
│   < 1 2 3 >
│   ※クエリパラメータ: /news?page=2
│
├── CTASection（共通）
[Footer]
```

### 7.10 お知らせ詳細ページ (`/news/[slug]`) - .pen ID: `DL5lm`

```
[Header]
├── パンくず: ホーム > お知らせ > 記事タイトル
│
├── 記事ヘッダー
│   日付: 2026.02.01
│   カテゴリバッジ: 季節のご案内
│   タイトル: 「春の特別プラン「桜月夜」のご案内」
│
├── アイキャッチ画像（フル幅）
│
├── 記事本文（リッチテキスト）
│   ※microCMSのリッチエディタ出力をそのままレンダリング
│   見出し（h2, h3）、段落、画像、リスト等
│
├── 記事内CTA
│   ┌─────────────────────────────┐
│   │ ご予約受付中                 │
│   │ 「ご予約はこちら →」         │ → /reservation
│   └─────────────────────────────┘
│
├── シェアボタン
│   [X(Twitter)] [Facebook] [LINE]
│
├── 関連記事（3件）
│   横並びカード × 3
│   各カード → /news/[slug]
│
├── 「お知らせ一覧に戻る ←」→ /news
│
├── CTASection（共通）
[Footer]
```

### 7.11 よくあるご質問ページ (`/faq`) - .pen ID: `oOBdV`

```
[Header]
├── ヒーロー画像
│   タイトル: 「よくあるご質問」
│   英語: 「FAQ」
│
├── パンくず: ホーム > よくあるご質問
│
├── イントロ
│   「お客様からよくいただくご質問をまとめました。」
│
├── FAQ カテゴリ1: ご予約について（calendar アイコン）
│   Q. 予約はいつから可能ですか？
│   A. ご宿泊日の6ヶ月前より...
│   Q. キャンセル料はかかりますか？
│   Q. チェックイン・チェックアウトの時間は？
│
├── FAQ カテゴリ2: 温泉・お部屋について（waves アイコン）
│   Q. 客室の露天風呂は24時間利用できますか？
│   Q. 大浴場の営業時間を教えてください。
│   Q. お部屋にアメニティはありますか？
│
├── FAQ カテゴリ3: お食事について（utensils アイコン）
│   Q. アレルギー対応はしていただけますか？
│   Q. お食事の時間は選べますか？
│   Q. お子様向けのメニューはありますか？
│
├── FAQ カテゴリ4: アクセス・その他（map-pin アイコン）
│   Q. 送迎サービスはありますか？
│   Q. 駐車場はありますか？
│   Q. ペットの同伴は可能ですか？
│
├── お問い合わせボックス
│   「ご質問が見つからない場合は」
│   [お問い合わせ] → /contact
│   [0460-83-XXXX] → tel:
│
├── CTASection（共通）
[Footer]
```

**FAQ アコーディオン実装**:
- 質問クリックで回答を展開/折りたたみ
- chevron-down（展開時）/ chevron-right（折りたたみ時）で状態表示
- 背景色で区別: 質問行 `#F0EBE0`、回答 `#FAF8F3`（ボーダー `#D4C5A033`）
- カテゴリごとに背景色を交互: `#FAF8F3` / `#F0EBE0`

### 7.12 プライバシーポリシー (`/privacy`) - .pen ID: `vCw0m`

**ページ構成**:
```
[Header]
├── ヒーロー（和の雰囲気画像 + オーバーレイ #1A150E55）
│   ラベル: 「PRIVACY POLICY」(Cormorant Garamond)
│   タイトル: 「プライバシーポリシー」(42px)
├── パンくず: ホーム > プライバシーポリシー
├── ポリシー本文
│   ├── 導入文
│   ├── 第1条: 個人情報の定義
│   ├── 第2条: 個人情報の収集
│   ├── 第3条: 個人情報の利用目的
│   ├── 第4条: 個人情報の第三者提供
│   ├── 第5条: 個人情報の管理
│   ├── 第6条: Cookieの使用について
│   ├── 第7条: プライバシーポリシーの変更
│   └── 第8条: お問い合わせ窓口（住所・電話・メール）
├── 最終更新日
├── CTAセクション（共通）
[Footer]
```

**デザイン仕様**:
- ヒーロー高さ: 360px（他サブページと統一）
- 本文パディング: `[80, 200]`
- セクションタイトル: Noto Serif JP, 18px, weight 600, #2C2418
- 本文テキスト: Noto Sans JP, 14px, weight 300, #8B7D6B, lineHeight 2.0
- 背景テクスチャ: なし（実用ページのためベタ塗り #FAF8F3 を維持）

### 7.13 特定商取引法に基づく表記 (`/legal`) - .pen ID: `Cx0nw`

**ページ構成**:
```
[Header]
├── ヒーロー（和の雰囲気画像 + オーバーレイ #1A150E55）
│   ラベル: 「LEGAL NOTICE」(Cormorant Garamond)
│   タイトル: 「特定商取引法に基づく表記」(42px)
├── パンくず: ホーム > 特定商取引法に基づく表記
├── 表記本文（テーブル形式）
│   ├── 事業者名: 月瀬庵
│   ├── 代表者: （要設定）
│   ├── 所在地: 〒250-0522 神奈川県足柄下郡箱根町元箱根138
│   ├── 電話番号: 0460-83-XXXX
│   ├── メールアドレス: info@tsukise-an.jp
│   ├── 宿泊料金: 1泊2食付 55,000円〜
│   ├── 料金以外の必要料金: 入湯税 150円/人
│   ├── 支払方法: クレジットカード、現金
│   ├── 支払時期: チェックアウト時
│   ├── サービス提供時期: チェックイン〜チェックアウト
│   ├── キャンセルポリシー: 7日前30%、3日前50%、前日80%、当日100%
│   └── 特記事項: 返金不可の場合あり
├── 最終更新日
├── CTAセクション（共通）
[Footer]
```

**デザイン仕様**:
- ヒーロー高さ: 360px（他サブページと統一）
- 本文パディング: `[80, 200]`
- テーブルスタイル: 項目名 Noto Sans JP 14px weight 500 #2C2418 / 内容 Noto Sans JP 14px weight 300 #8B7D6B
- 行間区切り: `#D4C5A033` ボーダー
- 背景テクスチャ: なし（実用ページのためベタ塗り #FAF8F3 を維持）

---

## 8. デザインシステム

### 8.1 カラーパレット

```css
/* メインカラー */
--ryokan-bg:          #FAF8F3;   /* 背景（温かみのあるベージュ） */
--ryokan-dark:        #2C2418;   /* 見出しテキスト（深い茶色） */
--ryokan-gold:        #8B6914;   /* アクセントゴールド（CTA・強調） */
--ryokan-muted:       #4A4035;   /* 本文テキスト */
--ryokan-light-gold:  #D4C5A0;   /* 淡いゴールド（装飾線・サブ要素） */
--ryokan-subtle:      #8B7D6B;   /* 補助テキスト・アイコン */
--ryokan-secondary:   #6B5D4F;   /* フッターリーガルテキスト */
--ryokan-light-bg:    #EEEBE3;   /* セクション交互背景（明） */
--ryokan-light-bg-alt:#F0EBE0;   /* セクション交互背景（暗） */
--ryokan-darkest:     #1A150E;   /* フッター背景 */
--ryokan-soft-line:   #D4C5A055; /* 区切り線（半透明） */

/* テキストカラー on dark背景 */
--ryokan-text-on-dark: #FAF8F3;  /* フッター等の白系テキスト */
--ryokan-text-subtle:  #C4B89A;  /* CTA等のサブテキスト */
```

### 8.2 タイポグラフィ

| 用途 | フォント | ウェイト | サイズ目安 |
|------|---------|---------|-----------|
| **見出し（和文）** | Noto Serif JP | 500-700 | 28-40px |
| **セクションタイトル** | Noto Serif JP | 600 | 28px |
| **本文** | Noto Sans JP | 300-400 | 14-15px |
| **小見出し** | Noto Sans JP | 500 | 15-18px |
| **英文ラベル** | Cormorant Garamond | 400-600 | 12-16px |
| **数字・電話番号** | Cormorant Garamond | 500 | 16px |
| **ボタン** | Noto Sans JP | 500 | 14px |
| **フッター** | Noto Sans JP | 300 | 11-12px |

**共通設定**:
- `letter-spacing`: 1-3px（和文は広めに）
- `line-height`: 1.8-2.0（本文）
- `text-align`: left（基本）、center（セクションタイトル・CTA）

### 8.3 再利用コンポーネント（.pen デザインシステム）

**テンプレートコンポーネント（大型・各ページにコピーして使用）**:

| コンポーネント名 | .pen ID | 用途 | 備考 |
|----------------|---------|------|------|
| Header | `z6WlB` | 全ページ共通ヘッダー（ロゴ + 5ナビ + 予約ボタン） | reusable不可、各ページは独立コピー |
| Footer | `o66tr` | 全ページ共通フッター（ナビ + リーガル + SNS） | reusable不可、各ページは独立コピー |
| CTA Section | `ZAOub` | 全ページ下部の予約導線（オンライン予約 + 電話） | reusable不可、各ページは独立コピー |
| Hero Section | `QGYgp` | サブページ共通ヒーロー（画像 + ラベル + タイトル） | reusable不可、各ページは独立コピー |
| Breadcrumb | `msp0K` | パンくずリスト（ホーム > 現在ページ） | reusable不可、各ページは独立コピー |

> **注意**: 上記テンプレートは `.pen` エンジンの制約で `reusable: true` を設定できない。各ページは独立したコピーを保持するため、テンプレート変更時は全ページの更新が必要。

**小型再利用コンポーネント（`reusable: true`、ref インスタンスで使用）**:

| コンポーネント名 | .pen ID | 用途 |
|----------------|---------|------|
| Section Label | `bQV0w` | セクション横の縦書きラベル（日本語 + 英語） |
| Section Title | `7THkA` | セクションタイトル（装飾線付き） |
| Section Label Gold | `lAKGL` | ゴールド色のセクションラベル |
| Hero Label | `9WJuf` | ヒーローセクションのページラベル |
| Sub Label | `4Ai6N` | サブラベル |
| Related Page Links | `jdW4K` | 各ページ下部の関連ページリンク（水平配置、ゴールドテキスト） |
| Icon Info Card | `25Yvd` | Lucideアイコン付き情報カード（#F0EBE0背景） |
| Info Item | `pYjGY` | アイコン+タイトル+説明の情報アイテム |

### 8.4 共通レイアウトパターン

**コンテナ幅**: `min(1320px, calc(100vw - 120px))`
**モバイル**: `min(1280px, calc(100vw - 40px))`

**セクション間余白**: `padding: 80px 0`（デスクトップ）
**カード角丸**: `border-radius: 4px`
**ボックスシャドウ**: `0 24px 48px rgba(26, 21, 14, 0.12)`

### 8.5 背景テクスチャガイドライン

**コンセプト**: 和紙（わし）の繊維感を極めて繊細に表現し、ベタ塗りの単調さを解消。情緒的な体験を伝えるページに限定して適用。

**適用ルール**:

| カテゴリ | 対象ページ | テクスチャ |
|---------|----------|----------|
| 情緒的 | トップ・客室・温泉・お料理・過ごし方 | 和紙テクスチャあり |
| 実用的 | PP・FAQ・お知らせ・予約・お問い合わせ・アクセス | テクスチャなし（ベタ塗り維持） |

**テクスチャバリエーション**:

| ベースカラー | 用途 | 適用セクション数 |
|-------------|------|----------------|
| #FAF8F3（クリーム系） | コンセプト・タイムライン・グリッド | 9箇所 |
| #2C2418（ダーク系） | お料理・泉質情報・アクティビティ | 3箇所 |
| #F0EBE0（ベージュ系） | アメニティ・ガイド | 1箇所 |

**適用方法**: AI生成画像（mode: fill / CSS cover）によるベタ塗り置換。タイル不使用。

---

## 9. バックエンド連携仕様

### 9.1 microCMS

#### API設定

```typescript
// src/lib/microcms.ts
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
```

#### コンテンツモデル: お知らせ（news）

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| `title` | タイトル | テキストフィールド | ○ |
| `slug` | スラッグ | テキストフィールド | ○ |
| `category` | カテゴリ | セレクトフィールド | ○ |
| `eyecatch` | アイキャッチ画像 | 画像 | |
| `description` | 概要 | テキストエリア | |
| `body` | 本文 | リッチエディタ | ○ |

**カテゴリ選択肢**:
- `event` → イベント
- `seasonal` → 季節のご案内
- `cuisine` → お料理
- `media` → メディア掲載
- `facility` → 施設情報

#### コンテンツモデル: FAQ（faq）

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| `question` | 質問 | テキストフィールド | ○ |
| `answer` | 回答 | リッチエディタ | ○ |
| `category` | カテゴリ | セレクトフィールド | ○ |
| `order` | 表示順 | 数値 | |

**カテゴリ選択肢**:
- `reservation` → ご予約について
- `onsen_room` → 温泉・お部屋について
- `cuisine` → お食事について
- `access_other` → アクセス・その他

#### データ取得パターン

```typescript
// お知らせ一覧（ページネーション + カテゴリフィルタ）
export async function getNewsList(params: {
  page?: number;
  category?: string;
  limit?: number;
}) {
  const { page = 1, category, limit = 5 } = params;
  const offset = (page - 1) * limit;

  const filters = category ? `category[equals]${category}` : undefined;

  return client.getList({
    endpoint: 'news',
    queries: {
      offset,
      limit,
      filters,
      orders: '-publishedAt',
    },
  });
}

// お知らせ詳細
export async function getNewsDetail(slug: string) {
  const data = await client.getList({
    endpoint: 'news',
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return data.contents[0] || null;
}

// 関連記事（同カテゴリ、自分以外、3件）
export async function getRelatedNews(category: string, excludeId: string) {
  return client.getList({
    endpoint: 'news',
    queries: {
      filters: `category[equals]${category}[and]id[not_equals]${excludeId}`,
      limit: 3,
      orders: '-publishedAt',
    },
  });
}

// FAQ一覧（カテゴリ別・表示順）
export async function getFaqList() {
  return client.getList({
    endpoint: 'faq',
    queries: {
      limit: 100,
      orders: 'order',
    },
  });
}
```

### 9.2 Web3Forms

```typescript
// src/lib/web3forms.ts
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
      from_name: '月瀬庵ウェブサイト',
      subject: `【月瀬庵】${data.subject}`,
      ...data,
    }),
  });
  return response.json();
}
```

**送信後の挙動**:
1. 送信中: ボタンを「送信中...」に変更 + ローディング表示
2. 成功: 「送信が完了しました。」メッセージ表示 + フォームリセット
3. 失敗: 「送信に失敗しました。お手数ですがお電話でお問い合わせください。」

### 9.3 Cal.com

```typescript
// src/components/ReservationCalendar.tsx
'use client';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ReservationCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: {
          branding: { brandColor: "#8B6914" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <Cal
      calLink={`${process.env.NEXT_PUBLIC_CALCOM_USERNAME}/${process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG}`}
      style={{ width: "100%", height: "700px", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
```

---

## 10. SEO・メタデータ設計

### 10.1 各ページのメタデータ

```typescript
// src/app/layout.tsx（ルートレイアウト共通）
export const metadata: Metadata = {
  metadataBase: new URL('https://tsukise-an.jp'), // 本番URL
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '月瀬庵 | TSUKISE-AN',
  },
};
```

| ページ | title | description |
|--------|-------|-------------|
| `/` | 月瀬庵 \| TSUKISE-AN - 箱根・芦ノ湖畔の温泉旅館 | 箱根・芦ノ湖畔に佇む、全八室の離れ宿 月瀬庵。明治28年創業、ミシュラン二つ星の懐石と源泉かけ流しの温泉。 |
| `/rooms` | 客室 \| 月瀬庵 - 全八室の離れ | 専用露天風呂付きの全八室の離れ。芦ノ湖を望む贅沢な空間で、くつろぎのひとときを。 |
| `/onsen` | 温泉 \| 月瀬庵 - 姥子温泉の源泉 | 箱根十七湯のひとつ、姥子温泉の単純硫黄泉。湖を望む大浴場と全室の露天風呂。 |
| `/cuisine` | お料理 \| 月瀬庵 - ミシュラン二つ星の懐石 | 四季折々の食材を活かした月替わり懐石。ミシュラン二つ星の料理長が紡ぐ至高の味わい。 |
| `/experience` | 過ごし方 \| 月瀬庵 - 特別な一日の過ごし方 | お出迎えから見送りまで、月瀬庵で過ごす特別な一日をご案内。 |
| `/access` | アクセス \| 月瀬庵 - 箱根・芦ノ湖へのアクセス | 箱根湯本駅よりバス30分。御殿場ICより約40分。送迎サービスあり。 |
| `/reservation` | ご予約 \| 月瀬庵 - オンライン予約 | 月瀬庵のオンライン予約。お部屋と日程をお選びいただけます。 |
| `/contact` | お問い合わせ \| 月瀬庵 | ご予約・ご質問など、お気軽にお問い合わせくださいませ。 |
| `/news` | お知らせ \| 月瀬庵 | 月瀬庵からの最新のお知らせ・イベント情報。 |
| `/news/[slug]` | {記事タイトル} \| お知らせ \| 月瀬庵 | {記事概要} |
| `/faq` | よくあるご質問 \| 月瀬庵 | ご予約・温泉・お食事・アクセスなど、よくいただくご質問をまとめました。 |
| `/privacy` | プライバシーポリシー \| 月瀬庵 | 月瀬庵の個人情報保護方針。お客様の個人情報の取り扱いについて。 |
| `/legal` | 特定商取引法に基づく表記 \| 月瀬庵 | 特定商取引法に基づく表記。事業者情報・料金・キャンセルポリシー。 |

### 10.2 構造化データ（JSON-LD）

```typescript
// トップページ: Organization + LocalBusiness
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "月瀬庵",
  "alternateName": "TSUKISE-AN",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "元箱根138",
    "addressLocality": "箱根町",
    "addressRegion": "神奈川県",
    "postalCode": "250-0522",
    "addressCountry": "JP"
  },
  "telephone": "+81-460-83-XXXX",
  "starRating": { "@type": "Rating", "ratingValue": "5" },
  "numberOfRooms": 8,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "温泉", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "露天風呂付き客室", "value": true }
  ]
}

// FAQページ: FAQPage
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "予約はいつから可能ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
    // ...
  ]
}

// お知らせ詳細: Article
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "記事タイトル",
  "datePublished": "2026-02-01",
  "author": { "@type": "Organization", "name": "月瀬庵" }
}
```

---

## 11. レスポンシブ設計方針

### 11.1 ブレークポイント

| 名称 | 幅 | 対象 |
|------|-----|------|
| mobile | ~767px | スマートフォン |
| tablet | 768px~1023px | タブレット |
| desktop | 1024px~ | デスクトップ |

### 11.2 レスポンシブ対応方針

| 要素 | デスクトップ | モバイル |
|------|-----------|---------|
| ナビゲーション | 横並びリンク + 予約ボタン | ハンバーガーメニュー |
| ヒーロー | フルスクリーン | 70vh程度に縮小 |
| 2カラムレイアウト | 横並び（画像 + テキスト） | 縦積み |
| 3カラムグリッド | 3列 | 1列 |
| タイムライン | 2列グリッド | 1列縦積み |
| フッター | 横並び | 縦積み |
| CTA ボタン | 横並び | 縦積み（フル幅） |
| コンテナパディング | 60-120px | 20-40px |

---

## 12. 実装優先順位

### Phase 1: 基盤整備（最優先）

1. **共通レイアウト改修**
   - `Header.tsx` のナビゲーションリンクをハッシュ→ページURLに変更
   - `Footer.tsx` のリンク先を更新
   - 共通 `CTASection` を独立コンポーネントに
   - パンくずコンポーネント作成

2. **トップページ改修**
   - 各セクションのリンクを内部ページURLに変更
   - InfoSectionのお知らせ部分をmicroCMS連携準備

### Phase 2: 静的ページ作成

3. **客室ページ** (`/rooms`)
4. **温泉ページ** (`/onsen`)
5. **お料理ページ** (`/cuisine`)
6. **過ごし方ページ** (`/experience`)
7. **アクセスページ** (`/access`)

### Phase 3: バックエンド連携ページ

8. **予約ページ** (`/reservation`) - Cal.com連携
9. **お問い合わせページ** (`/contact`) - Web3Forms連携
10. **お知らせ一覧/詳細** (`/news`, `/news/[slug]`) - microCMS連携
11. **FAQページ** (`/faq`) - microCMS連携

### Phase 4: 補助ページ・仕上げ

12. **プライバシーポリシー** (`/privacy`)
13. **特定商取引法** (`/legal`)
14. **サイトマップ** (`/sitemap`)
15. SEO・メタデータ・構造化データ設定
16. レスポンシブ最終調整
17. パフォーマンス最適化（画像最適化、ISR設定等）

---

## 付録: 既存ファイル参照マップ

### 変更が必要な既存ファイル

| ファイル | 変更内容 |
|----------|---------|
| `src/components/Header.tsx` | ナビリンクをページURLに変更 |
| `src/components/Header.module.css` | 必要に応じてスタイル調整 |
| `src/components/Footer.tsx` | ナビリンクをページURLに変更 |
| `src/components/Footer.module.css` | 必要に応じてスタイル調整 |
| `src/app/page.tsx` | セクションリンク先の変更 |
| `src/components/HeroSection.tsx` | ボタンリンク先確認 |
| `src/components/InfoSection.tsx` | お知らせ部分のmicroCMS連携 |
| `src/components/CTASection.tsx` | ボタンリンク先を `/reservation` に |
| `package.json` | microCMS SDK, Cal.com追加 |
| `next.config.ts` | microCMS画像ドメイン許可設定追加 |

### 新規作成ファイル

```
src/app/rooms/page.tsx
src/app/onsen/page.tsx
src/app/cuisine/page.tsx
src/app/experience/page.tsx
src/app/access/page.tsx
src/app/reservation/page.tsx
src/app/contact/page.tsx
src/app/news/page.tsx
src/app/news/[slug]/page.tsx
src/app/faq/page.tsx
src/app/privacy/page.tsx
src/app/legal/page.tsx
src/app/sitemap/page.tsx
src/lib/microcms.ts
src/lib/web3forms.ts
src/components/ReservationCalendar.tsx
src/components/ContactForm.tsx
src/components/Breadcrumb.tsx
src/components/FaqAccordion.tsx
src/components/NewsCard.tsx
src/components/Pagination.tsx
src/components/CategoryTabs.tsx
src/components/ShareButtons.tsx
```

---

> **注意**: 電話番号（0460-83-XXXX）、メールアドレス（info@tsukise-an.jp）、SNS URL、Cal.comアカウント情報は仮の値です。実際の情報に差し替えてください。
