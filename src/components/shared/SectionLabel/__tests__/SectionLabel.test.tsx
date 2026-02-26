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

  it('applies default variant with subtle text color via CSS var', () => {
    render(<SectionLabel english="ABOUT" />)
    const label = screen.getByText('ABOUT')
    // Uses CSS variable; check it contains the var reference
    expect(label.style.color).toContain('--ryokan-subtle')
  })

  it('applies gold variant with gold text color via CSS var', () => {
    render(<SectionLabel english="RESERVATION" variant="gold" />)
    const label = screen.getByText('RESERVATION')
    expect(label.style.color).toContain('--ryokan-gold')
  })

  it('gold variant uses gold color for decorative lines', () => {
    const { container } = render(
      <SectionLabel english="RESERVATION" variant="gold" />
    )
    const lines = container.querySelectorAll('[data-testid="section-label-line"]')
    expect(lines[0].getAttribute('style')).toContain('--ryokan-gold')
    expect(lines[1].getAttribute('style')).toContain('--ryokan-gold')
  })

  it('default variant uses light-gold for decorative lines', () => {
    const { container } = render(
      <SectionLabel english="ROOMS" />
    )
    const lines = container.querySelectorAll('[data-testid="section-label-line"]')
    expect(lines[0].getAttribute('style')).toContain('--ryokan-light-gold')
    expect(lines[1].getAttribute('style')).toContain('--ryokan-light-gold')
  })
})
