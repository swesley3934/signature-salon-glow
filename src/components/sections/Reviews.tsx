import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { reviews } from "@/data/reviews";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % reviews.length;
      return prev === 0 ? reviews.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentReview = reviews[currentIndex];

  return (
    <section id="reviews" className="py-24 relative overflow-hidden gradient-bg">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-purple-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-pink-primary/10 text-pink-primary font-medium text-sm mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from our amazing clients about their experiences.
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-3 mb-12"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-pink-primary text-pink-primary"
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-foreground">5.0</span>
          <span className="text-muted-foreground">Based on 100+ reviews</span>
        </motion.div>

        {/* Review Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-white/40 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-white/40 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>

          {/* Review Card */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass-card p-8 md:p-12 text-center"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-primary/20 to-purple-primary/20 flex items-center justify-center">
                    <Quote className="w-8 h-8 text-pink-primary" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-pink-primary text-pink-primary"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                  "{currentReview.text}"
                </p>

                {/* Client Info */}
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-primary to-purple-primary flex items-center justify-center mb-3">
                    <span className="text-xl font-bold text-primary-foreground">
                      {currentReview.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">
                    {currentReview.name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {currentReview.service} • {currentReview.date}
                  </p>
                  <span className="mt-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                    ✓ Verified Client
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-pink-primary to-purple-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
