import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { ConceptSection } from '@/components/rooms/ConceptSection'
import { RoomGridSection } from '@/components/rooms/RoomGridSection'
import { AmenitiesSection } from '@/components/rooms/AmenitiesSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'
import Link from 'next/link'

export default function RoomsPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="客室" labelEn="ROOMS" backgroundImage="/images/rooms-hero.png" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '客室' },
          ]}
        />
        <ConceptSection />
        <RoomGridSection />
        <AmenitiesSection />

        {/* Related page links */}
        <div
          className="r-rooms-related-layout w-full"
          style={{
            backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
            gap: 'var(--r-rooms-related-gap)',
            padding: 'var(--r-rooms-related-py) var(--r-section-px)',
          }}
        >
          <Link
            href="/onsen"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            温泉を見る →
          </Link>
          <Link
            href="/cuisine"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            お料理を見る →
          </Link>
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
