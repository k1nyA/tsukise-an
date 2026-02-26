import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { AddressSection } from '@/components/access/AddressSection'
import { MapSection } from '@/components/access/MapSection'
import { AccessMethodsSection } from '@/components/access/AccessMethodsSection'
import { ContactLinkSection } from '@/components/access/ContactLinkSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

export default function AccessPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero
          title="アクセス"
          labelEn="ACCESS"
          subtitle="箱根・芦ノ湖畔の隠れ宿へ"
        />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'アクセス' },
          ]}
        />
        <AddressSection />
        <MapSection />
        <AccessMethodsSection />
        <ContactLinkSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
