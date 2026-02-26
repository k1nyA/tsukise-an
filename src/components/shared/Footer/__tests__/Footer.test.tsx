import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Footer } from '../'

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(
      screen.getByText(/© 2026 月瀬庵 TSUKISE-AN\. All Rights Reserved\./)
    ).toBeInTheDocument()
  })

  it('renders the footer logo text "月瀬庵"', () => {
    render(<Footer />)
    expect(screen.getByText('月瀬庵')).toBeInTheDocument()
  })

  it('renders all 6 primary nav links', () => {
    render(<Footer />)
    const primaryNavTexts = ['客室', '温泉', 'お料理', '過ごし方', 'アクセス', 'ご予約']
    for (const text of primaryNavTexts) {
      expect(screen.getByRole('link', { name: text })).toBeInTheDocument()
    }
  })

  it('renders primary nav links with correct href attributes', () => {
    render(<Footer />)
    const primaryLinks = [
      { text: '客室', href: '/rooms' },
      { text: '温泉', href: '/onsen' },
      { text: 'お料理', href: '/cuisine' },
      { text: '過ごし方', href: '/experience' },
      { text: 'アクセス', href: '/access' },
      { text: 'ご予約', href: '/reservation' },
    ]
    for (const { text, href } of primaryLinks) {
      expect(screen.getByRole('link', { name: text })).toHaveAttribute('href', href)
    }
  })

  it('renders secondary nav links', () => {
    render(<Footer />)
    const secondaryNavTexts = ['お知らせ', 'よくあるご質問', 'お問い合わせ']
    for (const text of secondaryNavTexts) {
      expect(screen.getByRole('link', { name: text })).toBeInTheDocument()
    }
  })

  it('renders secondary nav links with correct href attributes', () => {
    render(<Footer />)
    const secondaryLinks = [
      { text: 'お知らせ', href: '/news' },
      { text: 'よくあるご質問', href: '/faq' },
      { text: 'お問い合わせ', href: '/contact' },
    ]
    for (const { text, href } of secondaryLinks) {
      expect(screen.getByRole('link', { name: text })).toHaveAttribute('href', href)
    }
  })

  it('renders legal links', () => {
    render(<Footer />)
    const legalTexts = ['プライバシーポリシー', '特定商取引法に基づく表記', 'サイトマップ']
    for (const text of legalTexts) {
      expect(screen.getByRole('link', { name: text })).toBeInTheDocument()
    }
  })

  it('renders the address info', () => {
    render(<Footer />)
    expect(
      screen.getByText(/〒250-0522/)
    ).toBeInTheDocument()
  })

  it('renders as a footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the logo link to home page', () => {
    render(<Footer />)
    const logoLink = screen.getByRole('link', { name: /月瀬庵/ })
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
