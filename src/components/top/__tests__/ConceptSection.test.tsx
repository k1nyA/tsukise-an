import { render, screen } from '@/test/utils'
import { ConceptSection } from '../ConceptSection'

describe('ConceptSection', () => {
  it('renders the CONCEPT english label', () => {
    render(<ConceptSection />)
    expect(screen.getByText('CONCEPT')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<ConceptSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('百三十年、変わらぬもてなし。')
  })

  it('renders the body text about establishment history', () => {
    render(<ConceptSection />)
    expect(screen.getByText(/明治二十八年の創業以来/)).toBeInTheDocument()
  })

  it('renders body text about the experience promised', () => {
    render(<ConceptSection />)
    expect(screen.getByText(/時の流れを忘れ/)).toBeInTheDocument()
  })

  it('renders as a section element', () => {
    const { container } = render(<ConceptSection />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })
})
