import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { PlanSection } from '../PlanSection'

describe('PlanSection', () => {
  it('renders the section title', () => {
    render(<PlanSection />)
    expect(screen.getByText('宿泊プラン')).toBeInTheDocument()
  })

  it('renders three plan cards', () => {
    const { container } = render(<PlanSection />)
    const cards = container.querySelectorAll('[data-testid="plan-card"]')
    expect(cards).toHaveLength(3)
  })

  it('renders the standard plan', () => {
    render(<PlanSection />)
    expect(screen.getByText('スタンダードプラン')).toBeInTheDocument()
    expect(screen.getByText('一泊二食付きの基本プラン')).toBeInTheDocument()
    expect(screen.getByText('¥45,000〜')).toBeInTheDocument()
  })

  it('renders the anniversary plan', () => {
    render(<PlanSection />)
    expect(screen.getByText('記念日プラン')).toBeInTheDocument()
    expect(screen.getByText('特別な日を彩る記念日プラン')).toBeInTheDocument()
    expect(screen.getByText('¥65,000〜')).toBeInTheDocument()
  })

  it('renders the consecutive stay plan', () => {
    render(<PlanSection />)
    expect(screen.getByText('連泊プラン')).toBeInTheDocument()
    expect(screen.getByText('2泊以上でお得な連泊プラン')).toBeInTheDocument()
    expect(screen.getByText('¥40,000〜/泊')).toBeInTheDocument()
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<PlanSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders plan images with alt text', () => {
    render(<PlanSection />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
    expect(images[0]).toHaveAttribute('alt', 'スタンダードプラン')
    expect(images[1]).toHaveAttribute('alt', '記念日プラン')
    expect(images[2]).toHaveAttribute('alt', '連泊プラン')
  })
})
