import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PageHero } from '@/components/shared/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { CTASection } from '@/components/shared/CTASection'
import {
  ConceptSection,
  WaterQualitySection,
  BathTypesSection,
  MannerSection,
} from '@/components/onsen'

export default function OnsenPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="温泉" labelEn="ONSEN" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '温泉' },
          ]}
        />
        <ConceptSection />
        <BathTypesSection />
        <WaterQualitySection />
        <MannerSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
