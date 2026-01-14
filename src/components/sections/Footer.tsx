import { motion } from "framer-motion";
import { Heart, Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://sharoncarr.glossgenius.com/book";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Reviews", href: "#reviews" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Hair Services", href: "#services" },
    { name: "Color Services", href: "#services" },
    { name: "Treatments", href: "#services" },
    { name: "Facials", href: "#services" },
    { name: "Makeup", href: "#services" },
    { name: "Threading & Waxing", href: "#services" },
  ],
};

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />
      
      {/* Main Footer */}
      <div className="bg-gradient-to-b from-purple-soft to-purple-soft/90 pt-20 pb-8">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-soft/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-light/20 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          {/* Top Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="text-3xl font-serif font-bold text-purple-dark mb-4 inline-block"
              >
                SC Signature
              </motion.a>
              <p className="text-purple-dark/70 text-sm leading-relaxed mb-6">
                Where beauty meets artistry. Your trusted destination for premium hair and beauty services.
              </p>
              <Button
                variant="gradient"
                onClick={() => window.open(BOOKING_URL, "_blank")}
              >
                Book Now
              </Button>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-purple-dark mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-purple-dark/70 hover:text-pink-dark transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-purple-dark mb-4">Our Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-purple-dark/70 hover:text-pink-dark transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-purple-dark mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-pink-dark flex-shrink-0 mt-0.5" />
                  <span className="text-purple-dark/70">
                    624 Montgomery Hwy Suite 10<br />
                    Vestavia Hills, AL 35216
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+12056159273"
                    className="flex items-center gap-3 text-sm text-purple-dark/70 hover:text-pink-dark transition-colors"
                  >
                    <Phone className="w-4 h-4 text-pink-dark" />
                    (205) 615-9273
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:scsignaturestyles@gmail.com"
                    className="flex items-center gap-3 text-sm text-purple-dark/70 hover:text-pink-dark transition-colors"
                  >
                    <Mail className="w-4 h-4 text-pink-dark" />
                    scsignaturestyles@gmail.com
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.instagram.com/sharoncarr5488/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-primary/10 flex items-center justify-center text-purple-dark hover:bg-pink-primary hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61563807729360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-primary/10 flex items-center justify-center text-purple-dark hover:bg-pink-primary hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-purple-primary/20 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-dark/50 text-sm">
              © {new Date().getFullYear()} SC Signature Hair Salon. All rights reserved.
            </p>
            <p className="text-purple-dark/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-pink-primary fill-pink-primary" /> for beauty
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
