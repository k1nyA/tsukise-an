import Link from 'next/link'

export type NewsArticle = {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
}

type NewsListSectionProps = {
  articles: NewsArticle[]
}

export function NewsListSection({ articles }: NewsListSectionProps) {
  return (
    <section
      className="flex w-full flex-col"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '60px 80px 80px 80px',
      }}
    >
      {articles.map((article, index) => {
        const isLast = index === articles.length - 1

        return (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
            data-testid="news-item"
            className="flex w-full items-center"
            style={{
              gap: 24,
              padding: '32px 0',
              ...(isLast
                ? {}
                : {
                    borderBottom:
                      '1px solid var(--ryokan-soft-line, #D4C5A066)',
                  }),
              textDecoration: 'none',
            }}
          >
            {/* Date */}
            <time
              className="shrink-0"
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 14,
                fontWeight: 400,
                color: 'var(--ryokan-subtle, #8B7D6B)',
                letterSpacing: 1,
                minWidth: 100,
              }}
            >
              {article.date}
            </time>

            {/* Category Tag */}
            <span
              data-testid="news-category"
              className="shrink-0"
              style={{
                backgroundColor: 'var(--ryokan-dark, #2C2418)',
                borderRadius: 2,
                padding: '4px 16px',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--ryokan-text-on-dark, #FAF8F3)',
                letterSpacing: 1,
              }}
            >
              {article.category}
            </span>

            {/* Title & Excerpt */}
            <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 1,
                }}
              >
                {article.title}
              </span>
              <span
                className="line-clamp-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-subtle, #8B7D6B)',
                  letterSpacing: 1,
                }}
              >
                {article.excerpt}
              </span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
