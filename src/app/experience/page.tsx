import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PageHero } from '@/components/shared/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { CTASection } from '@/components/shared/CTASection'
import {
  ConceptSection,
  TimelineSection,
  SeasonsSection,
  FacilitiesSection,
  ActivitiesSection,
  ExperienceLinksSection,
} from '@/components/experience'

export default function ExperiencePage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="過ごし方" labelEn="EXPERIENCE" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '過ごし方' },
          ]}
        />
        <ConceptSection />
        <TimelineSection />
        <SeasonsSection />
        <FacilitiesSection />
        <ActivitiesSection />
        <ExperienceLinksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
