import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { CTASection } from '../'

describe('CTASection', () => {
  it('renders the CTA title text', () => {
    render(<CTASection />)
    expect(
      screen.getByText(/あなたの特別な一日を/)
    ).toBeInTheDocument()
  })

  it('renders the online reservation button with link to /reservation', () => {
    render(<CTASection />)
    const link = screen.getByRole('link', { name: 'オンライン予約' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/reservation')
  })

  it('renders the phone number', () => {
    render(<CTASection />)
    expect(screen.getByText('0460-83-XXXX')).toBeInTheDocument()
  })

  it('has overlay structure with aria-hidden', () => {
    const { container } = render(<CTASection />)
    const overlay = container.querySelector('[aria-hidden="true"]')
    expect(overlay).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<CTASection />)
    expect(
      screen.getByText('ご予約・お問い合わせはお電話またはオンラインにて承ります')
    ).toBeInTheDocument()
  })

  it('renders a background image element', () => {
    render(<CTASection />)
    // next/image renders an img tag
    const img = document.querySelector('img')
    expect(img).toBeInTheDocument()
  })
})
