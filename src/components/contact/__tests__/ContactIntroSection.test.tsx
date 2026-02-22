import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ContactIntroSection } from '../ContactIntroSection'

describe('ContactIntroSection', () => {
  it('renders the INQUIRY English label', () => {
    render(<ContactIntroSection />)
    expect(screen.getByText('INQUIRY')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<ContactIntroSection />)
    expect(screen.getByText('お気軽にご相談ください')).toBeInTheDocument()
  })

  it('renders the introductory body text with consultation topics', () => {
    render(<ContactIntroSection />)
    expect(screen.getByText(/ご宿泊のご相談/)).toBeInTheDocument()
    expect(screen.getByText(/お祝い事やご接待のご要望/)).toBeInTheDocument()
  })

  it('renders the response time notice', () => {
    render(<ContactIntroSection />)
    expect(screen.getByText(/通常2営業日以内にご返信/)).toBeInTheDocument()
  })

  it('renders the phone number for urgent inquiries', () => {
    render(<ContactIntroSection />)
    expect(screen.getByText(/0460-83-XXXX/)).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<ContactIntroSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a decorative vertical line', () => {
    render(<ContactIntroSection />)
    const decoLine = screen.getByTestId('intro-deco-line')
    expect(decoLine).toBeInTheDocument()
  })
})
