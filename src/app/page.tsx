import CTASection from "@/components/CTASection";
import ConceptSection from "@/components/ConceptSection";
import CuisineSection from "@/components/CuisineSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import OnsenSection from "@/components/OnsenSection";
import RoomSection from "@/components/RoomSection";
import StaySection from "@/components/StaySection";

export default function Home() {
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
        <InfoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
