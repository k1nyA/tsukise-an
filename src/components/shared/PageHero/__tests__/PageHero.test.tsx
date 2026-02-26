import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { PageHero } from '../'

describe('PageHero', () => {
  it('renders the title text as h1', () => {
    render(<PageHero title="お料理" labelEn="CUISINE" />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('お料理')
  })

  it('renders the English label text', () => {
    render(<PageHero title="お料理" labelEn="CUISINE" />)
    expect(screen.getByText('CUISINE')).toBeInTheDocument()
  })

  it('has an overlay element', () => {
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

  it('renders fallback dark background when no backgroundImage', () => {
    const { container } = render(
      <PageHero title="客室" labelEn="ROOMS" />
    )
    const bgElement = container.querySelector('[data-testid="hero-bg"]')
    expect(bgElement).toBeInTheDocument()
  })

  it('renders next/image when backgroundImage is provided', () => {
    render(
      <PageHero title="客室" labelEn="ROOMS" backgroundImage="/images/rooms-hero.jpg" />
    )
    const img = document.querySelector('img')
    expect(img).toBeInTheDocument()
  })

  it('renders optional subtitle when provided', () => {
    render(
      <PageHero title="客室" labelEn="ROOMS" subtitle="静寂の離れ" />
    )
    expect(screen.getByText('静寂の離れ')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(
      <PageHero title="客室" labelEn="ROOMS" />
    )
    // Only h1 and label text should exist - no <p> for subtitle
    expect(container.querySelector('p')).toBeNull()
  })
})
