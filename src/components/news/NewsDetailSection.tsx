import Link from 'next/link'

type BodyBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }

type RelatedArticle = {
  id: string
  date: string
  category: string
  title: string
}

export type NewsArticleDetail = {
  id: string
  date: string
  category: string
  title: string
  body: BodyBlock[]
  relatedArticles: RelatedArticle[]
}

type NewsDetailSectionProps = {
  article: NewsArticleDetail
}

export function NewsDetailSection({ article }: NewsDetailSectionProps) {
  return (
    <article>
      {/* Article Header */}
      <div
        className="flex w-full flex-col items-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '60px 200px 40px 200px',
          gap: 24,
        }}
      >
        {/* Meta: date + category */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <time
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--ryokan-subtle, #8B7D6B)',
              letterSpacing: 1,
            }}
          >
            {article.date}
          </time>
          <span
            data-testid="detail-category"
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
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 32,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 4,
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          {article.title}
        </h1>

        {/* Decorative line */}
        <span
          data-testid="article-deco-line"
          style={{
            width: 1,
            height: 40,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
      </div>

      {/* Article Body */}
      <div
        className="flex w-full flex-col"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '60px 200px',
          gap: 40,
        }}
      >
        {article.body.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={index}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 3,
                }}
              >
                {block.content}
              </h2>
            )
          }

          return (
            <p
              key={index}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                fontWeight: 300,
                color: 'var(--ryokan-muted, #4A4035)',
                letterSpacing: 1,
                lineHeight: 2.2,
              }}
            >
              {block.content}
            </p>
          )
        })}
      </div>

      {/* Share Row */}
      <div
        className="flex w-full items-center justify-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '0 280px 40px 280px',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 300,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 1,
          }}
        >
          この記事をシェア
        </span>
        {/* Share buttons (X, Facebook, LINE) */}
        {['X', 'FB', 'LINE'].map((label) => (
          <span
            key={label}
            className="flex items-center justify-center"
            style={{
              backgroundColor: 'var(--ryokan-dark, #2C2418)',
              width: 36,
              height: 36,
              borderRadius: '50%',
            }}
            aria-label={`${label}でシェア`}
          >
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--ryokan-text-on-dark, #FAF8F3)',
              }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>

      {/* Divider */}
      <div
        className="flex w-full items-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '0 280px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'var(--ryokan-soft-line, #D4C5A033)',
          }}
        />
      </div>

      {/* Related Articles */}
      <div
        className="flex w-full flex-col items-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: '40px 80px 80px 80px',
          gap: 40,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 3,
          }}
        >
          関連するお知らせ
        </h2>

        {/* Related article cards */}
        <div className="flex w-full" style={{ gap: 24 }}>
          {article.relatedArticles.map((related) => (
            <Link
              key={related.id}
              href={`/news/${related.id}`}
              data-testid="related-article-link"
              className="flex flex-1 flex-col"
              style={{
                padding: 24,
                gap: 12,
                backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
                borderRadius: 4,
                textDecoration: 'none',
              }}
            >
              <div className="flex items-center" style={{ gap: 12 }}>
                <time
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'var(--ryokan-subtle, #8B7D6B)',
                    letterSpacing: 1,
                  }}
                >
                  {related.date}
                </time>
                <span
                  style={{
                    backgroundColor: 'var(--ryokan-dark, #2C2418)',
                    borderRadius: 2,
                    padding: '2px 10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 10,
                    fontWeight: 500,
                    color: 'var(--ryokan-text-on-dark, #FAF8F3)',
                    letterSpacing: 1,
                  }}
                >
                  {related.category}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 1,
                }}
              >
                {related.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Back to list button */}
        <Link
          href="/news"
          className="flex items-center"
          style={{
            padding: '14px 48px',
            borderRadius: 2,
            border: '1px solid var(--ryokan-light-gold, #D4C5A0)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 2,
          }}
        >
          一覧に戻る
        </Link>
      </div>
    </article>
  )
}
