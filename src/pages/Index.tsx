import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingBookButton from "@/components/FloatingBookButton";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Reviews />
      <About />
      <Contact />
      <Footer />
      <FloatingBookButton />
    </main>
  );
};

export default Index;
