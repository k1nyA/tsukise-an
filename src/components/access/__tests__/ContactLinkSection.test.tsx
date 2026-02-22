import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ContactLinkSection } from '../ContactLinkSection'

describe('ContactLinkSection', () => {
  it('renders the section as a semantic section element', () => {
    const { container } = render(<ContactLinkSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the contact link text', () => {
    render(<ContactLinkSection />)
    expect(screen.getByText(/お問い合わせ/)).toBeInTheDocument()
  })

  it('renders the contact link pointing to /contact', () => {
    render(<ContactLinkSection />)
    const link = screen.getByRole('link', { name: /お問い合わせ/ })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
