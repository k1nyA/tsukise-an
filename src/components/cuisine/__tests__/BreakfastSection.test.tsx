import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { BreakfastSection } from '../BreakfastSection'

describe('BreakfastSection', () => {
  it('renders the BREAKFAST English label', () => {
    render(<BreakfastSection />)
    expect(screen.getByText('BREAKFAST')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<BreakfastSection />)
    expect(screen.getByText('朝餉')).toBeInTheDocument()
  })

  it('renders the description text about breakfast', () => {
    render(<BreakfastSection />)
    expect(
      screen.getByText(/箱根の朝を迎える、心温まる朝餉/)
    ).toBeInTheDocument()
  })

  it('renders an image placeholder with aria-label', () => {
    render(<BreakfastSection />)
    expect(screen.getByLabelText('朝食のイメージ')).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<BreakfastSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('uses dark background theme for the content area', () => {
    const { container } = render(<BreakfastSection />)
    const contentArea = container.querySelector('[data-testid="breakfast-content"]')
    expect(contentArea).toBeInTheDocument()
  })
})
