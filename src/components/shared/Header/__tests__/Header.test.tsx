import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Header } from '../'

describe('Header', () => {
  it('renders the logo text "月瀬庵"', () => {
    render(<Header />)
    expect(screen.getByText('月瀬庵')).toBeInTheDocument()
  })

  it('renders the logo mark "月"', () => {
    render(<Header />)
    expect(screen.getByText('月')).toBeInTheDocument()
  })

  it('renders the subtitle "TSUKISE-AN"', () => {
    render(<Header />)
    expect(screen.getByText('TSUKISE-AN')).toBeInTheDocument()
  })

  it('renders all 5 nav links with correct text', () => {
    render(<Header />)
    const navTexts = ['客室', '温泉', 'お料理', '過ごし方', 'アクセス']
    for (const text of navTexts) {
      expect(screen.getByRole('link', { name: text })).toBeInTheDocument()
    }
  })

  it('renders nav links with correct href attributes', () => {
    render(<Header />)
    const navLinks = [
      { text: '客室', href: '/rooms' },
      { text: '温泉', href: '/onsen' },
      { text: 'お料理', href: '/cuisine' },
      { text: '過ごし方', href: '/experience' },
      { text: 'アクセス', href: '/access' },
    ]
    for (const { text, href } of navLinks) {
      expect(screen.getByRole('link', { name: text })).toHaveAttribute('href', href)
    }
  })

  it('renders "ご予約" CTA button/link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'ご予約' })).toBeInTheDocument()
  })

  it('renders CTA with correct href to /reservation', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'ご予約' })).toHaveAttribute('href', '/reservation')
  })

  it('renders the logo as a link to home page', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', { name: /月瀬庵/ })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders as a header element', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('contains a navigation element', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the mobile menu button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument()
  })
})
