import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { IngredientsSection } from '../IngredientsSection'

describe('IngredientsSection', () => {
  it('renders the INGREDIENTS English label', () => {
    render(<IngredientsSection />)
    expect(screen.getByText('INGREDIENTS')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<IngredientsSection />)
    expect(screen.getByText('食材へのこだわり')).toBeInTheDocument()
  })

  it('renders the description text about local ingredients', () => {
    render(<IngredientsSection />)
    expect(
      screen.getByText(/小田原漁港から届く朝獲れの鮮魚/)
    ).toBeInTheDocument()
  })

  it('renders an image with descriptive alt text', () => {
    render(<IngredientsSection />)
    expect(screen.getByAltText('食材のイメージ')).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<IngredientsSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
