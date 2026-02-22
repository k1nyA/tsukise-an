import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { RoomGridSection } from '../RoomGridSection'

describe('RoomGridSection', () => {
  it('renders the section heading text', () => {
    render(<RoomGridSection />)
    expect(screen.getByText('客室のご案内')).toBeInTheDocument()
  })

  it('renders all 8 room names', () => {
    render(<RoomGridSection />)
    const roomNames = [
      '月見の間',
      '花鳥の間',
      '風雅の間',
      '水鏡の間',
      '松風の間',
      '雪月の間',
      '朝霧の間',
      '夕凪の間',
    ]
    roomNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('renders room capacity/location info for each room', () => {
    render(<RoomGridSection />)
    expect(screen.getByText(/120㎡/)).toBeInTheDocument()
    expect(screen.getByText(/85㎡/)).toBeInTheDocument()
    expect(screen.getByText(/70㎡/)).toBeInTheDocument()
  })

  it('renders English label for each room', () => {
    render(<RoomGridSection />)
    expect(screen.getByText('TSUKIMI')).toBeInTheDocument()
    expect(screen.getByText('FUGA')).toBeInTheDocument()
    expect(screen.getByText('YUNAGI')).toBeInTheDocument()
  })

  it('renders the vacancy link to reservation page', () => {
    render(<RoomGridSection />)
    const vacancyLink = screen.getByRole('link', { name: /空室を確認する/ })
    expect(vacancyLink).toBeInTheDocument()
    expect(vacancyLink).toHaveAttribute('href', '/reservation')
  })
})
