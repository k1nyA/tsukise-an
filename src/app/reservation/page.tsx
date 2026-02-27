import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { ReservationIntroSection } from '@/components/reservation/ReservationIntroSection'
import { BookingMethodsSection } from '@/components/reservation/BookingMethodsSection'
import { RoomSelectionSection } from '@/components/reservation/RoomSelectionSection'
import { PlanSection } from '@/components/reservation/PlanSection'
import { CalendarSection } from '@/components/reservation/CalendarSection'
import { PolicySection } from '@/components/reservation/PolicySection'
import { CTASection } from '@/components/shared/CTASection/CTASection'
import { Footer } from '@/components/shared/Footer/Footer'

export default function ReservationPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="ご予約" labelEn="RESERVATION" backgroundImage="/images/reservation-hero.png" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'ご予約' },
          ]}
        />
        <ReservationIntroSection />
        <BookingMethodsSection />
        <RoomSelectionSection />
        <PlanSection />
        <CalendarSection />
        <PolicySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
