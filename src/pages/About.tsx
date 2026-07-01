import AboutHero from "../components/about/AboutHero";
import Story from "../components/about/Story";
import MissionVision from "../components/about/MissionVision";
import Leadership from "../components/about/Leadership";
import Timeline from "../components/about/Timeline";
import CoreValues from "../components/about/CoreValues";
import Certifications from "../components/about/Certifications";
import AboutCTA from "../components/about/AboutCTA";

export default function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <MissionVision />
      <Leadership />
      <Timeline />
      <CoreValues />
      <Certifications />
      <AboutCTA />
    </>
  );
}
