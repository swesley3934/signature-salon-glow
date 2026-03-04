import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BOOKING_URL = "https://sharoncarr.glossgenius.com/book";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "624 Montgomery Hwy Suite 10",
    subValue: "Vestavia Hills, AL 35216",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(205) 615-9273",
    href: "tel:+12056159273",
  },
  {
    icon: Mail,
    label: "Email",
    value: "scsignaturestyles@gmail.com",
    href: "mailto:scsignaturestyles@gmail.com",
  },
];

const hours = [
  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "9:00 AM - 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-soft/20 to-purple-soft/20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-pink-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-primary/10 text-purple-primary font-medium text-sm mb-6">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or ready to book? Reach out to us and let's make your beauty dreams come true.
          </p>
        </motion.div>

        {/* Contact Grid - 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card p-6 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-primary/20 to-purple-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <info.icon className="w-5 h-5 text-pink-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                <p className="font-medium text-foreground group-hover:text-pink-primary transition-colors">
                  {info.value}
                </p>
                {info.subValue && (
                  <p className="text-muted-foreground text-sm">{info.subValue}</p>
                )}
              </div>
            </motion.a>
          ))}

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-pink-primary" />
              <h3 className="font-semibold text-foreground">Hours of Operation</h3>
            </div>
            <div className="space-y-2">
              {hours.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium text-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Google Maps - spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="md:col-span-2 relative group"
          >
            {/* Gradient border wrapper */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-primary via-purple-primary to-pink-primary rounded-2xl opacity-50 group-hover:opacity-75 blur-sm transition-opacity" />
            <div className="relative glass-card p-2 overflow-hidden">
              <div className="aspect-[21/9] rounded-xl overflow-hidden ring-1 ring-white/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.594538585831!2d-86.79352442484942!3d33.4486465493616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88891904bed4f85b%3A0x3e5f38a9a4912375!2s624%20Montgomery%20Hwy%20suite%2010%2C%20Vestavia%20Hills%2C%20AL%2035216!5e1!3m2!1sen!2sus!4v1768350331846!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SC Signature Hair Salon Location"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links & Book CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/sharoncarr5488/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-pink-primary hover:scale-110 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61563807729360"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-pink-primary hover:scale-110 transition-all"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => window.open(BOOKING_URL, "_blank")}
          >
            Book Your Appointment
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
