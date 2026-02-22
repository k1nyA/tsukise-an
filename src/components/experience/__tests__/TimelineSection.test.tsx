import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { TimelineSection } from '../TimelineSection'

describe('TimelineSection', () => {
  it('renders within a section element', () => {
    const { container } = render(<TimelineSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the section title "月瀬庵での一日"', () => {
    render(<TimelineSection />)
    expect(screen.getByText('月瀬庵での一日')).toBeInTheDocument()
  })

  it('renders the English subtitle "A Day at Tsukise-An"', () => {
    render(<TimelineSection />)
    expect(screen.getByText('A Day at Tsukise-An')).toBeInTheDocument()
  })

  it('renders all evening timeline items with times', () => {
    render(<TimelineSection />)
    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByText('15:30')).toBeInTheDocument()
    expect(screen.getByText('16:00')).toBeInTheDocument()
    expect(screen.getByText('17:00')).toBeInTheDocument()
    expect(screen.getByText('18:30')).toBeInTheDocument()
    expect(screen.getByText('20:00')).toBeInTheDocument()
    expect(screen.getByText('21:00')).toBeInTheDocument()
  })

  it('renders all evening timeline titles', () => {
    render(<TimelineSection />)
    expect(screen.getByText('チェックイン・お出迎え')).toBeInTheDocument()
    expect(screen.getByText('お部屋へご案内')).toBeInTheDocument()
    expect(screen.getByText('客室露天風呂')).toBeInTheDocument()
    expect(screen.getByText('庭園散策')).toBeInTheDocument()
    expect(screen.getByText('夕食・懐石料理')).toBeInTheDocument()
    expect(screen.getByText('湯上がりラウンジ')).toBeInTheDocument()
    expect(screen.getByText('月見の湯（大浴場）')).toBeInTheDocument()
  })

  it('renders timeline descriptions', () => {
    render(<TimelineSection />)
    expect(screen.getByText('芦ノ湖を望むロビーでお抹茶とともにお迎え')).toBeInTheDocument()
    expect(screen.getByText('離れの客室で旅の疲れを癒すひととき')).toBeInTheDocument()
    expect(screen.getByText('月替わり懐石を個室食事処で')).toBeInTheDocument()
  })

  it('renders the morning divider text "翌 朝"', () => {
    render(<TimelineSection />)
    expect(screen.getByText('翌 朝')).toBeInTheDocument()
  })

  it('renders morning timeline items', () => {
    render(<TimelineSection />)
    expect(screen.getByText('08:00')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.getByText('11:00')).toBeInTheDocument()
    expect(screen.getByText('朝食')).toBeInTheDocument()
    expect(screen.getByText('チェックアウト準備')).toBeInTheDocument()
    expect(screen.getByText('お見送り')).toBeInTheDocument()
  })

  it('renders timeline dot markers', () => {
    const { container } = render(<TimelineSection />)
    const dots = container.querySelectorAll('[data-testid="timeline-dot"]')
    expect(dots.length).toBe(10)
  })
})
