import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { RoomSelectionSection } from '../RoomSelectionSection'

describe('RoomSelectionSection', () => {
  it('renders the section title', () => {
    render(<RoomSelectionSection />)
    expect(screen.getByText('客室タイプを選択してください')).toBeInTheDocument()
  })

  it('renders four room cards', () => {
    const { container } = render(<RoomSelectionSection />)
    const cards = container.querySelectorAll('[data-testid="room-card"]')
    expect(cards).toHaveLength(4)
  })

  it('renders room English labels', () => {
    render(<RoomSelectionSection />)
    expect(screen.getByText('TSUKIMI')).toBeInTheDocument()
    expect(screen.getByText('KACHO')).toBeInTheDocument()
    expect(screen.getByText('FUGA')).toBeInTheDocument()
    expect(screen.getByText('MIKAGAMI')).toBeInTheDocument()
  })

  it('renders room Japanese names', () => {
    render(<RoomSelectionSection />)
    expect(screen.getByText('月見の間')).toBeInTheDocument()
    expect(screen.getByText('花鳥の間')).toBeInTheDocument()
    expect(screen.getByText('風雅の間')).toBeInTheDocument()
    expect(screen.getByText('水鏡の間')).toBeInTheDocument()
  })

  it('renders room prices', () => {
    render(<RoomSelectionSection />)
    expect(screen.getByText(/¥85,000〜/)).toBeInTheDocument()
    expect(screen.getByText(/¥65,000〜/)).toBeInTheDocument()
    expect(screen.getByText(/¥55,000〜/)).toBeInTheDocument()
    expect(screen.getByText(/¥45,000〜 \/ 1泊2食付/)).toBeInTheDocument()
  })

  it('renders booking buttons for each room', () => {
    render(<RoomSelectionSection />)
    const buttons = screen.getAllByText('この客室を予約する')
    expect(buttons).toHaveLength(4)
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<RoomSelectionSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
