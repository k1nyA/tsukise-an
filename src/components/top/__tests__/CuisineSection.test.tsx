import { render, screen } from '@/test/utils'
import { CuisineSection } from '../CuisineSection'

describe('CuisineSection', () => {
  it('renders the CUISINE english label', () => {
    render(<CuisineSection />)
    expect(screen.getByText('CUISINE')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<CuisineSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('旬を紡ぐ、月替わり懐石')
  })

  it('renders the description mentioning Michelin stars', () => {
    render(<CuisineSection />)
    expect(screen.getByText(/ミシュラン二つ星/)).toBeInTheDocument()
  })

  it('renders dish cards with titles', () => {
    render(<CuisineSection />)
    expect(screen.getByText('八寸')).toBeInTheDocument()
    expect(screen.getByText('焼物')).toBeInTheDocument()
    expect(screen.getByText('水菓子')).toBeInTheDocument()
  })

  it('renders on a dark background section', () => {
    const { container } = render(<CuisineSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
