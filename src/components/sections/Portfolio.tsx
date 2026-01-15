import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioImages, PortfolioImage } from "@/hooks/usePortfolio";
import useEmblaCarousel from "embla-carousel-react";

// Static images that are always shown (never deleted unless explicitly requested)
import portfolioStyling1 from "@/assets/portfolio-styling-1.png";
import portfolioStyling2 from "@/assets/portfolio-styling-2.png";
import portfolioStyling3 from "@/assets/portfolio-styling-3.png";
import portfolioColor1 from "@/assets/portfolio-color-1.png";
import portfolioCuts1 from "@/assets/portfolio-cuts-1.png";
import portfolioCuts2 from "@/assets/portfolio-cuts-2.png";
import portfolioCuts3 from "@/assets/portfolio-cuts-3.png";
import portfolioCuts4 from "@/assets/portfolio-cuts-4.png";
import portfolioCuts5 from "@/assets/portfolio-cuts-5.png";
import portfolioLongHair from "@/assets/portfolio-long-hair.png";
import portfolioKidsStyle from "@/assets/portfolio-kids-style.png";

// Static images that are always displayed (can only be removed by editing code)
const staticImages = [
  { id: "static-1", category: "Styling", title: "Bridal Glam", image_url: portfolioStyling1 },
  { id: "static-2", category: "Color", title: "Golden Waves", image_url: portfolioColor1 },
  { id: "static-3", category: "Styling", title: "Casual Chic", image_url: portfolioStyling2 },
  { id: "static-4", category: "Styling", title: "Soft Curls", image_url: portfolioStyling3 },
  { id: "static-5", category: "Cuts", title: "Platinum Pixie", image_url: portfolioCuts1 },
  { id: "static-6", category: "Cuts", title: "Distinguished Gray", image_url: portfolioCuts2 },
  { id: "static-7", category: "Cuts", title: "Textured Curls", image_url: portfolioCuts3 },
  { id: "static-8", category: "Cuts", title: "Clean Fade", image_url: portfolioCuts4 },
  { id: "static-9", category: "Cuts", title: "Classic Trim", image_url: portfolioCuts5 },
  { id: "static-10", category: "Styling", title: "Sleek & Shiny", image_url: portfolioLongHair },
  { id: "static-11", category: "Kids", title: "Fun Pigtails", image_url: portfolioKidsStyle },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
  });

  const { data: portfolioImages = [], isLoading } = usePortfolioImages();

  // Combine database images with static images (database images shown first)
  const images = useMemo(() => {
    return [...portfolioImages, ...staticImages];
  }, [portfolioImages]);

  // Get unique categories from the images
  const categories = useMemo(() => {
    const cats = new Set(images.map((img) => img.category));
    return ["All", ...Array.from(cats)];
  }, [images]);

  const filteredImages = activeFilter === "All" 
    ? images 
    : images.filter((img) => img.category === activeFilter);

  const selectedImageData = selectedImage 
    ? images.find((img) => img.id === selectedImage) 
    : null;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [emblaApi]);

  // Reinitialize carousel when filtered images change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, filteredImages]);

  if (isLoading) {
    return (
      <section id="portfolio" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-purple-primary" />
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-soft/30 to-transparent" />

      <div className="container mx-auto px-4 relative" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-primary/10 text-purple-primary font-medium text-sm mb-6">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            <span className="gradient-text">Portfolio</span> Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our collection of stunning transformations.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => setActiveFilter(category)} 
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category 
                  ? "bg-gradient-to-r from-pink-primary to-purple-primary text-primary-foreground shadow-lg" 
                  : "glass-card hover:bg-white/40 text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={inView ? { opacity: 1 } : {}} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden mx-8" ref={emblaRef}>
            <div className="flex gap-4">
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className="flex-none w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 group cursor-pointer" 
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="glass-card p-2 overflow-hidden h-full">
                    <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                      <img 
                        src={image.image_url} 
                        alt={image.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        style={{ objectPosition: (image as any).objectPosition || "center" }}
                        loading="lazy" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <span className="text-xs text-pink-light uppercase tracking-wider">{image.category}</span>
                          <h3 className="text-primary-foreground font-semibold">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {selectedImageData && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9 }} 
            animate={{ scale: 1 }} 
            className="glass-card max-w-4xl max-h-[90vh] overflow-hidden relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedImageData.image_url} 
              alt={selectedImageData.title} 
              className="w-full h-auto max-h-[85vh] object-contain" 
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;