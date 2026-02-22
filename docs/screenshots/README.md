# Screenshots

Pencil エディタの `get_screenshot` ツールで各ページのスクリーンショットを取得できます。

## ページ一覧と .pen Frame ID

| # | ページ | Route | Frame ID |
|---|--------|-------|----------|
| 1 | トップ | `/` | `1QcCy` |
| 2 | 客室 | `/rooms` | `HN9dn` |
| 3 | 温泉 | `/onsen` | `Ghbhb` |
| 4 | お料理 | `/cuisine` | `SeRNo` |
| 5 | 過ごし方 | `/experience` | `DzrBF` |
| 6 | アクセス | `/access` | `BBsjr` |
| 7 | ご予約 | `/reservation` | `Xbfwp` |
| 8 | お問い合わせ | `/contact` | `Kq0ek` |
| 9 | お知らせ一覧 | `/news` | `RxtFj` |
| 10 | お知らせ詳細 | `/news/:id` | `DL5lm` |
| 11 | FAQ | `/faq` | `oOBdV` |
| 12 | プライバシーポリシー | `/privacy` | `vCw0m` |
| 13 | 特定商取引法 | `/legal` | `Cx0nw` |

## スクリーンショット取得方法

Pencil MCP の `get_screenshot` ツールを使用:

```javascript
mcp__pencil__get_screenshot({
  filePath: "design/月瀬庵デザイン.pen",
  nodeId: "FRAME_ID"
})
```

## 検証済み（2026-02-22）

全13ページのスクリーンショットを取得・目視確認済み。
各ページのデザインに異常なし。
