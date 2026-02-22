import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { CTASection } from '@/components/shared/CTASection'
import { HeroSection } from '@/components/top/HeroSection'
import { ConceptSection } from '@/components/top/ConceptSection'
import { RoomSection } from '@/components/top/RoomSection'
import { OnsenSection } from '@/components/top/OnsenSection'
import { CuisineSection } from '@/components/top/CuisineSection'
import { StaySection } from '@/components/top/StaySection'
import { InfoSection } from '@/components/top/InfoSection'
import { getTopNewsItems, type TopNewsItem } from '@/lib/top-news'

export default async function Home() {
  let topNewsItems: TopNewsItem[] = []

  try {
    topNewsItems = await getTopNewsItems()
  } catch (error) {
    console.error('Failed to fetch top news items', error)
  }

  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <RoomSection />
        <OnsenSection />
        <CuisineSection />
        <StaySection />
        <InfoSection newsItems={topNewsItems} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
