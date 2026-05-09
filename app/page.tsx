import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WebsiteShowcase from "@/components/sections/WebsiteShowcase";
import WhyUs from "@/components/sections/WhyUs";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <WebsiteShowcase />
      <WhyUs />
      <Footer />
    </main>
  );
}
