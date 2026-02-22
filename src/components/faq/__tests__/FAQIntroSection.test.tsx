import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { FAQIntroSection } from '../FAQIntroSection'

describe('FAQIntroSection', () => {
  it('renders as a semantic section element', () => {
    const { container } = render(<FAQIntroSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the section label "Q & A"', () => {
    render(<FAQIntroSection />)
    expect(screen.getByText('Q & A')).toBeInTheDocument()
  })

  it('renders the intro title text', () => {
    render(<FAQIntroSection />)
    expect(
      screen.getByText(/ご不明な点がございましたら/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/お気軽にお問い合わせください/)
    ).toBeInTheDocument()
  })

  it('renders a decorative vertical line', () => {
    render(<FAQIntroSection />)
    const deco = screen.getByTestId('faq-intro-deco')
    expect(deco).toBeInTheDocument()
  })

  it('uses ryokan design tokens for styling', () => {
    const { container } = render(<FAQIntroSection />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({ backgroundColor: 'var(--ryokan-bg, #FAF8F3)' })
  })
})
