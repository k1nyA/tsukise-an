import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { PrivacyContentSection } from '@/components/privacy/PrivacyContentSection'
import { Footer } from '@/components/shared/Footer/Footer'

export default function PrivacyPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="プライバシーポリシー" labelEn="PRIVACY POLICY" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'プライバシーポリシー' },
          ]}
        />
        <PrivacyContentSection />
      </main>
      <Footer />
    </div>
  )
}
