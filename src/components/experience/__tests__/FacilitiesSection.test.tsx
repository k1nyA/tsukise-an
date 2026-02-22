import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { FacilitiesSection } from '../FacilitiesSection'

describe('FacilitiesSection', () => {
  it('renders within a section element', () => {
    const { container } = render(<FacilitiesSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the English label "LOUNGE & SPA"', () => {
    render(<FacilitiesSection />)
    expect(screen.getByText('LOUNGE & SPA')).toBeInTheDocument()
  })

  it('renders the section title "館内施設"', () => {
    render(<FacilitiesSection />)
    expect(screen.getByText('館内施設')).toBeInTheDocument()
  })

  it('renders three facility card titles', () => {
    render(<FacilitiesSection />)
    expect(screen.getByText('ラウンジ「月影」')).toBeInTheDocument()
    expect(screen.getByText('ライブラリー')).toBeInTheDocument()
    expect(screen.getByText('SPA「月光」')).toBeInTheDocument()
  })

  it('renders facility descriptions', () => {
    render(<FacilitiesSection />)
    expect(screen.getByText(/芦ノ湖を一望するラウンジで/)).toBeInTheDocument()
    expect(screen.getByText(/旅や文学に関する蔵書を/)).toBeInTheDocument()
    expect(screen.getByText(/アロマトリートメントで/)).toBeInTheDocument()
  })

  it('renders three facility cards', () => {
    const { container } = render(<FacilitiesSection />)
    const cards = container.querySelectorAll('[data-testid="facility-card"]')
    expect(cards.length).toBe(3)
  })

  it('renders a facility image placeholder', () => {
    const { container } = render(<FacilitiesSection />)
    const image = container.querySelector('[data-testid="facility-image"]')
    expect(image).toBeInTheDocument()
  })
})
