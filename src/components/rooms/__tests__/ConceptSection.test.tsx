import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ConceptSection } from '../ConceptSection'

describe('ConceptSection', () => {
  it('renders the CONCEPT English label', () => {
    render(<ConceptSection />)
    expect(screen.getByText('CONCEPT')).toBeInTheDocument()
  })

  it('renders the section title text', () => {
    render(<ConceptSection />)
    expect(screen.getByText('離れの贅、静寂の時。')).toBeInTheDocument()
  })

  it('renders the concept body text describing the ryokan rooms', () => {
    render(<ConceptSection />)
    expect(
      screen.getByText(/月瀬庵の客室は、すべて独立した離れ形式/)
    ).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<ConceptSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a decorative vertical line element', () => {
    const { container } = render(<ConceptSection />)
    const decoLine = container.querySelector('[data-testid="concept-deco-line"]')
    expect(decoLine).toBeInTheDocument()
  })
})
