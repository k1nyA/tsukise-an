import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { NewsDetailSection } from '../NewsDetailSection'

const mockArticle = {
  id: '1',
  date: '2026.03.15',
  category: 'イベント',
  title: '春の訪れ — 桜の時期のご案内と特別プランのお知らせ',
  body: [
    {
      type: 'paragraph' as const,
      content:
        '芦ノ湖畔に佇む月瀬庵の庭園では、例年3月下旬から4月上旬にかけて、約50本の桜が一斉に咲き誇ります。',
    },
    {
      type: 'heading' as const,
      content: '花見露天風呂プラン',
    },
    {
      type: 'paragraph' as const,
      content:
        '桜の季節限定で、露天風呂から桜を眺めながらお湯に浸かる「花見露天風呂プラン」をご用意いたしました。',
    },
    {
      type: 'heading' as const,
      content: '春の特別懐石',
    },
    {
      type: 'paragraph' as const,
      content:
        '料理長・水月が手掛ける春の特別懐石では、桜鯛のお造り、筍と山菜の天婦羅、桜餅の甘味など、春の食材をふんだんに使った全十二品をお楽しみいただけます。',
    },
  ],
  relatedArticles: [
    {
      id: '2',
      date: '2026.02.28',
      category: '季節の便り',
      title: '冬の特別懐石のご案内',
    },
    {
      id: '3',
      date: '2026.02.10',
      category: 'お料理',
      title: '新メニュー「月見御膳」登場',
    },
  ],
}

describe('NewsDetailSection', () => {
  it('renders as a semantic article element', () => {
    const { container } = render(<NewsDetailSection article={mockArticle} />)
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })

  it('renders the article title', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(
      screen.getByText('春の訪れ — 桜の時期のご案内と特別プランのお知らせ')
    ).toBeInTheDocument()
  })

  it('renders the article title as an h1 heading', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(
      '春の訪れ — 桜の時期のご案内と特別プランのお知らせ'
    )
  })

  it('renders the article date', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(screen.getByText('2026.03.15')).toBeInTheDocument()
  })

  it('renders the article category', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(screen.getByTestId('detail-category')).toHaveTextContent('イベント')
  })

  it('renders category tag with dark background', () => {
    const { container } = render(<NewsDetailSection article={mockArticle} />)
    const categoryTag = container.querySelector('[data-testid="detail-category"]')
    expect(categoryTag).toHaveStyle({
      backgroundColor: 'var(--ryokan-dark, #2C2418)',
    })
  })

  it('renders the decorative separator line below the header', () => {
    const { container } = render(<NewsDetailSection article={mockArticle} />)
    const decoLine = container.querySelector('[data-testid="article-deco-line"]')
    expect(decoLine).toBeInTheDocument()
    expect(decoLine).toHaveStyle({
      width: '1px',
      height: '40px',
      backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
    })
  })

  it('renders paragraph content', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(
      screen.getByText(/芦ノ湖畔に佇む月瀬庵の庭園では/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/桜の季節限定で、露天風呂から桜を眺め/)
    ).toBeInTheDocument()
  })

  it('renders heading elements in article body', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    // 2 body headings + 1 related articles heading = 3
    expect(headings.length).toBe(3)
    expect(headings[0]).toHaveTextContent('花見露天風呂プラン')
    expect(headings[1]).toHaveTextContent('春の特別懐石')
    expect(headings[2]).toHaveTextContent('関連するお知らせ')
  })

  it('renders heading elements with correct typography', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const heading = screen.getByText('花見露天風呂プラン')
    expect(heading).toHaveStyle({
      fontFamily: 'var(--font-heading)',
      fontSize: '24px',
      fontWeight: '600',
    })
  })

  it('renders the related articles section', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(screen.getByText('関連するお知らせ')).toBeInTheDocument()
  })

  it('renders related article titles as links', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const relatedLinks = screen.getAllByTestId('related-article-link')
    expect(relatedLinks.length).toBe(2)
    expect(relatedLinks[0]).toHaveAttribute('href', '/news/2')
    expect(relatedLinks[1]).toHaveAttribute('href', '/news/3')
  })

  it('renders related article titles', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(screen.getByText('冬の特別懐石のご案内')).toBeInTheDocument()
    expect(
      screen.getByText('新メニュー「月見御膳」登場')
    ).toBeInTheDocument()
  })

  it('renders the "back to list" button', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const backLink = screen.getByText('一覧に戻る')
    expect(backLink.closest('a')).toHaveAttribute('href', '/news')
  })

  it('renders the share section', () => {
    render(<NewsDetailSection article={mockArticle} />)
    expect(screen.getByText('この記事をシェア')).toBeInTheDocument()
  })

  it('renders the title with correct typography', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveStyle({
      fontFamily: 'var(--font-heading)',
      fontSize: '32px',
      fontWeight: '600',
      letterSpacing: '4px',
      textAlign: 'center',
    })
  })

  it('renders article body paragraphs with correct typography', () => {
    render(<NewsDetailSection article={mockArticle} />)
    const paragraph = screen.getByText(/芦ノ湖畔に佇む月瀬庵の庭園では/)
    expect(paragraph).toHaveStyle({
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      fontWeight: '300',
    })
  })
})
