import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { BathTypesSection } from '../BathTypesSection'

describe('BathTypesSection', () => {
  it('renders the daiyokujo section title', () => {
    render(<BathTypesSection />)
    expect(screen.getByText('大浴場')).toBeInTheDocument()
  })

  it('renders the rotenburo section title', () => {
    render(<BathTypesSection />)
    expect(screen.getByText('露天風呂')).toBeInTheDocument()
  })

  it('renders subtitle text for each bath type', () => {
    render(<BathTypesSection />)
    expect(screen.getByText('檜の湯・岩の湯')).toBeInTheDocument()
    expect(screen.getByText(/芦ノ湖を望む/)).toBeInTheDocument()
  })

  it('renders description text for each bath type', () => {
    render(<BathTypesSection />)
    expect(screen.getByText(/檜の香り/)).toBeInTheDocument()
    expect(screen.getByText(/四季折々の景色/)).toBeInTheDocument()
  })

  it('renders images with descriptive alt text', () => {
    render(<BathTypesSection />)
    expect(screen.getByAltText('大浴場の写真')).toBeInTheDocument()
    expect(screen.getByAltText('露天風呂の写真')).toBeInTheDocument()
  })

  it('renders two section elements', () => {
    const { container } = render(<BathTypesSection />)
    const sections = container.querySelectorAll('section')
    expect(sections).toHaveLength(2)
  })
})
