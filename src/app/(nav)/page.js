import BrowseByCategories from "@/components/BrowseByCategories";
import CTA from "@/components/CTA";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-background via-background to-muted/10">
      <Hero />
      <HowItWorks />
      <BrowseByCategories />
      <Featured />
      <CTA />
    </div>
  );
}