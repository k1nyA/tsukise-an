import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { FAQIntroSection } from '@/components/faq/FAQIntroSection'
import { FAQCategorySection } from '@/components/faq/FAQCategorySection'
import { FAQContactSection } from '@/components/faq/FAQContactSection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

const reservationFAQ = [
  {
    question: '予約はいつから可能ですか？',
    answer:
      'ご宿泊日の6ヶ月前より、オンラインまたはお電話にてご予約を承っております。特に桜や紅葉の季節は大変人気がございますので、お早めのご予約をお勧めいたします。',
  },
  {
    question: 'キャンセル料はかかりますか？',
  },
  {
    question: 'チェックイン・チェックアウトの時間は？',
  },
]

const onsenRoomFAQ = [
  { question: '客室の露天風呂は24時間利用できますか？' },
  { question: '大浴場の営業時間を教えてください。' },
  { question: 'お部屋にアメニティはありますか？' },
]

const cuisineFAQ = [
  { question: 'アレルギー対応はしていただけますか？' },
  { question: 'お食事の時間は選べますか？' },
  { question: 'お子様向けのメニューはありますか？' },
]

const accessOtherFAQ = [
  { question: '送迎サービスはありますか？' },
  { question: '駐車場はありますか？' },
  { question: 'ペットの同伴は可能ですか？' },
]

export default function FAQPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="よくあるご質問" labelEn="FAQ" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'よくあるご質問' },
          ]}
        />
        <FAQIntroSection />
        <FAQCategorySection
          title="ご予約について"
          icon="calendar"
          variant="light"
          items={reservationFAQ}
        />
        <FAQCategorySection
          title="温泉・お部屋について"
          icon="waves"
          variant="alt"
          items={onsenRoomFAQ}
        />
        <FAQCategorySection
          title="お食事について"
          icon="utensils"
          variant="light"
          items={cuisineFAQ}
        />
        <FAQCategorySection
          title="アクセス・その他"
          icon="map-pin"
          variant="alt"
          items={accessOtherFAQ}
        />
        <FAQContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
