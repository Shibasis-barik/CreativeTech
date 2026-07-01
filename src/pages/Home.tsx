import Hero from "../components/Hero";
import TrustedCompanies from "../components/TrustedCompanies";
import Stats from "../components/Stats";
// import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
// import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />    
      <Stats />
      {/* <ServicesSection />      */}
      <TrustedCompanies />
      <WhyChooseUs />
      {/* <Process />      */}
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}