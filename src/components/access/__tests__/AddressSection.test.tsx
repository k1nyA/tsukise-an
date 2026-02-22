import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { AddressSection } from '../AddressSection'

describe('AddressSection', () => {
  it('renders the ADDRESS English label', () => {
    render(<AddressSection />)
    expect(screen.getByText('ADDRESS')).toBeInTheDocument()
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

  it('renders the phone number', () => {
    render(<AddressSection />)
    expect(screen.getByText(/0460-83-XXXX/)).toBeInTheDocument()
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
