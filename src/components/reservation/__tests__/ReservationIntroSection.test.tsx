import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ReservationIntroSection } from '../ReservationIntroSection'

describe('ReservationIntroSection', () => {
  it('renders the BOOKING FLOW English label', () => {
    render(<ReservationIntroSection />)
    expect(screen.getByText('BOOKING FLOW')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<ReservationIntroSection />)
    expect(screen.getByText('ご予約の流れ')).toBeInTheDocument()
  })

  it('renders three numbered steps', () => {
    render(<ReservationIntroSection />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders step labels', () => {
    render(<ReservationIntroSection />)
    expect(screen.getByText('客室タイプを選択')).toBeInTheDocument()
    expect(screen.getByText('日程を選択')).toBeInTheDocument()
    expect(screen.getByText('予約確定')).toBeInTheDocument()
  })

  it('renders arrow separators between steps', () => {
    const { container } = render(<ReservationIntroSection />)
    const arrows = container.querySelectorAll('[data-testid="step-arrow"]')
    expect(arrows).toHaveLength(2)
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<ReservationIntroSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
