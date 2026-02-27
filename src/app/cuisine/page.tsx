import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PageHero } from '@/components/shared/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { CTASection } from '@/components/shared/CTASection'
import {
  ConceptSection,
  KaisekiMenuSection,
  IngredientsSection,
  BreakfastSection,
  DiningRoomSection,
  AllergyInfoSection,
} from '@/components/cuisine'
import Link from 'next/link'

export default function CuisinePage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="お料理" labelEn="CUISINE" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'お料理' },
          ]}
        />
        <ConceptSection />
        <KaisekiMenuSection />
        <IngredientsSection />
        <BreakfastSection />
        <DiningRoomSection />
        <AllergyInfoSection />

        {/* Related page links */}
        <div
          className="r-cuisine-links w-full"
          style={{
            backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
            padding:
              'var(--r-cuisine-links-py) var(--r-cuisine-links-px)',
          }}
        >
          <Link
            href="/reservation"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            ご予約はこちら →
          </Link>
          <Link
            href="/experience"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            過ごし方を見る →
          </Link>
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
