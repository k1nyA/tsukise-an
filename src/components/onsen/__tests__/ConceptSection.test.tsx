import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ConceptSection } from '../'

describe('ConceptSection', () => {
  it('renders the section title', () => {
    render(<ConceptSection />)
    expect(screen.getByText('湯に浸り、景に溶ける。')).toBeInTheDocument()
  })

  it('renders the English label "NATURAL HOT SPRING"', () => {
    render(<ConceptSection />)
    expect(screen.getByText('NATURAL HOT SPRING')).toBeInTheDocument()
  })

  it('renders the body text about the onsen experience', () => {
    render(<ConceptSection />)
    expect(
      screen.getByText(/月瀬庵の湯は、古くから「美肌の湯」として知られる姥子温泉。/)
    ).toBeInTheDocument()
  })

  it('renders within a section element', () => {
    const { container } = render(<ConceptSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a decorative vertical line', () => {
    const { container } = render(<ConceptSection />)
    const decoLine = container.querySelector('[data-testid="concept-deco-line"]')
    expect(decoLine).toBeInTheDocument()
  })
})
