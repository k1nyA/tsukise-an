import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { SectionLabel } from '../'

describe('SectionLabel', () => {
  it('renders the English text', () => {
    render(<SectionLabel english="CUISINE" />)
    expect(screen.getByText('CUISINE')).toBeInTheDocument()
  })

  it('renders decorative lines', () => {
    const { container } = render(<SectionLabel english="ROOMS" />)
    const lines = container.querySelectorAll('[data-testid="section-label-line"]')
    expect(lines.length).toBe(2)
  })

  it('applies default variant styling with subtle text color', () => {
    render(<SectionLabel english="ABOUT" />)
    const label = screen.getByText('ABOUT')
    expect(label).toHaveStyle({ color: '#8B7D6B' })
  })

  it('applies gold variant styling with gold text color', () => {
    render(<SectionLabel english="RESERVATION" variant="gold" />)
    const label = screen.getByText('RESERVATION')
    expect(label).toHaveStyle({ color: '#8B6914' })
  })

  it('gold variant uses gold color for decorative lines', () => {
    const { container } = render(
      <SectionLabel english="RESERVATION" variant="gold" />
    )
    const lines = container.querySelectorAll('[data-testid="section-label-line"]')
    expect(lines[0]).toHaveStyle({ backgroundColor: '#8B6914' })
    expect(lines[1]).toHaveStyle({ backgroundColor: '#8B6914' })
  })
})
