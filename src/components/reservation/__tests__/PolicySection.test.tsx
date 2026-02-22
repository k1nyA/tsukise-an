import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { PolicySection } from '../PolicySection'

describe('PolicySection', () => {
  it('renders the section title', () => {
    render(<PolicySection />)
    expect(screen.getByText('ご予約に関するご注意')).toBeInTheDocument()
  })

  it('renders check-in/out policy', () => {
    render(<PolicySection />)
    expect(screen.getByText('チェックイン・アウト')).toBeInTheDocument()
    expect(screen.getByText(/チェックイン 15:00/)).toBeInTheDocument()
    expect(screen.getByText(/チェックアウト 11:00/)).toBeInTheDocument()
  })

  it('renders cancellation policy', () => {
    render(<PolicySection />)
    expect(screen.getByText('キャンセルポリシー')).toBeInTheDocument()
    expect(screen.getByText(/7日前まで：無料/)).toBeInTheDocument()
    expect(screen.getByText(/当日・不泊：宿泊料の100%/)).toBeInTheDocument()
  })

  it('renders payment methods', () => {
    render(<PolicySection />)
    expect(screen.getByText('お支払い方法')).toBeInTheDocument()
    expect(screen.getByText(/現金・クレジットカード/)).toBeInTheDocument()
    expect(screen.getByText(/VISA \/ Mastercard \/ JCB \/ AMEX/)).toBeInTheDocument()
  })

  it('renders three policy columns', () => {
    const { container } = render(<PolicySection />)
    const columns = container.querySelectorAll('[data-testid="policy-column"]')
    expect(columns).toHaveLength(3)
  })

  it('renders as a semantic section element', () => {
    const { container } = render(<PolicySection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
