import Link from 'next/link'

import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { NewsListSection, type NewsArticle } from '@/components/news/NewsListSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'
import { getNewsList } from '@/lib/microcms'
import {
  buildNewsListHref,
  getTotalPages,
  NEWS_CATEGORY_TABS,
  NEWS_PAGE_SIZE,
  parseNewsListSearchParams,
} from '@/lib/news-list-query'

type SearchParamsInput = Record<string, string | string[] | undefined>

type PageProps = {
  searchParams: Promise<SearchParamsInput>
}

const toDisplayDate = (isoDate: string): string => {
  const datePart = isoDate.slice(0, 10)
  return datePart.replaceAll('-', '.')
}

const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const truncateText = (value: string, maxLength = 80): string => {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength)}…`
}

export default async function NewsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const query = parseNewsListSearchParams(resolvedSearchParams)
  const selectedCategory = query.category

  let articles: NewsArticle[] = []
  let totalPages = 1
  let fetchError = ''

  try {
    const response = await getNewsList({
      category: selectedCategory,
      page: query.page,
      limit: NEWS_PAGE_SIZE,
    })

    articles = response.contents.map((item) => ({
      id: item.slug,
      date: toDisplayDate(item.publishedAt ?? item.createdAt),
      category: item.category,
      title: item.title,
      excerpt: truncateText(item.description?.trim() || stripHtml(item.body)),
    }))

    totalPages = getTotalPages(response.totalCount, response.limit)
  } catch (error) {
    fetchError = '現在お知らせを取得できません。時間をおいて再度お試しください。'
    console.error('Failed to fetch news list', error)
  }

  const categoryTabs = [{ label: 'すべて', value: undefined }, ...NEWS_CATEGORY_TABS.map((value) => ({ label: value, value }))]

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

        <section
          aria-label="お知らせカテゴリ"
          className="flex w-full items-center justify-center"
          style={{ gap: 16, padding: '40px 80px 24px 80px' }}
        >
          {categoryTabs.map((tab) => {
            const isActive = (tab.value ?? undefined) === (selectedCategory ?? undefined)
            const href = buildNewsListHref({ category: tab.value, page: 1 })

            return (
              <Link
                key={tab.label}
                href={href}
                style={{
                  borderRadius: 2,
                  padding: '10px 24px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  letterSpacing: 1,
                  color: isActive ? 'var(--ryokan-text-on-dark)' : 'var(--ryokan-dark)',
                  backgroundColor: isActive ? 'var(--ryokan-dark)' : 'transparent',
                  border: isActive ? '1px solid var(--ryokan-dark)' : '1px solid var(--ryokan-light-gold)',
                }}
              >
                {tab.label}
              </Link>
            )
          })}
        </section>

        {fetchError ? (
          <section className="w-full" style={{ padding: '40px 80px 80px' }}>
            <p role="alert">{fetchError}</p>
          </section>
        ) : (
          <>
            <NewsListSection articles={articles} />

            <section
              aria-label="お知らせページネーション"
              className="flex w-full items-center justify-center"
              style={{ gap: 8, padding: '0 80px 72px 80px' }}
            >
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                const isActive = page === query.page
                const href = buildNewsListHref({
                  category: selectedCategory,
                  page,
                })
                return (
                  <Link
                    key={page}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      minWidth: 32,
                      textAlign: 'center',
                      textDecoration: 'none',
                      padding: '6px 10px',
                      borderRadius: 2,
                      border: '1px solid var(--ryokan-light-gold)',
                      backgroundColor: isActive ? 'var(--ryokan-dark)' : 'transparent',
                      color: isActive ? 'var(--ryokan-text-on-dark)' : 'var(--ryokan-dark)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                    }}
                  >
                    {page}
                  </Link>
                )
              })}
            </section>
          </>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
