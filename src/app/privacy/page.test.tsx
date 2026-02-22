import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import PrivacyPage from './page'

describe('PrivacyPage', () => {
  it('renders with the ryokan-page wrapper class', () => {
    const { container } = render(<PrivacyPage />)
    const wrapper = container.querySelector('.ryokan-page')
    expect(wrapper).toBeInTheDocument()
  })

  it('renders the Header component', () => {
    const { container } = render(<PrivacyPage />)
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('renders the main content area', () => {
    const { container } = render(<PrivacyPage />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('renders the Footer component', () => {
    const { container } = render(<PrivacyPage />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('renders the PageHero with correct title and English label', () => {
    render(<PrivacyPage />)
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'プライバシーポリシー',
    })
    expect(heading).toBeInTheDocument()
    expect(screen.getByText('PRIVACY POLICY')).toBeInTheDocument()
  })

  it('renders the Breadcrumb with correct navigation path', () => {
    render(<PrivacyPage />)
    const breadcrumbNav = screen.getByLabelText('パンくずリスト')
    expect(breadcrumbNav).toBeInTheDocument()
    expect(screen.getByText('ホーム')).toBeInTheDocument()
  })

  it('renders the PrivacyContentSection with introductory text', () => {
    render(<PrivacyPage />)
    expect(
      screen.getByText(
        /月瀬庵（以下「当館」）は、お客様の個人情報の保護を重要な責務と考え/
      )
    ).toBeInTheDocument()
  })

  it('renders all 8 privacy policy sections', () => {
    render(<PrivacyPage />)
    expect(screen.getByText('1. 個人情報の定義')).toBeInTheDocument()
    expect(screen.getByText('2. 個人情報の収集')).toBeInTheDocument()
    expect(screen.getByText('3. 個人情報の利用目的')).toBeInTheDocument()
    expect(screen.getByText('4. 個人情報の第三者提供')).toBeInTheDocument()
    expect(screen.getByText('5. 個人情報の管理')).toBeInTheDocument()
    expect(screen.getByText('6. Cookieの使用について')).toBeInTheDocument()
    expect(
      screen.getByText('7. プライバシーポリシーの変更')
    ).toBeInTheDocument()
    expect(screen.getByText('8. お問い合わせ窓口')).toBeInTheDocument()
  })

  it('does not render a CTASection (legal pages are minimal)', () => {
    const { container } = render(<PrivacyPage />)
    // CTA sections typically have a background image container with specific structure
    // For privacy page, there should be no CTA section at all
    const ctaSection = container.querySelector('[data-testid="cta-section"]')
    expect(ctaSection).not.toBeInTheDocument()
  })
})
