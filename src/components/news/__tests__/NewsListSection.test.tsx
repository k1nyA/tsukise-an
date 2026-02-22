import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { NewsListSection } from '../NewsListSection'

const mockArticles = [
  {
    id: '1',
    date: '2026.03.15',
    category: 'イベント',
    title: '春の訪れ — 桜の時期のご案内',
    excerpt:
      '芦ノ湖畔に佇む月瀬庵の庭園では、例年3月下旬から4月上旬にかけて、約50本の桜が一斉に咲き誇ります。',
  },
  {
    id: '2',
    date: '2026.02.28',
    category: '季節の便り',
    title: '冬の特別懐石のご案内',
    excerpt:
      '料理長が厳選した冬の食材を使用した特別懐石コースをご用意いたしました。',
  },
  {
    id: '3',
    date: '2026.02.10',
    category: 'お料理',
    title: '新メニュー「月見御膳」登場',
    excerpt:
      '月をテーマにした新しい御膳メニューが登場いたします。',
  },
]

describe('NewsListSection', () => {
  it('renders as a semantic section element', () => {
    const { container } = render(<NewsListSection articles={mockArticles} />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders all article items', () => {
    render(<NewsListSection articles={mockArticles} />)
    expect(
      screen.getByText('春の訪れ — 桜の時期のご案内')
    ).toBeInTheDocument()
    expect(
      screen.getByText('冬の特別懐石のご案内')
    ).toBeInTheDocument()
    expect(
      screen.getByText('新メニュー「月見御膳」登場')
    ).toBeInTheDocument()
  })

  it('renders dates for each article', () => {
    render(<NewsListSection articles={mockArticles} />)
    expect(screen.getByText('2026.03.15')).toBeInTheDocument()
    expect(screen.getByText('2026.02.28')).toBeInTheDocument()
    expect(screen.getByText('2026.02.10')).toBeInTheDocument()
  })

  it('renders category tags for each article', () => {
    render(<NewsListSection articles={mockArticles} />)
    expect(screen.getByText('イベント')).toBeInTheDocument()
    expect(screen.getByText('季節の便り')).toBeInTheDocument()
    expect(screen.getByText('お料理')).toBeInTheDocument()
  })

  it('renders excerpts for each article', () => {
    render(<NewsListSection articles={mockArticles} />)
    expect(
      screen.getByText(/芦ノ湖畔に佇む月瀬庵の庭園では/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/料理長が厳選した冬の食材/)
    ).toBeInTheDocument()
  })

  it('renders links to each article detail page', () => {
    render(<NewsListSection articles={mockArticles} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveAttribute('href', '/news/1')
    expect(links[1]).toHaveAttribute('href', '/news/2')
    expect(links[2]).toHaveAttribute('href', '/news/3')
  })

  it('renders article items with data-testid', () => {
    render(<NewsListSection articles={mockArticles} />)
    const items = screen.getAllByTestId('news-item')
    expect(items.length).toBe(3)
  })

  it('applies correct background color', () => {
    const { container } = render(<NewsListSection articles={mockArticles} />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({
      backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
    })
  })

  it('renders category tag with dark background for styling', () => {
    const { container } = render(<NewsListSection articles={mockArticles} />)
    const categoryTags = container.querySelectorAll('[data-testid="news-category"]')
    expect(categoryTags.length).toBe(3)
    categoryTags.forEach((tag) => {
      expect(tag).toHaveStyle({
        backgroundColor: 'var(--ryokan-dark, #2C2418)',
      })
    })
  })

  it('renders bottom border on items except the last', () => {
    const { container } = render(<NewsListSection articles={mockArticles} />)
    const items = container.querySelectorAll('[data-testid="news-item"]')
    // First and second items should have a border-bottom style containing "1px solid"
    const firstStyle = items[0].getAttribute('style') ?? ''
    const secondStyle = items[1].getAttribute('style') ?? ''
    const lastStyle = items[2].getAttribute('style') ?? ''
    expect(firstStyle).toContain('border-bottom')
    expect(firstStyle).toContain('1px solid')
    expect(secondStyle).toContain('border-bottom')
    expect(secondStyle).toContain('1px solid')
    // Last item should not have border-bottom at all
    expect(lastStyle).not.toContain('border-bottom')
  })
})
