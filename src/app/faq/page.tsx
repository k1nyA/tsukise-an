import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { FAQIntroSection } from '@/components/faq/FAQIntroSection'
import { FAQCategorySection } from '@/components/faq/FAQCategorySection'
import { FAQContactSection } from '@/components/faq/FAQContactSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'
import { groupFaqByCategory } from '@/lib/faq'
import { getFaqList } from '@/lib/microcms'

export default async function FAQPage() {
  let sections: ReturnType<typeof groupFaqByCategory> = []
  let fetchError = ''

  try {
    const response = await getFaqList()
    sections = groupFaqByCategory(response.contents)
  } catch (error) {
    fetchError = '現在FAQを取得できません。時間をおいて再度お試しください。'
    console.error('Failed to fetch faq list', error)
  }

  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="よくあるご質問" labelEn="FAQ" subtitle="お客様からよくいただくご質問をまとめました" backgroundImage="/images/faq-hero.png" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'よくあるご質問' },
          ]}
        />
        <FAQIntroSection />

        {fetchError ? (
          <section className="w-full" style={{ padding: '40px 80px 80px' }}>
            <p role="alert">{fetchError}</p>
          </section>
        ) : sections.length > 0 ? (
          sections.map((section) => (
            <FAQCategorySection
              key={section.key}
              title={section.title}
              icon={section.icon}
              variant={section.variant}
              items={section.items}
            />
          ))
        ) : (
          <section className="w-full" style={{ padding: '40px 80px 80px' }}>
            <p>現在FAQを準備中です。</p>
          </section>
        )}

        <FAQContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
