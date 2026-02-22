import { Header } from '@/components/shared/Header/Header'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { NewsDetailSection } from '@/components/news/NewsDetailSection'
import type { NewsArticleDetail } from '@/components/news/NewsDetailSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

const articleData: Record<string, NewsArticleDetail> = {
  '1': {
    id: '1',
    date: '2026.03.15',
    category: 'イベント',
    title: '春の訪れ — 桜の時期のご案内と特別プランのお知らせ',
    body: [
      {
        type: 'paragraph',
        content:
          '芦ノ湖畔に佇む月瀬庵の庭園では、例年3月下旬から4月上旬にかけて、約50本の桜が一斉に咲き誇ります。湖面に映る桜と箱根の山々が織りなす景色は、この時期だけの特別な眺めです。',
      },
      {
        type: 'heading',
        content: '花見露天風呂プラン',
      },
      {
        type: 'paragraph',
        content:
          '桜の季節限定で、露天風呂から桜を眺めながらお湯に浸かる「花見露天風呂プラン」をご用意いたしました。夜にはライトアップされた夜桜をお楽しみいただけます。\n\n■ 期間：2026年3月20日（金）〜 4月10日（金）\n■ 料金：通常宿泊料金に含まれます\n■ 特典：桜茶と花見団子のお夜食サービス付き',
      },
      {
        type: 'heading',
        content: '春の特別懐石',
      },
      {
        type: 'paragraph',
        content:
          '料理長・水月が手掛ける春の特別懐石では、桜鯛のお造り、筍と山菜の天婦羅、桜餅の甘味など、春の食材をふんだんに使った全十二品をお楽しみいただけます。\n\n器にも桜の意匠を施した特別な設えで、目と舌の両方で春をお楽しみください。',
      },
    ],
    relatedArticles: [
      {
        id: '2',
        date: '2026.02.28',
        category: '季節の便り',
        title: '冬の特別懐石 — 寒鰤と蟹の饗宴',
      },
      {
        id: '3',
        date: '2026.02.10',
        category: 'お料理',
        title: '新メニュー「月見御膳」登場',
      },
    ],
  },
}

// Static placeholder article used when article id is not found
const placeholderArticle: NewsArticleDetail = {
  id: 'placeholder',
  date: '2026.03.15',
  category: 'イベント',
  title: '春の訪れ — 桜の時期のご案内と特別プランのお知らせ',
  body: [
    {
      type: 'paragraph',
      content:
        '芦ノ湖畔に佇む月瀬庵の庭園では、例年3月下旬から4月上旬にかけて、約50本の桜が一斉に咲き誇ります。湖面に映る桜と箱根の山々が織りなす景色は、この時期だけの特別な眺めです。',
    },
    {
      type: 'heading',
      content: '花見露天風呂プラン',
    },
    {
      type: 'paragraph',
      content:
        '桜の季節限定で、露天風呂から桜を眺めながらお湯に浸かる「花見露天風呂プラン」をご用意いたしました。夜にはライトアップされた夜桜をお楽しみいただけます。\n\n■ 期間：2026年3月20日（金）〜 4月10日（金）\n■ 料金：通常宿泊料金に含まれます\n■ 特典：桜茶と花見団子のお夜食サービス付き',
    },
    {
      type: 'heading',
      content: '春の特別懐石',
    },
    {
      type: 'paragraph',
      content:
        '料理長・水月が手掛ける春の特別懐石では、桜鯛のお造り、筍と山菜の天婦羅、桜餅の甘味など、春の食材をふんだんに使った全十二品をお楽しみいただけます。\n\n器にも桜の意匠を施した特別な設えで、目と舌の両方で春をお楽しみください。',
    },
  ],
  relatedArticles: [
    {
      id: '2',
      date: '2026.02.28',
      category: '季節の便り',
      title: '冬の特別懐石 — 寒鰤と蟹の饗宴',
    },
    {
      id: '3',
      date: '2026.02.10',
      category: 'お料理',
      title: '新メニュー「月見御膳」登場',
    },
  ],
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const article = articleData[id] ?? placeholderArticle

  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'お知らせ', href: '/news' },
            { label: article.title },
          ]}
        />
        <NewsDetailSection article={article} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
