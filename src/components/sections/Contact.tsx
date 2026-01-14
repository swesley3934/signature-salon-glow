import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, phone, service, message },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent! ✨",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-5 flex items-start gap-4 block group"
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
            </div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
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

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="relative group"
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-primary via-purple-primary to-pink-primary rounded-2xl opacity-50 group-hover:opacity-75 blur-sm transition-opacity" />
              <div className="relative glass-card p-2 overflow-hidden">
                <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-white/20">
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

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
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
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="bg-white/50 border-white/30 focus:border-pink-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-white/50 border-white/30 focus:border-pink-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="bg-white/50 border-white/30 focus:border-pink-primary"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full h-10 px-3 rounded-full bg-white/50 border border-white/30 focus:border-pink-primary focus:outline-none focus:ring-2 focus:ring-pink-primary/20 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="haircut">Hair Services</option>
                    <option value="color">Color Services</option>
                    <option value="treatment">Treatments</option>
                    <option value="facial">Facials</option>
                    <option value="makeup">Makeup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your beauty goals..."
                    rows={4}
                    className="bg-white/50 border-white/30 focus:border-pink-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>

              {/* Quick Book CTA */}
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-muted-foreground text-sm mb-3">
                  Ready to book an appointment?
                </p>
                <Button
                  variant="glass-outline"
                  onClick={() => window.open(BOOKING_URL, "_blank")}
                >
                  Book Online Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
