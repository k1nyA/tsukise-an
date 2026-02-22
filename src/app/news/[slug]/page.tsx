import { notFound } from 'next/navigation'

import { Header } from '@/components/shared/Header/Header'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { NewsDetailSection } from '@/components/news/NewsDetailSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'
import { getNewsDetail, getRelatedNews } from '@/lib/microcms'
import { mapNewsItemToDetailArticle } from '@/lib/news-detail'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params

  let fetchError = ''
  let article = null as ReturnType<typeof mapNewsItemToDetailArticle> | null
  let detail = null as Awaited<ReturnType<typeof getNewsDetail>>

  try {
    detail = await getNewsDetail(slug)
  } catch (error) {
    fetchError = '現在記事を取得できません。時間をおいて再度お試しください。'
    console.error('Failed to fetch news detail', error)
  }

  if (!fetchError && !detail) {
    notFound()
  }

  if (detail) {
    let related = [] as typeof detail[]
    try {
      related = (
        await getRelatedNews(detail.category, detail.id, 3)
      ).contents
    } catch (error) {
      console.error('Failed to fetch related news', error)
    }

    article = mapNewsItemToDetailArticle(detail, related)
  }

  const breadcrumbLabel = article?.title ?? '記事'

  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'お知らせ', href: '/news' },
            { label: breadcrumbLabel },
          ]}
        />

        {article ? (
          <NewsDetailSection article={article} />
        ) : (
          <section
            className="w-full"
            style={{
              backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
              padding: '60px 80px 80px',
            }}
          >
            <p role="alert">
              {fetchError || '記事を表示できません。'}
            </p>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
