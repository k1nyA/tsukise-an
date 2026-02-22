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

  it('renders 3 cuisine card images', () => {
    render(<CuisineSection />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

  it('renders hassun image with correct alt text', () => {
    render(<CuisineSection />)
    const img = screen.getByAltText('八寸')
    expect(img).toBeInTheDocument()
  })

  it('renders yakimono image with correct alt text', () => {
    render(<CuisineSection />)
    const img = screen.getByAltText('焼物')
    expect(img).toBeInTheDocument()
  })

  it('renders mizugashi image with correct alt text', () => {
    render(<CuisineSection />)
    const img = screen.getByAltText('水菓子')
    expect(img).toBeInTheDocument()
  })

  it('renders cuisine images with correct src paths', () => {
    const { container } = render(<CuisineSection />)
    const imgElements = container.querySelectorAll('img')
    const srcValues = Array.from(imgElements).map((img) => img.getAttribute('src') ?? '')

    expect(srcValues.some((src) => src.includes('cuisine-hassun'))).toBe(true)
    expect(srcValues.some((src) => src.includes('cuisine-yakimono'))).toBe(true)
    expect(srcValues.some((src) => src.includes('cuisine-mizugashi'))).toBe(true)
  })
})
