import Navbar from "./(landing)/components/Navbar";
import HeroSection from "./(landing)/components/HeroSection";
import CaraBermainSection from "./(landing)/components/CaraBermainSection";
import LogoPartnersSection from "./(landing)/components/LogoPartnersSection";
import CaraBerpikirSection from "./(landing)/components/CaraBerpikirSection";
import CTASection from "./(landing)/components/CTASection";
import Footer from "./(landing)/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CaraBermainSection />
        <LogoPartnersSection />
        <CaraBerpikirSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
