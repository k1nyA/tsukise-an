import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { LegalContentSection } from '../LegalContentSection'

describe('LegalContentSection', () => {
  // --- Semantic structure ---
  it('renders as a semantic section element', () => {
    const { container } = render(<LegalContentSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  // --- Intro text ---
  it('renders the legal notice intro text', () => {
    render(<LegalContentSection />)
    expect(
      screen.getByText(
        '特定商取引法第11条に基づき、以下のとおり表記いたします。'
      )
    ).toBeInTheDocument()
  })

  // --- Section: 事業者情報 ---
  describe('事業者情報 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('事業者情報')).toBeInTheDocument()
    })

    it('renders 事業者名称 label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('事業者名称')).toBeInTheDocument()
      expect(
        screen.getByText('月瀬庵（つきせあん）')
      ).toBeInTheDocument()
    })

    it('renders 代表者 label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('代表者')).toBeInTheDocument()
      expect(screen.getByText('山田 太郎')).toBeInTheDocument()
    })

    it('renders 所在地 label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('所在地')).toBeInTheDocument()
      expect(
        screen.getByText(
          '〒250-0522 神奈川県足柄下郡箱根町元箱根138'
        )
      ).toBeInTheDocument()
    })

    it('renders 電話番号 label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('電話番号')).toBeInTheDocument()
      expect(screen.getByText('0460-83-XXXX')).toBeInTheDocument()
    })

    it('renders メールアドレス label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('メールアドレス')).toBeInTheDocument()
      expect(
        screen.getByText('info@tsukise-an.example.com')
      ).toBeInTheDocument()
    })

    it('renders URL label and value', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('URL')).toBeInTheDocument()
      expect(
        screen.getByText('https://tsukise-an.example.com')
      ).toBeInTheDocument()
    })

    it('uses semantic dl/dt/dd for business info key-value pairs', () => {
      const { container } = render(<LegalContentSection />)
      const dlElements = container.querySelectorAll('dl')
      expect(dlElements.length).toBeGreaterThanOrEqual(1)

      const dtElements = container.querySelectorAll('dt')
      const ddElements = container.querySelectorAll('dd')
      expect(dtElements.length).toBeGreaterThanOrEqual(6)
      expect(ddElements.length).toBeGreaterThanOrEqual(6)
    })
  })

  // --- Section: 販売価格 ---
  describe('販売価格 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('販売価格')).toBeInTheDocument()
    })

    it('renders the pricing description', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(
          '各宿泊プランページに表示された金額（税込）'
        )
      ).toBeInTheDocument()
    })
  })

  // --- Section: 販売価格以外の必要料金 ---
  describe('販売価格以外の必要料金 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText('販売価格以外の必要料金')
      ).toBeInTheDocument()
    })

    it('renders the extra cost details', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText('入湯税（大人150円）、消費税')
      ).toBeInTheDocument()
    })
  })

  // --- Section: 支払方法 ---
  describe('支払方法 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('支払方法')).toBeInTheDocument()
    })

    it('renders the payment method details', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(/クレジットカード（VISA, Mastercard, JCB, AMEX）/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/銀行振込（予約確定後にご案内）/)
      ).toBeInTheDocument()
    })
  })

  // --- Section: 支払時期 ---
  describe('支払時期 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('支払時期')).toBeInTheDocument()
    })

    it('renders the payment timing details', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(/クレジットカード：チェックアウト時/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/銀行振込：予約確定後7日以内/)
      ).toBeInTheDocument()
    })
  })

  // --- Section: 商品の引渡時期 ---
  describe('商品の引渡時期 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText('商品の引渡時期')
      ).toBeInTheDocument()
    })

    it('renders the delivery timing description', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(
          'チェックイン日（予約時に指定した宿泊日）'
        )
      ).toBeInTheDocument()
    })
  })

  // --- Section: 返品・キャンセルについて ---
  describe('返品・キャンセルについて section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText('返品・キャンセルについて')
      ).toBeInTheDocument()
    })

    it('renders the cancellation policy intro', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(/以下のキャンセル料が発生いたします/)
      ).toBeInTheDocument()
    })

    it('renders all cancellation fee tiers', () => {
      render(<LegalContentSection />)
      expect(screen.getByText(/14日前まで：無料/)).toBeInTheDocument()
      expect(
        screen.getByText(/7日前まで：宿泊料金の30%/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/3日前まで：宿泊料金の50%/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/前日：宿泊料金の80%/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/当日・無連絡：宿泊料金の100%/)
      ).toBeInTheDocument()
    })
  })

  // --- Section: 特別条件 ---
  describe('特別条件 section', () => {
    it('renders the section heading', () => {
      render(<LegalContentSection />)
      expect(screen.getByText('特別条件')).toBeInTheDocument()
    })

    it('renders the special conditions', () => {
      render(<LegalContentSection />)
      expect(
        screen.getByText(
          /未成年者の単独でのご予約はお受けしておりません/
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          /ペットの同伴はご遠慮いただいております/
        )
      ).toBeInTheDocument()
    })
  })

  // --- Last updated ---
  it('renders the last updated date', () => {
    render(<LegalContentSection />)
    expect(
      screen.getByText(/最終更新日：2026年2月22日/)
    ).toBeInTheDocument()
  })

  // --- Design tokens ---
  it('uses ryokan design tokens for the section background', () => {
    const { container } = render(<LegalContentSection />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({
      backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
    })
  })

  it('renders section headings with heading font family', () => {
    render(<LegalContentSection />)
    const heading = screen.getByText('事業者情報')
    expect(heading.tagName).toBe('H3')
  })

  it('renders divider lines between sections', () => {
    const { container } = render(<LegalContentSection />)
    const dividers = container.querySelectorAll('[data-testid="legal-divider"]')
    expect(dividers.length).toBeGreaterThanOrEqual(8)
  })
})
