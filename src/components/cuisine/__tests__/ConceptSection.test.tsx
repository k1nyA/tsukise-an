import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ConceptSection } from '../ConceptSection'

describe('ConceptSection', () => {
  it('renders the PHILOSOPHY English label', () => {
    render(<ConceptSection />)
    expect(screen.getByText('PHILOSOPHY')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<ConceptSection />)
    expect(screen.getByText('土地の恵みを、一皿に。')).toBeInTheDocument()
  })

  it('renders the concept body text about kaiseki cuisine', () => {
    render(<ConceptSection />)
    expect(
      screen.getByText(/月瀬庵の料理長・水月が手掛ける月替わり懐石/)
    ).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<ConceptSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a decorative vertical line element', () => {
    const { container } = render(<ConceptSection />)
    const decoLine = container.querySelector('[data-testid="cuisine-concept-deco-line"]')
    expect(decoLine).toBeInTheDocument()
  })
})
