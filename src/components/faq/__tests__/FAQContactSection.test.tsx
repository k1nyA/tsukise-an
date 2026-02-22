import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { FAQContactSection } from '../FAQContactSection'

describe('FAQContactSection', () => {
  it('renders as a semantic section element', () => {
    const { container } = render(<FAQContactSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the contact box title', () => {
    render(<FAQContactSection />)
    expect(
      screen.getByText('ご質問が見つからない場合は')
    ).toBeInTheDocument()
  })

  it('renders the contact description text', () => {
    render(<FAQContactSection />)
    expect(
      screen.getByText(/お探しの回答が見つからない場合は/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/お電話またはメールにて、丁寧にお答えいたします/)
    ).toBeInTheDocument()
  })

  it('renders a contact/inquiry button link', () => {
    render(<FAQContactSection />)
    const contactLink = screen.getByRole('link', { name: /お問い合わせ/ })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders a phone number link', () => {
    render(<FAQContactSection />)
    const phoneLink = screen.getByRole('link', { name: /0460-83-XXXX/ })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:0460-83-XXXX')
  })

  it('renders the dark contact box with correct styling', () => {
    render(<FAQContactSection />)
    const box = screen.getByTestId('faq-contact-box')
    expect(box).toHaveStyle({
      backgroundColor: 'var(--ryokan-dark, #2C2418)',
    })
  })
})
