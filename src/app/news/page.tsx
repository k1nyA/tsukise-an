import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { NewsListSection } from '@/components/news/NewsListSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

const newsArticles = [
  {
    id: '1',
    date: '2026.03.15',
    category: 'イベント',
    title: '春の訪れ — 桜の時期のご案内と特別プランのお知らせ',
    excerpt:
      '芦ノ湖畔に佇む月瀬庵の庭園では、例年3月下旬から4月上旬にかけて、約50本の桜が一斉に咲き誇ります。',
  },
  {
    id: '2',
    date: '2026.02.28',
    category: '季節の便り',
    title: '冬の特別懐石 — 寒鰤と蟹の饗宴',
    excerpt:
      '料理長が厳選した冬の食材を使用した特別懐石コースをご用意いたしました。日本海直送の寒鰤と越前蟹をお楽しみいただけます。',
  },
  {
    id: '3',
    date: '2026.02.10',
    category: 'お料理',
    title: '新メニュー「月見御膳」登場',
    excerpt:
      '月をテーマにした新しい御膳メニューが登場いたします。月瀬庵ならではの風雅な一皿をお楽しみください。',
  },
  {
    id: '4',
    date: '2026.01.20',
    category: 'メディア掲載',
    title: '旅行雑誌「和の宿」に掲載されました',
    excerpt:
      '旅行雑誌「和の宿」2026年春号にて、月瀬庵の温泉と料理が特集されました。',
  },
  {
    id: '5',
    date: '2026.01.05',
    category: '施設情報',
    title: '大浴場リニューアルのお知らせ',
    excerpt:
      '大浴場のリニューアル工事が完了いたしました。新たに檜風呂と岩風呂を増設し、より多彩な湯浴みをお楽しみいただけます。',
  },
]

export default function NewsPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="お知らせ" labelEn="NEWS" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'お知らせ' },
          ]}
        />
        <NewsListSection articles={newsArticles} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
