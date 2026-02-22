import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ActivitiesSection } from '../ActivitiesSection'

describe('ActivitiesSection', () => {
  it('renders within a section element', () => {
    const { container } = render(<ActivitiesSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the English label "ACTIVITIES"', () => {
    render(<ActivitiesSection />)
    expect(screen.getByText('ACTIVITIES')).toBeInTheDocument()
  })

  it('renders the section title "周辺のお愉しみ"', () => {
    render(<ActivitiesSection />)
    expect(screen.getByText('周辺のお愉しみ')).toBeInTheDocument()
  })

  it('renders all four activity titles', () => {
    render(<ActivitiesSection />)
    expect(screen.getByText('芦ノ湖遊覧船')).toBeInTheDocument()
    expect(screen.getByText('箱根旧街道ウォーク')).toBeInTheDocument()
    expect(screen.getByText('寄木細工体験')).toBeInTheDocument()
    expect(screen.getByText('箱根神社参拝')).toBeInTheDocument()
  })

  it('renders activity descriptions', () => {
    render(<ActivitiesSection />)
    expect(screen.getByText(/海賊船で芦ノ湖を周遊/)).toBeInTheDocument()
    expect(screen.getByText(/江戸時代の石畳を歩く/)).toBeInTheDocument()
    expect(screen.getByText(/箱根伝統の工芸品を/)).toBeInTheDocument()
    expect(screen.getByText(/縁結びの名所として/)).toBeInTheDocument()
  })

  it('renders four activity cards', () => {
    const { container } = render(<ActivitiesSection />)
    const cards = container.querySelectorAll('[data-testid="activity-card"]')
    expect(cards.length).toBe(4)
  })

  it('renders the label with gold variant styling', () => {
    render(<ActivitiesSection />)
    const label = screen.getByText('ACTIVITIES')
    expect(label).toBeInTheDocument()
  })
})
