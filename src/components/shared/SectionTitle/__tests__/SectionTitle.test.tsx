import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { SectionTitle } from '../'

describe('SectionTitle', () => {
  it('renders the title text', () => {
    render(<SectionTitle>お料理のご案内</SectionTitle>)
    expect(screen.getByText('お料理のご案内')).toBeInTheDocument()
  })

  it('renders two decorative line elements', () => {
    const { container } = render(<SectionTitle>客室のご案内</SectionTitle>)
    const lines = container.querySelectorAll('[data-testid="section-title-line"]')
    expect(lines.length).toBe(2)
  })

  it('decorative lines have gold color and correct dimensions', () => {
    const { container } = render(<SectionTitle>温泉</SectionTitle>)
    const lines = container.querySelectorAll('[data-testid="section-title-line"]')
    expect(lines[0]).toHaveStyle({
      backgroundColor: '#D4C5A0',
      width: '40px',
      height: '1px',
    })
    expect(lines[1]).toHaveStyle({
      backgroundColor: '#D4C5A0',
      width: '40px',
      height: '1px',
    })
  })

  it('applies correct text styling', () => {
    render(<SectionTitle>月瀬庵について</SectionTitle>)
    const title = screen.getByText('月瀬庵について')
    expect(title).toHaveStyle({ color: '#2C2418', textAlign: 'center' })
  })
})
