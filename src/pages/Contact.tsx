import ContactHero from "../components/contact/ContactHero";
// import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import OfficeLocation from "../components/contact/OfficeLocation";
import BusinessHours from "../components/contact/BusinessHours";
import Footer from "../components/Footer";
// import ContactCTA from "../components/contact/ContactCTA";

export default function Contact() {
  return (
    <>
      <ContactHero />
      {/* <ContactInfo /> */}
      <ContactForm />
      <OfficeLocation />
      <BusinessHours />
      {/* <ContactCTA /> */}
      <Footer />
    </>
  );
}