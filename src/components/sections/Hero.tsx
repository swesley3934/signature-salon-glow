import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroSalonImage from "@/assets/hero-salon.jpg";

const BOOKING_URL = "https://sharoncarr.glossgenius.com/book";

const Hero = () => {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background Image with Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroSalonImage} 
          alt="Luxurious SC Signature Hair Salon interior" 
          className="w-full h-full object-cover blur-[8px] animate-ken-burns"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-primary/5 to-purple-primary/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Tagline Above */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-white mb-4 tracking-wide drop-shadow-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            ✦ Premium Hair & Beauty Services ✦
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
          >
            <span className="gradient-text">SC Signature</span>
            <br />
            <span className="text-white">Hair Salon</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-10 italic font-serif drop-shadow-lg"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
          >
            Where Beauty Meets Artistry
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="glow"
              size="xl"
              onClick={() => window.open(BOOKING_URL, "_blank")}
              className="min-w-[220px]"
            >
              Book Your Appointment
            </Button>
            <Button
              variant="glass-outline"
              size="xl"
              onClick={scrollToServices}
              className="min-w-[220px]"
            >
              Explore Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToServices}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
