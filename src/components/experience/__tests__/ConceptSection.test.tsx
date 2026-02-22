import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ConceptSection } from '../ConceptSection'

describe('ConceptSection (Experience)', () => {
  it('renders within a section element', () => {
    const { container } = render(<ConceptSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the English label "EXPERIENCE"', () => {
    render(<ConceptSection />)
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<ConceptSection />)
    expect(screen.getByText('時の流れに身を委ねて。')).toBeInTheDocument()
  })

  it('renders the concept body text', () => {
    render(<ConceptSection />)
    expect(
      screen.getByText(/月瀬庵での滞在は、時計を忘れることから始まります。/)
    ).toBeInTheDocument()
  })

  it('renders the second paragraph of body text', () => {
    render(<ConceptSection />)
    expect(
      screen.getByText(/四季折々の自然が、その日だけの体験を/)
    ).toBeInTheDocument()
  })

  it('renders a decorative vertical line', () => {
    const { container } = render(<ConceptSection />)
    const decoLine = container.querySelector('[data-testid="experience-concept-deco-line"]')
    expect(decoLine).toBeInTheDocument()
  })

  it('renders the title as an h2 element', () => {
    render(<ConceptSection />)
    const heading = screen.getByRole('heading', { level: 2, name: '時の流れに身を委ねて。' })
    expect(heading).toBeInTheDocument()
  })
})
