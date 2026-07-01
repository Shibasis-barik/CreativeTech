import DevelopmentProcess from "../components/services/DevelopmentProcess";
import FAQ from "../components/services/FAQ";
import Industries from "../components/services/Industries";
import PricingModel from "../components/services/PricingModel";
import ServiceGrid from "../components/services/ServiceGrid";
import ServicesCTA from "../components/services/ServicesCTA";
import ServicesHero from "../components/services/ServicesHero";
import TechStack from "../components/services/TechStack";

import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <TechStack />
      <DevelopmentProcess />
      <Industries />
      <PricingModel />
      <FAQ />
      <ServicesCTA />
    </>
  );
}