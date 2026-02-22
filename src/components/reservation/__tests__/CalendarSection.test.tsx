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

  it('renders the Cal.com placeholder text', () => {
    render(<CalendarSection />)
    expect(
      screen.getByText(/Cal\.com カレンダーウィジェット/)
    ).toBeInTheDocument()
  })

  it('renders the placeholder note about Cal.com', () => {
    render(<CalendarSection />)
    expect(
      screen.getByText(/実際のサイトでは Cal\.com のカレンダーが表示されます/)
    ).toBeInTheDocument()
  })

  it('renders the calendar widget container', () => {
    const { container } = render(<CalendarSection />)
    const widget = container.querySelector('[data-testid="cal-widget"]')
    expect(widget).toBeInTheDocument()
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<CalendarSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
