import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Breadcrumb } from '../'

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: 'ホーム', href: '/' },
    { label: '客室' },
  ]

  it('renders all breadcrumb items', () => {
    render(<Breadcrumb items={defaultItems} />)
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('客室')).toBeInTheDocument()
  })

  it('renders first items as links with correct href', () => {
    render(<Breadcrumb items={defaultItems} />)
    const homeLink = screen.getByRole('link', { name: 'ホーム' })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders the last item without a link', () => {
    render(<Breadcrumb items={defaultItems} />)
    const lastItem = screen.getByText('客室')
    // The last item should not be inside a link
    expect(lastItem.closest('a')).toBeNull()
  })

  it('renders separator ">" between items', () => {
    render(<Breadcrumb items={defaultItems} />)
    const separators = screen.getAllByText('>')
    expect(separators).toHaveLength(1)
  })

  it('renders multiple separators for 3-level breadcrumb', () => {
    const threeItems = [
      { label: 'ホーム', href: '/' },
      { label: 'お知らせ', href: '/news' },
      { label: '記事タイトル' },
    ]
    render(<Breadcrumb items={threeItems} />)
    const separators = screen.getAllByText('>')
    expect(separators).toHaveLength(2)
  })

  it('renders middle items as links in 3-level breadcrumb', () => {
    const threeItems = [
      { label: 'ホーム', href: '/' },
      { label: 'お知らせ', href: '/news' },
      { label: '記事タイトル' },
    ]
    render(<Breadcrumb items={threeItems} />)
    expect(screen.getByRole('link', { name: 'ホーム' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'お知らせ' })).toHaveAttribute('href', '/news')
    // Last item is not a link
    expect(screen.getByText('記事タイトル').closest('a')).toBeNull()
  })

  it('renders as a nav element with aria-label', () => {
    render(<Breadcrumb items={defaultItems} />)
    expect(screen.getByRole('navigation', { name: /パンくず/ })).toBeInTheDocument()
  })

  it('renders the last item with bold styling (fontWeight 500)', () => {
    render(<Breadcrumb items={defaultItems} />)
    const lastItem = screen.getByText('客室')
    expect(lastItem).toHaveStyle({ fontWeight: '500' })
  })
})
