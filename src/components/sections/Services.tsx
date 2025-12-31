import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Clock, Scissors, Palette, Sparkles, Eye, Droplet, Heart, Crown } from "lucide-react";

const BOOKING_URL = "https://sharoncarr.glossgenius.com/book";

const iconMap: Record<string, React.ElementType> = {
  Scissors,
  Palette,
  Sparkles,
  Eye,
  Droplet,
  Heart,
  Brush: Sparkles,
  Crown,
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("hair");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const activeServices = serviceCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="services" className="py-24 relative overflow-hidden gradient-bg">
      {/* Background Decorations */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple-primary/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-pink-primary/10 text-pink-primary font-medium text-sm mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Discover Your <span className="gradient-text">Perfect Look</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From expert cuts to stunning color transformations, we offer a complete range 
            of beauty services to help you look and feel your best.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {serviceCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Sparkles;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-pink-primary to-purple-primary text-primary-foreground shadow-lg"
                    : "glass-card hover:bg-white/40 text-foreground"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {activeServices?.services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 group cursor-pointer"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                {/* Price Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-primary/20 to-purple-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[activeServices.icon] && (
                      <span className="text-pink-primary">
                        {(() => {
                          const Icon = iconMap[activeServices.icon];
                          return <Icon className="w-5 h-5" />;
                        })()}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-primary to-purple-primary text-primary-foreground text-sm font-semibold">
                    {service.price}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-pink-primary transition-colors">
                  {service.name}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>

                {/* Note */}
                {service.note && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    {service.note}
                  </p>
                )}

                {/* Book Button - Shows on Hover */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="gradient" size="sm" className="w-full">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="gradient"
            size="xl"
            onClick={() => window.open(BOOKING_URL, "_blank")}
          >
            Book Your Appointment Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
