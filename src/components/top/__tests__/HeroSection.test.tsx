import { render, screen } from '@/test/utils'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders the main headline with ryokan name', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('月瀬庵')
  })

  it('renders the subtitle text', () => {
    render(<HeroSection />)
    expect(screen.getByText('心を解くひととき')).toBeInTheDocument()
  })

  it('renders the English label TSUKISE-AN', () => {
    render(<HeroSection />)
    expect(screen.getByText('TSUKISE-AN')).toBeInTheDocument()
  })

  it('renders the scroll indicator', () => {
    render(<HeroSection />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
  })

  it('renders the location label', () => {
    render(<HeroSection />)
    expect(screen.getByText('箱根 芦ノ湖畔')).toBeInTheDocument()
  })

  it('renders a background image with alt text "芦ノ湖畔の月瀬庵"', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('芦ノ湖畔の月瀬庵')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
  })

  it('renders the background image with src containing top-hero-main.png', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('芦ノ湖畔の月瀬庵')
    expect(img).toHaveAttribute('src', expect.stringContaining('top-hero-main.png'))
  })
})
