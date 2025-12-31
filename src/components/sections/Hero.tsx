import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Decorative Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Pink Blob */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-primary/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Purple Blob Right */}
        <motion.div
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-purple-primary/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Small Pink Blob Bottom */}
        <motion.div
          className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-pink-light/30 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Accent Purple Bottom Right */}
        <motion.div
          className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-purple-light/25 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Floating Glass Shapes */}
        <motion.div
          className="absolute top-1/3 left-[15%] w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 float"
          style={{ rotate: 15 }}
        />
        <motion.div
          className="absolute top-1/2 right-[10%] w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 float-delayed"
        />
        <motion.div
          className="absolute bottom-1/3 left-[10%] w-12 h-12 rounded-xl bg-pink-primary/10 backdrop-blur-sm border border-pink-primary/20 float-slow"
          style={{ rotate: -10 }}
        />
        <motion.div
          className="absolute top-[20%] right-[25%] w-14 h-14 rounded-2xl bg-purple-primary/10 backdrop-blur-sm border border-purple-primary/20 float"
          style={{ rotate: 25 }}
        />
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
            className="text-lg md:text-xl text-muted-foreground mb-4 tracking-wide"
          >
            ✦ Premium Hair & Beauty Services ✦
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
          >
            <span className="gradient-text">SC Signature</span>
            <br />
            <span className="text-foreground">Hair Salon</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-10 italic font-serif"
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
