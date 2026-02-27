import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { ContactIntroSection } from '@/components/contact/ContactIntroSection'
import { ContactFormSection } from '@/components/contact/ContactFormSection'
import { ContactInfoSection } from '@/components/contact/ContactInfoSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

export default function ContactPage() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''

  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero
          title="お問い合わせ"
          labelEn="CONTACT"
          subtitle="ご質問・ご要望など、お気軽にお問い合わせください"
          backgroundImage="/images/contact-hero.jpg"
        />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'お問い合わせ' },
          ]}
        />
        <ContactIntroSection />
        <ContactFormSection accessKey={accessKey} />
        <ContactInfoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
