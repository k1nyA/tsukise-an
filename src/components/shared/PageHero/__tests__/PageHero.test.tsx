import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { PageHero } from '../'

describe('PageHero', () => {
  it('renders the title text', () => {
    render(<PageHero title="お料理" labelEn="CUISINE" />)
    expect(screen.getByText('お料理')).toBeInTheDocument()
  })

  it('renders the English label text', () => {
    render(<PageHero title="お料理" labelEn="CUISINE" />)
    expect(screen.getByText('CUISINE')).toBeInTheDocument()
  })

  it('has proper background structure with overlay element', () => {
    const { container } = render(
      <PageHero title="客室" labelEn="ROOMS" backgroundImage="/images/rooms-hero.jpg" />
    )
    const overlay = container.querySelector('[data-testid="hero-overlay"]')
    expect(overlay).toBeInTheDocument()
  })

  it('renders decorative lines alongside the label', () => {
    const { container } = render(<PageHero title="お料理" labelEn="CUISINE" />)
    const lines = container.querySelectorAll('[data-testid="hero-deco-line"]')
    expect(lines.length).toBe(2)
  })

  it('applies background image when provided', () => {
    const { container } = render(
      <PageHero title="客室" labelEn="ROOMS" backgroundImage="/images/rooms-hero.jpg" />
    )
    const bgElement = container.querySelector('[data-testid="hero-bg"]')
    expect(bgElement).toBeInTheDocument()
    expect(bgElement).toHaveStyle({ backgroundImage: 'url(/images/rooms-hero.jpg)' })
  })
})
