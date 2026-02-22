import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { BookingMethodsSection } from '../BookingMethodsSection'

describe('BookingMethodsSection', () => {
  it('renders the section title', () => {
    render(<BookingMethodsSection />)
    expect(screen.getByText('ご予約方法')).toBeInTheDocument()
  })

  it('renders the online booking method', () => {
    render(<BookingMethodsSection />)
    expect(screen.getByText('オンライン予約')).toBeInTheDocument()
    expect(
      screen.getByText(/Cal\.comより24時間/)
    ).toBeInTheDocument()
  })

  it('renders the phone booking method', () => {
    render(<BookingMethodsSection />)
    expect(screen.getByText('お電話')).toBeInTheDocument()
    expect(screen.getByText(/0460-83-XXXX/)).toBeInTheDocument()
    expect(screen.getByText(/受付時間 9:00〜20:00/)).toBeInTheDocument()
  })

  it('renders the travel site booking method', () => {
    render(<BookingMethodsSection />)
    expect(screen.getByText('旅行サイト')).toBeInTheDocument()
    expect(
      screen.getByText(/一休\.com等の/)
    ).toBeInTheDocument()
  })

  it('renders three booking method cards', () => {
    const { container } = render(<BookingMethodsSection />)
    const cards = container.querySelectorAll('[data-testid="booking-method-card"]')
    expect(cards).toHaveLength(3)
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<BookingMethodsSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
