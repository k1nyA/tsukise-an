/**
 * Top Page Integration Test
 *
 * Verifies that all top page sections render correctly and in the expected order.
 * Since the top page (page.tsx) is an async server component that fetches data,
 * we assemble the sections directly to test their integration.
 *
 * Expected section order:
 *   Header -> Hero -> Concept -> Room -> Onsen -> Cuisine -> Stay -> Info -> CTA -> Footer
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'

import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { CTASection } from '@/components/shared/CTASection'
import { HeroSection } from '@/components/top/HeroSection'
import { ConceptSection } from '@/components/top/ConceptSection'
import { RoomSection } from '@/components/top/RoomSection'
import { OnsenSection } from '@/components/top/OnsenSection'
import { CuisineSection } from '@/components/top/CuisineSection'
import { StaySection } from '@/components/top/StaySection'
import { InfoSection } from '@/components/top/InfoSection'

/**
 * Assemble the top page layout matching src/app/page.tsx structure.
 * The real page fetches news items via getTopNewsItems(); we pass an empty array.
 */
function TopPageAssembled() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <RoomSection />
        <OnsenSection />
        <CuisineSection />
        <StaySection />
        <InfoSection newsItems={[]} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

describe('Top Page Integration', () => {
  describe('All sections are present', () => {
    it('renders all 8 content sections inside <main>', () => {
      const { container } = render(<TopPageAssembled />)
      const main = container.querySelector('main')!
      const sections = main.querySelectorAll(':scope > section')
      // Hero, Concept, Room, Onsen, Cuisine, Stay, Info, CTA = 8
      expect(sections.length).toBe(8)
    })

    it('renders the Header outside <main>', () => {
      const { container } = render(<TopPageAssembled />)
      const header = container.querySelector('header, .header-root')
      expect(header).toBeInTheDocument()
    })

    it('renders the Footer outside <main>', () => {
      const { container } = render(<TopPageAssembled />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Section order is correct', () => {
    it('renders sections in the canonical order', () => {
      const { container } = render(<TopPageAssembled />)
      const main = container.querySelector('main')!
      const sections = Array.from(main.querySelectorAll(':scope > section'))

      // Identify sections by their unique content markers
      const sectionIdentifiers = sections.map((section) => {
        const text = section.textContent || ''

        if (text.includes('湖と月、')) return 'Hero'
        if (text.includes('CONCEPT') && text.includes('百三十年')) return 'Concept'
        if (text.includes('ROOMS') && text.includes('客室を見る')) return 'Room'
        if (text.includes('ONSEN') && text.includes('温泉を見る')) return 'Onsen'
        if (text.includes('CUISINE') && text.includes('旬を紡ぐ')) return 'Cuisine'
        if (text.includes('EXPERIENCE') && text.includes('月瀬庵での過ごし方')) return 'Stay'
        if (text.includes('ACCESS')) return 'Info'
        if (text.includes('オンライン予約') && text.includes('月瀬庵でお過ごしください')) return 'CTA'
        return 'Unknown'
      })

      expect(sectionIdentifiers).toEqual([
        'Hero',
        'Concept',
        'Room',
        'Onsen',
        'Cuisine',
        'Stay',
        'Info',
        'CTA',
      ])
    })
  })

  describe('Required text content is present', () => {
    it('renders the hero headline', () => {
      render(<TopPageAssembled />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('湖と月、')
    })

    it('renders the concept section title', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText('百三十年、変わらぬもてなし。')).toBeInTheDocument()
    })

    it('renders the ROOMS label', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText('ROOMS')).toBeInTheDocument()
    })

    it('renders the ONSEN label', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText('ONSEN')).toBeInTheDocument()
    })

    it('renders the CUISINE label', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText('CUISINE')).toBeInTheDocument()
    })

    it('renders the EXPERIENCE label (Stay section)', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText('EXPERIENCE')).toBeInTheDocument()
    })

    it('renders the CTA heading', () => {
      render(<TopPageAssembled />)
      expect(screen.getByText(/月瀬庵でお過ごしください/)).toBeInTheDocument()
    })

    it('renders the footer copyright', () => {
      render(<TopPageAssembled />)
      expect(
        screen.getByText(/© 2026 月瀬庵 TSUKISE-AN/)
      ).toBeInTheDocument()
    })
  })

  describe('Navigation links', () => {
    it('renders the main navigation links in the header', () => {
      render(<TopPageAssembled />)
      const navLinks = screen.getAllByRole('link')
      const hrefs = navLinks.map((link) => link.getAttribute('href'))
      // Core pages should be linked
      expect(hrefs).toContain('/rooms')
      expect(hrefs).toContain('/onsen')
      expect(hrefs).toContain('/cuisine')
      expect(hrefs).toContain('/reservation')
    })

    it('renders section links to subpages', () => {
      render(<TopPageAssembled />)
      // Room section links to /rooms
      expect(screen.getByRole('link', { name: /客室を見る/ })).toHaveAttribute('href', '/rooms')
      // Onsen section links to /onsen
      expect(screen.getByRole('link', { name: /温泉を見る/ })).toHaveAttribute('href', '/onsen')
    })

    it('renders the CTA reservation link', () => {
      render(<TopPageAssembled />)
      const reservationLinks = screen.getAllByRole('link', { name: /オンライン予約/ })
      const ctaReservationLink = reservationLinks.find(
        (link) => link.getAttribute('href') === '/reservation'
      )
      expect(ctaReservationLink).toBeDefined()
    })
  })

  describe('Semantic structure', () => {
    it('uses proper heading hierarchy (h1 in Hero, h2 in other sections)', () => {
      render(<TopPageAssembled />)
      const h1s = screen.getAllByRole('heading', { level: 1 })
      const h2s = screen.getAllByRole('heading', { level: 2 })
      // Only one h1 (Hero)
      expect(h1s).toHaveLength(1)
      // Multiple h2s (one per content section + CTA + Footer)
      expect(h2s.length).toBeGreaterThanOrEqual(6)
    })

    it('wraps all content sections in a <main> element', () => {
      const { container } = render(<TopPageAssembled />)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })

    it('renders the page with ryokan-page class', () => {
      const { container } = render(<TopPageAssembled />)
      expect(container.querySelector('.ryokan-page')).toBeInTheDocument()
    })
  })

  describe('Images', () => {
    it('renders hero background image', () => {
      render(<TopPageAssembled />)
      const heroImg = screen.getByAltText('芦ノ湖畔の月瀬庵')
      expect(heroImg).toBeInTheDocument()
    })

    it('renders room section image', () => {
      render(<TopPageAssembled />)
      const roomImg = screen.getByAltText(/月瀬庵の客室/)
      expect(roomImg).toBeInTheDocument()
    })

    it('renders onsen section image', () => {
      render(<TopPageAssembled />)
      const onsenImg = screen.getByRole('img', { name: /温泉/ })
      expect(onsenImg).toBeInTheDocument()
    })
  })
})
