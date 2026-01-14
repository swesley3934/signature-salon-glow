import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Heart, Users, Clock } from "lucide-react";
import stylistPortrait from "@/assets/stylist-portrait.png";

const stats = [
  { icon: Clock, value: "6+", label: "Years Experience" },
  { icon: Users, value: "100s", label: "Happy Clients" },
  { icon: Award, value: "100%", label: "Satisfaction" },
  { icon: Heart, value: "∞", label: "Passion" },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-primary/5 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="glass-card p-3 relative z-10">
                <div className="aspect-[4/5] rounded-xl overflow-hidden">
                  <img 
                    src={stylistPortrait} 
                    alt="Sharon - Owner & Lead Stylist at SC Signature Hair Salon"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl bg-gradient-to-br from-pink-primary/20 to-purple-primary/20 blur-sm -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-purple-light/30 blur-lg -z-10" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 rounded-full bg-pink-primary/10 text-pink-primary font-medium text-sm mb-6"
            >
              About Us
            </motion.span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              <span className="gradient-text">A Passion</span> for
              <br />
              Beautiful Hair
            </h2>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Welcome to SC Signature Hair Salon, where every visit is an experience 
              in luxury and transformation. With over 6 years of expertise in the 
              beauty industry, we've dedicated ourselves to making each client feel 
              confident and beautiful.
            </p>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our mission is simple: to provide exceptional hair and beauty services 
              in a warm, welcoming environment. From precision cuts to stunning color 
              transformations, we treat every client like family while delivering 
              salon-quality results that exceed expectations.
            </p>

            {/* Quote */}
            <div className="glass-card p-6 mb-10 border-l-4 border-pink-primary">
              <p className="text-foreground italic font-serif text-lg">
                "Beauty is about enhancing what you have. Let yourself shine through."
              </p>
              <p className="text-muted-foreground mt-2">— Sharon, Founder</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-pink-primary/10 to-purple-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-pink-primary" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
