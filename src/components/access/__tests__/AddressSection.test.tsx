import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { AddressSection } from '../AddressSection'

describe('AddressSection', () => {
  it('renders the LOCATION English label', () => {
    render(<AddressSection />)
    expect(screen.getByText('LOCATION')).toBeInTheDocument()
  })

  it('renders the ryokan name as section title', () => {
    render(<AddressSection />)
    expect(screen.getByText('月瀬庵')).toBeInTheDocument()
  })

  it('renders the postal code and address', () => {
    render(<AddressSection />)
    expect(
      screen.getByText(/〒250-0522/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/神奈川県足柄下郡箱根町元箱根138/)
    ).toBeInTheDocument()
  })

  it('renders the phone and fax number', () => {
    render(<AddressSection />)
    expect(screen.getByText(/TEL.*0460-83-XXXX.*FAX.*0460-83-XXXX/)).toBeInTheDocument()
  })

  it('renders check-in and check-out times', () => {
    render(<AddressSection />)
    expect(screen.getByText(/チェックイン 15:00/)).toBeInTheDocument()
    expect(screen.getByText(/チェックアウト 11:00/)).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<AddressSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a decorative vertical line', () => {
    render(<AddressSection />)
    const decoLine = screen.getByTestId('address-deco-line')
    expect(decoLine).toBeInTheDocument()
  })
})
