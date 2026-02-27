import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PageHero } from '@/components/shared/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { CTASection } from '@/components/shared/CTASection'
import {
  ConceptSection,
  WaterQualitySection,
  BathTypesSection,
  OnsenGuideSection,
  MannerSection,
  OnsenLinksSection,
} from '@/components/onsen'

export default function OnsenPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero
          title="湖を望む湯処"
          labelEn="ONSEN"
          subtitle="姥子温泉の恵み、芦ノ湖の絶景とともに"
          backgroundImage="/images/onsen-hero.png"
        />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '温泉' },
          ]}
        />
        <ConceptSection />
        <BathTypesSection />
        <WaterQualitySection />
        <OnsenGuideSection />
        <MannerSection />
        <OnsenLinksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
