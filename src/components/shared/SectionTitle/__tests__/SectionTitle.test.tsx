import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { SectionTitle } from '../'

describe('SectionTitle', () => {
  it('renders the title text as h2', () => {
    render(<SectionTitle>お料理のご案内</SectionTitle>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('お料理のご案内')
  })

  it('applies correct text styling from CSS variables', () => {
    render(<SectionTitle>月瀬庵について</SectionTitle>)
    const title = screen.getByText('月瀬庵について')
    expect(title.tagName).toBe('H2')
    expect(title).toHaveStyle({ textAlign: 'center' })
  })

  it('renders as a plain h2 without decorative elements', () => {
    const { container } = render(<SectionTitle>温泉</SectionTitle>)
    // SectionTitle is just a styled h2; no wrapping div or decorative lines
    expect(container.firstChild?.nodeName).toBe('H2')
  })
})
