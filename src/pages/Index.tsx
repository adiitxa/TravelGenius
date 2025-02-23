
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TravelPlanForm from "../components/TravelPlanForm";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <div id="plan-trip" className="bg-sand/30 py-20">
        <TravelPlanForm />
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
