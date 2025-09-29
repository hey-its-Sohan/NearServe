import BrowseByCategories from "@/components/BrowseByCategories";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-background via-background to-muted/10">
      <Hero />
      <BrowseByCategories />
      <Featured />
    </div>
  );
}
