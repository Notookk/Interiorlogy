import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import CompanyStory from "@/components/CompanyStory";
import InspireSection from "@/components/InspireSection";
import HappyClients from "@/components/HappyClients";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <WhyChooseUs />
        <CompanyStory />
        <InspireSection />
        <HappyClients />
      </main>
      <Footer />
    </div>
  );
}