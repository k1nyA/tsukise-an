import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { PrivacyContentSection } from '../PrivacyContentSection'

describe('PrivacyContentSection', () => {
  it('renders as a semantic section element', () => {
    const { container } = render(<PrivacyContentSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the introductory paragraph about privacy policy', () => {
    render(<PrivacyContentSection />)
    expect(
      screen.getByText(
        /月瀬庵（以下「当館」）は、お客様の個人情報の保護を重要な責務と考え/
      )
    ).toBeInTheDocument()
  })

  it('renders section 1: 個人情報の定義', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('1. 個人情報の定義')).toBeInTheDocument()
    expect(
      screen.getByText(/お名前、ご住所、電話番号、メールアドレス/)
    ).toBeInTheDocument()
  })

  it('renders section 2: 個人情報の収集', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('2. 個人情報の収集')).toBeInTheDocument()
    expect(
      screen.getByText(/以下の場合に個人情報を収集いたします/)
    ).toBeInTheDocument()
  })

  it('renders all collection scenarios in section 2', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText(/ご予約のお申し込み時/)).toBeInTheDocument()
    expect(
      screen.getByText(/お問い合わせフォームのご利用時/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/メールマガジンのご登録時/)
    ).toBeInTheDocument()
    expect(screen.getByText(/アンケートへのご回答時/)).toBeInTheDocument()
  })

  it('renders section 3: 個人情報の利用目的', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('3. 個人情報の利用目的')).toBeInTheDocument()
    expect(
      screen.getByText(/以下の目的で利用いたします/)
    ).toBeInTheDocument()
  })

  it('renders all usage purposes in section 3', () => {
    render(<PrivacyContentSection />)
    expect(
      screen.getByText(/ご予約の確認およびご連絡/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/サービスの提供および改善/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/お問い合わせへのご対応/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/お知らせやキャンペーン情報のご案内/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/統計データの作成（個人を特定できない形式）/)
    ).toBeInTheDocument()
  })

  it('renders section 4: 個人情報の第三者提供', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('4. 個人情報の第三者提供')).toBeInTheDocument()
    expect(
      screen.getByText(
        /法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供いたしません/
      )
    ).toBeInTheDocument()
  })

  it('renders section 5: 個人情報の管理', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('5. 個人情報の管理')).toBeInTheDocument()
    expect(
      screen.getByText(/適切なセキュリティ対策を講じます/)
    ).toBeInTheDocument()
  })

  it('renders section 6: Cookieの使用について', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('6. Cookieの使用について')).toBeInTheDocument()
    expect(
      screen.getByText(/サービス向上のためCookieを使用しております/)
    ).toBeInTheDocument()
  })

  it('renders section 7: プライバシーポリシーの変更', () => {
    render(<PrivacyContentSection />)
    expect(
      screen.getByText('7. プライバシーポリシーの変更')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /当ウェブサイトに掲載した時点から効力を生じます/
      )
    ).toBeInTheDocument()
  })

  it('renders section 8: お問い合わせ窓口', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText('8. お問い合わせ窓口')).toBeInTheDocument()
    expect(
      screen.getByText(/個人情報の取り扱いに関するお問い合わせ/)
    ).toBeInTheDocument()
  })

  it('renders contact details in section 8', () => {
    render(<PrivacyContentSection />)
    expect(screen.getByText(/0460-83-XXXX/)).toBeInTheDocument()
    expect(screen.getByText(/info@tsukise-an.jp/)).toBeInTheDocument()
    expect(
      screen.getByText(/神奈川県足柄下郡箱根町元箱根138/)
    ).toBeInTheDocument()
  })

  it('renders all 8 section headings with h3 elements', () => {
    const { container } = render(<PrivacyContentSection />)
    const headings = container.querySelectorAll('h3')
    expect(headings).toHaveLength(8)
  })

  it('renders the last updated date', () => {
    render(<PrivacyContentSection />)
    expect(
      screen.getByText(/最終更新日：2026年2月22日/)
    ).toBeInTheDocument()
  })

  it('uses ryokan design tokens for section background', () => {
    const { container } = render(<PrivacyContentSection />)
    const section = container.querySelector('section')
    expect(section).toHaveStyle({
      backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
    })
  })

  it('uses heading font family for section titles', () => {
    const { container } = render(<PrivacyContentSection />)
    const heading = container.querySelector('h3')
    expect(heading).toHaveStyle({
      fontFamily: 'var(--font-heading)',
    })
  })

  it('uses body font family for body text', () => {
    render(<PrivacyContentSection />)
    const introText = screen.getByText(
      /月瀬庵（以下「当館」）は、お客様の個人情報の保護を重要な責務と考え/
    )
    expect(introText).toHaveStyle({
      fontFamily: 'var(--font-body)',
    })
  })
})
