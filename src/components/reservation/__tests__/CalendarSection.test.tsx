import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { CalendarSection } from '../CalendarSection'

describe('CalendarSection', () => {
  it('renders the SELECT DATE English label', () => {
    render(<CalendarSection />)
    expect(screen.getByText('SELECT DATE')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<CalendarSection />)
    expect(screen.getByText('ご宿泊日を選択')).toBeInTheDocument()
  })

  it('renders the fallback message when calLink is not configured', () => {
    render(<CalendarSection />)
    expect(
      screen.getByText('オンライン予約の準備中です')
    ).toBeInTheDocument()
  })

  it('renders the phone contact fallback note', () => {
    render(<CalendarSection />)
    expect(
      screen.getByText(/お急ぎの場合はお電話にてお問い合わせください/)
    ).toBeInTheDocument()
  })

  it('renders the error alert when env is not set', () => {
    const { container } = render(<CalendarSection />)
    const alert = container.querySelector('[role="alert"]')
    expect(alert).toBeInTheDocument()
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<CalendarSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
