import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { FAQCategorySection } from '../FAQCategorySection'

const reservationProps = {
  title: 'ご予約について',
  icon: 'calendar' as const,
  variant: 'light' as const,
  items: [
    {
      question: '予約はいつから可能ですか？',
      answer:
        'ご宿泊日の6ヶ月前より、オンラインまたはお電話にてご予約を承っております。特に桜や紅葉の季節は大変人気がございますので、お早めのご予約をお勧めいたします。',
    },
    {
      question: 'キャンセル料はかかりますか？',
    },
    {
      question: 'チェックイン・チェックアウトの時間は？',
    },
  ],
}

const onsenProps = {
  title: '温泉・お部屋について',
  icon: 'waves' as const,
  variant: 'alt' as const,
  items: [
    { question: '客室の露天風呂は24時間利用できますか？' },
    { question: '大浴場の営業時間を教えてください。' },
    { question: 'お部屋にアメニティはありますか？' },
  ],
}

describe('FAQCategorySection', () => {
  it('renders as a semantic section element', () => {
    const { container } = render(<FAQCategorySection {...reservationProps} />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the category title', () => {
    render(<FAQCategorySection {...reservationProps} />)
    expect(screen.getByText('ご予約について')).toBeInTheDocument()
  })

  it('renders all question items', () => {
    render(<FAQCategorySection {...reservationProps} />)
    expect(screen.getByText('予約はいつから可能ですか？')).toBeInTheDocument()
    expect(screen.getByText('キャンセル料はかかりますか？')).toBeInTheDocument()
    expect(
      screen.getByText('チェックイン・チェックアウトの時間は？')
    ).toBeInTheDocument()
  })

  it('renders the answer when provided', () => {
    render(<FAQCategorySection {...reservationProps} />)
    expect(
      screen.getByText(/ご宿泊日の6ヶ月前より/)
    ).toBeInTheDocument()
  })

  it('renders Q markers for each question', () => {
    render(<FAQCategorySection {...reservationProps} />)
    const qMarkers = screen.getAllByText('Q')
    expect(qMarkers.length).toBe(3)
  })

  it('uses definition list semantics for Q&A pairs', () => {
    const { container } = render(<FAQCategorySection {...reservationProps} />)
    const dl = container.querySelector('dl')
    expect(dl).toBeInTheDocument()
    const dtElements = container.querySelectorAll('dt')
    expect(dtElements.length).toBe(3)
  })

  it('renders with light variant background', () => {
    const { container } = render(<FAQCategorySection {...reservationProps} />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({
      backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
    })
  })

  it('renders with alt variant background', () => {
    const { container } = render(<FAQCategorySection {...onsenProps} />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({
      backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
    })
  })

  it('renders FAQ items with correct data-testid', () => {
    render(<FAQCategorySection {...reservationProps} />)
    const items = screen.getAllByTestId('faq-item')
    expect(items.length).toBe(3)
  })
})
