# Design Data Export

`.pen` デザインファイルから抽出した構造データ。FEサブエージェントが `.pen` を直接参照せずに正確な実装を行うための参照用。

## ディレクトリ構成

```
docs/design-data/
├── README.md                  # このファイル
├── design-tokens.json         # カラー・タイポグラフィ・スペーシング
├── top.json                   # トップページ (/)
├── rooms.json                 # 客室ページ (/rooms)
├── onsen.json                 # 温泉ページ (/onsen)
├── cuisine.json               # お料理ページ (/cuisine)
├── experience.json            # 過ごし方ページ (/experience)
├── access.json                # アクセスページ (/access)
├── reservation.json           # ご予約ページ (/reservation)
├── contact.json               # お問い合わせページ (/contact)
├── news-list.json             # お知らせ一覧ページ (/news)
├── news-detail.json           # お知らせ詳細ページ (/news/:id)
├── faq.json                   # FAQページ (/faq)
├── privacy.json               # プライバシーポリシーページ (/privacy)
├── legal.json                 # 特定商取引法ページ (/legal)
└── components/
    ├── header.json            # ヘッダーテンプレート
    ├── footer.json            # フッターテンプレート
    ├── cta.json               # CTAセクションテンプレート
    ├── hero.json              # ヒーローセクションテンプレート
    ├── breadcrumb.json        # パンくずリストテンプレート
    └── small-components.json  # 小型再利用コンポーネント
```

## 使い方

### FEサブエージェント向け 3点セット

1. **SPECIFICATION.md** — 設計意図・ユーザーフロー・遷移先マッピング
2. **design-data/*.json** — .pen から抽出した正確なスタイル値・セクション構造（このディレクトリ）
3. **Pencil エディタでのスクリーンショット確認** — ビジュアルリファレンス

### JSON スキーマ（ページ）

```json
{
  "page": {
    "name": "ページ名",
    "nameEn": "English Name",
    "route": "/path",
    "penFrameId": ".pen内のフレームID"
  },
  "layout": {
    "width": 1440,
    "direction": "vertical"
  },
  "sections": [
    {
      "name": "セクション名",
      "penId": ".pen内のノードID",
      "type": "frame|text|ref",
      "styles": { ... },
      "children": [ ... ]
    }
  ]
}
```

### JSON スキーマ（コンポーネント）

```json
{
  "component": {
    "name": "コンポーネント名",
    "penId": ".pen内のノードID",
    "reusable": true|false
  },
  "styles": { ... },
  "children": [ ... ]
}
```

## 注意事項

- `penId` は `.pen` ファイル内のノードID。実装時はコメントや `data-pen-id` 属性で対応付けると便利
- `hasImageFill: true` のノードは画像背景を持つ。実際の画像は Pencil エディタで確認
- スタイル値は `.pen` ファイルのピクセル値。レスポンシブ実装時は比率変換が必要
- `design-tokens.json` の CSS変数名は SPECIFICATION.md Section 8.1 と対応
