import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { MapSection } from '../MapSection'

describe('MapSection', () => {
  it('renders the section as a semantic section element', () => {
    const { container } = render(<MapSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the Google Map link text', () => {
    render(<MapSection />)
    expect(screen.getByText(/Google Mapで見る/)).toBeInTheDocument()
  })

  it('renders the Google Map link pointing to the correct location', () => {
    render(<MapSection />)
    const link = screen.getByRole('link', { name: /Google Mapで見る/ })
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('maps.google.com')
    )
  })

  it('opens the Google Map link in a new tab', () => {
    render(<MapSection />)
    const link = screen.getByRole('link', { name: /Google Mapで見る/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('renders a map placeholder frame', () => {
    render(<MapSection />)
    const mapFrame = screen.getByTestId('map-frame')
    expect(mapFrame).toBeInTheDocument()
  })
})
