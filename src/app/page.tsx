import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import NextMove from "@/components/home/NextMove";
import VisaMatcher from "@/components/home/VisaMatcher";
import HowItWorks from "@/components/home/HowItWorks";
import WhyKia from "@/components/home/WhyKia";
import Testimonials from "@/components/home/Testimonials";
import TrustTransparency from "@/components/home/TrustTransparency";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <DestinationExplorer />
      <NextMove />
      <VisaMatcher />
      <HowItWorks />
      <WhyKia />
      <Testimonials />
      <TrustTransparency />
      <FinalCTA />
    </>
  );
}
