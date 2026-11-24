import Hero from "@/components/home/Hero";
import CorridorMarquee from "@/components/home/CorridorMarquee";
import TrustStrip from "@/components/home/TrustStrip";
import NextMove from "@/components/home/NextMove";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import DestinationExplorer from "@/components/home/DestinationExplorer";
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
      <CorridorMarquee />
      <TrustStrip />
      <NextMove />
      <FeaturedJobs />
      <DestinationExplorer />
      <VisaMatcher />
      <HowItWorks />
      <WhyKia />
      <Testimonials />
      <TrustTransparency />
      <FinalCTA />
    </>
  );
}
