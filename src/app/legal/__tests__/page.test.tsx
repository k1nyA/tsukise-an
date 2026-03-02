import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@/test/utils'
import LegalPage from '../page'

// Mock shared components to isolate page composition tests
vi.mock('@/components/shared/Header/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

vi.mock('@/components/shared/Footer/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('@/components/shared/PageHero/PageHero', () => ({
  PageHero: ({ title, labelEn }: { title: string; labelEn: string }) => (
    <div data-testid="page-hero" data-title={title} data-label-en={labelEn}>
      {title}
    </div>
  ),
}))

vi.mock('@/components/shared/Breadcrumb/Breadcrumb', () => ({
  Breadcrumb: ({ items }: { items: { label: string; href?: string }[] }) => (
    <nav data-testid="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>{item.label}</span>
      ))}
    </nav>
  ),
}))

vi.mock('@/components/shared/CTASection/CTASection', () => ({
  CTASection: () => <div data-testid="cta-section">CTA</div>,
}))

describe('LegalPage', () => {
  it('renders the page with ryokan-page class', () => {
    const { container } = render(<LegalPage />)
    const wrapper = container.querySelector('.ryokan-page')
    expect(wrapper).toBeInTheDocument()
  })

  it('renders the Header component', () => {
    render(<LegalPage />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders the Footer component', () => {
    render(<LegalPage />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders the PageHero with correct title and labelEn', () => {
    render(<LegalPage />)
    const hero = screen.getByTestId('page-hero')
    expect(hero).toBeInTheDocument()
    expect(hero).toHaveAttribute('data-title', '特定商取引法に基づく表記')
    expect(hero).toHaveAttribute('data-label-en', 'COMMERCIAL TRANSACTIONS ACT')
  })

  it('renders the Breadcrumb with correct items', () => {
    render(<LegalPage />)
    const breadcrumb = screen.getByTestId('breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
    expect(within(breadcrumb).getByText('ホーム')).toBeInTheDocument()
    expect(
      within(breadcrumb).getByText('特定商取引法に基づく表記')
    ).toBeInTheDocument()
  })

  it('renders the LegalContentSection within main', () => {
    const { container } = render(<LegalPage />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()

    // LegalContentSection renders the intro text
    expect(
      screen.getByText(
        '特定商取引法第11条に基づき、以下のとおり表記いたします。'
      )
    ).toBeInTheDocument()
  })

  it('renders CTASection per .pen SSOT (between content and footer)', () => {
    render(<LegalPage />)
    expect(screen.getByTestId('cta-section')).toBeInTheDocument()
  })

  it('renders page elements in correct order: Header, main content, Footer', () => {
    const { container } = render(<LegalPage />)
    const header = container.querySelector('[data-testid="header"]')
    const main = container.querySelector('main')
    const footer = container.querySelector('[data-testid="footer"]')

    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // Verify order: header before main, main before footer
    const allElements = Array.from(container.querySelector('.ryokan-page')!.children)
    const headerIdx = allElements.indexOf(header!)
    const mainIdx = allElements.indexOf(main!)
    const footerIdx = allElements.indexOf(footer!)

    expect(headerIdx).toBeLessThan(mainIdx)
    expect(mainIdx).toBeLessThan(footerIdx)
  })
})
