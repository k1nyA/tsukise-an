import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { LegalContentSection } from '@/components/legal/LegalContentSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

export default function LegalPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero
          title="特定商取引法に基づく表記"
          labelEn="COMMERCIAL TRANSACTIONS ACT"
        />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '特定商取引法に基づく表記' },
          ]}
        />
        <LegalContentSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
