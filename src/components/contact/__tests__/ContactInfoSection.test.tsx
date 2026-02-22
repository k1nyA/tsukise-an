import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ContactInfoSection } from '../ContactInfoSection'

describe('ContactInfoSection', () => {
  it('renders the section as a semantic section element', () => {
    const { container } = render(<ContactInfoSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  // --- Phone column ---
  it('renders the phone section title', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('お電話でのお問い合わせ')).toBeInTheDocument()
  })

  it('renders the phone number prominently in the phone column', () => {
    render(<ContactInfoSection />)
    const phoneLink = screen.getByRole('link', { name: '0460-83-XXXX' })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:0460-83-XXXX')
  })

  it('renders the phone business hours', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText(/受付時間：9:00〜20:00/)).toBeInTheDocument()
    expect(screen.getByText(/年中無休/)).toBeInTheDocument()
  })

  it('renders the phone number as a clickable tel link', () => {
    render(<ContactInfoSection />)
    const phoneLink = screen.getByRole('link', { name: '0460-83-XXXX' })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:0460-83-XXXX')
  })

  // --- Divider ---
  it('renders a decorative divider line', () => {
    render(<ContactInfoSection />)
    const divider = screen.getByTestId('contact-info-divider')
    expect(divider).toBeInTheDocument()
  })

  // --- FAX column ---
  it('renders the FAX label', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('FAX')).toBeInTheDocument()
  })

  it('renders the FAX number', () => {
    render(<ContactInfoSection />)
    // FAX and phone share same area code pattern, use getAllByText
    const faxNumbers = screen.getAllByText('0460-83-XXXX')
    expect(faxNumbers.length).toBeGreaterThanOrEqual(2) // phone + fax
  })

  // --- Mail column ---
  it('renders the mail label', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('メール')).toBeInTheDocument()
  })

  it('renders the email address', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('info@tsukise-an.jp')).toBeInTheDocument()
  })

  it('renders the email as a mailto link', () => {
    render(<ContactInfoSection />)
    const mailLink = screen.getByRole('link', { name: 'info@tsukise-an.jp' })
    expect(mailLink).toBeInTheDocument()
    expect(mailLink).toHaveAttribute('href', 'mailto:info@tsukise-an.jp')
  })

  // --- LINE column ---
  it('renders the LINE label', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('LINE公式アカウント')).toBeInTheDocument()
  })

  it('renders the LINE ID', () => {
    render(<ContactInfoSection />)
    expect(screen.getByText('@tsukise-an')).toBeInTheDocument()
  })
})
