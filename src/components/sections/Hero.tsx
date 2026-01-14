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
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Full-screen Hero Image */}
      <div className="absolute inset-0">
        <img 
          src={heroSalonImage} 
          alt="Beautiful woman with luxurious hair at SC Signature Hair Salon" 
          className="w-full h-full object-cover object-center animate-ken-burns"
        />
        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        {/* Subtle purple/pink tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Tagline Above */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm md:text-base text-white mb-4 tracking-widest uppercase drop-shadow-lg"
            >
              Premium Hair & Beauty Services
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-white leading-tight drop-shadow-xl"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            >
              <span className="block">SC Signature</span>
              <span className="block">Hair Salon</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-white font-light mb-10 italic font-serif drop-shadow-lg"
            >
              Where Beauty Meets Artistry
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="xl"
                onClick={() => window.open(BOOKING_URL, "_blank")}
                className="min-w-[180px] bg-white text-black hover:bg-white/90 font-semibold tracking-wide"
              >
                BOOK NOW
              </Button>
              <Button
                size="xl"
                onClick={scrollToServices}
                className="min-w-[180px] bg-black text-white hover:bg-black/90 font-semibold tracking-wide"
              >
                EXPLORE SERVICES
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
