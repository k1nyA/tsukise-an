import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { MannerSection } from '../MannerSection'

describe('MannerSection', () => {
  it('renders the guide section title "ご利用案内"', () => {
    render(<MannerSection />)
    expect(screen.getByText('ご利用案内')).toBeInTheDocument()
  })

  it('renders the etiquette section title "入浴のご案内"', () => {
    render(<MannerSection />)
    expect(screen.getByText('入浴のご案内')).toBeInTheDocument()
  })

  it('renders all guide item titles', () => {
    render(<MannerSection />)
    expect(screen.getByText('利用時間')).toBeInTheDocument()
    expect(screen.getByText('貸切予約')).toBeInTheDocument()
    expect(screen.getByText('お子様')).toBeInTheDocument()
  })

  it('renders description text for guide items', () => {
    render(<MannerSection />)
    expect(screen.getByText(/15:00〜翌10:00/)).toBeInTheDocument()
    expect(screen.getByText(/フロントにて/)).toBeInTheDocument()
    expect(screen.getByText(/バスタオル/)).toBeInTheDocument()
    expect(screen.getByText(/保護者の方/)).toBeInTheDocument()
  })

  it('renders etiquette items', () => {
    render(<MannerSection />)
    expect(screen.getByText('かけ湯')).toBeInTheDocument()
    expect(screen.getByText('飲食')).toBeInTheDocument()
    expect(screen.getByText('静粛')).toBeInTheDocument()
  })

  it('renders section elements', () => {
    const { container } = render(<MannerSection />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(2)
  })
})
