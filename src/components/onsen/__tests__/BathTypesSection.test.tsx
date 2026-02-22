import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { BathTypesSection } from '../BathTypesSection'

describe('BathTypesSection', () => {
  it('renders the section title "三つの湯処"', () => {
    render(<BathTypesSection />)
    expect(screen.getByText('三つの湯処')).toBeInTheDocument()
  })

  it('renders all three bath type names', () => {
    render(<BathTypesSection />)
    expect(screen.getByText('檜の湯')).toBeInTheDocument()
    expect(screen.getByText('岩の湯')).toBeInTheDocument()
    expect(screen.getByText('露天の湯')).toBeInTheDocument()
  })

  it('renders capacity information for each bath', () => {
    render(<BathTypesSection />)
    expect(screen.getByText(/定員4名/)).toBeInTheDocument()
    expect(screen.getByText(/定員3名/)).toBeInTheDocument()
    expect(screen.getByText(/定員5名/)).toBeInTheDocument()
  })

  it('renders description text for each bath type', () => {
    render(<BathTypesSection />)
    expect(screen.getByText(/檜の香り/)).toBeInTheDocument()
    expect(screen.getByText(/自然石/)).toBeInTheDocument()
    expect(screen.getByText(/芦ノ湖/)).toBeInTheDocument()
  })

  it('renders image placeholders with descriptive aria-labels', () => {
    render(<BathTypesSection />)
    expect(screen.getByLabelText('檜の湯の写真')).toBeInTheDocument()
    expect(screen.getByLabelText('岩の湯の写真')).toBeInTheDocument()
    expect(screen.getByLabelText('露天の湯の写真')).toBeInTheDocument()
  })
})
