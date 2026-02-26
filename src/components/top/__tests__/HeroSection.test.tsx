import { render, screen } from '@/test/utils'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders the main headline', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('湖と月、')
    expect(heading).toHaveTextContent('そして静寂。')
  })

  it('renders the subtitle text', () => {
    render(<HeroSection />)
    expect(
      screen.getByText('芦ノ湖の湖面に映る月を眺める、全八室の離れ宿')
    ).toBeInTheDocument()
  })

  it('renders the location label', () => {
    render(<HeroSection />)
    expect(screen.getByText('箱根 芦ノ湖畔')).toBeInTheDocument()
  })

  it('renders the CTA link with text and points to #concept', () => {
    render(<HeroSection />)
    expect(screen.getByText('宿を知る')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /宿を知る/ })
    expect(link).toHaveAttribute('href', '#concept')
  })

  it('renders the scroll indicator', () => {
    render(<HeroSection />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
  })

  it('renders a background image with alt text "芦ノ湖畔の月瀬庵"', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('芦ノ湖畔の月瀬庵')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
  })

  it('renders the background image with src containing top-hero-main', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('芦ノ湖畔の月瀬庵')
    expect(img).toHaveAttribute('src', expect.stringContaining('top-hero-main'))
  })

  it('renders the hero overlay for readability', () => {
    render(<HeroSection />)
    const overlay = document.querySelector('[aria-hidden="true"]')
    expect(overlay).toBeInTheDocument()
  })
})
