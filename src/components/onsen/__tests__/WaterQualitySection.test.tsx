import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { WaterQualitySection } from '../WaterQualitySection'

describe('WaterQualitySection', () => {
  it('renders the section title "泉質と効能"', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('泉質と効能')).toBeInTheDocument()
  })

  it('renders the water quality type "アルカリ性単純温泉"', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('アルカリ性単純温泉')).toBeInTheDocument()
  })

  it('renders pH value and source temperature', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText(/pH 8.5/)).toBeInTheDocument()
    expect(screen.getByText(/62℃/)).toBeInTheDocument()
  })

  it('renders efficacy items', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('神経痛・筋肉痛')).toBeInTheDocument()
    expect(screen.getByText('疲労回復')).toBeInTheDocument()
    expect(screen.getByText('冷え性改善')).toBeInTheDocument()
    expect(screen.getByText('美肌効果')).toBeInTheDocument()
  })

  it('renders within a section element with dark background data attribute', () => {
    const { container } = render(<WaterQualitySection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('data-theme', 'dark')
  })
})
