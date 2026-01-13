import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, Loader2 } from "lucide-react";
import { usePortfolioImages, PortfolioImage } from "@/hooks/usePortfolio";

// Fallback images for when database is empty
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const fallbackImages = [
  { id: "1", category: "Color", title: "Balayage Transformation", image_url: portfolio1 },
  { id: "2", category: "Styling", title: "Bridal Updo", image_url: portfolio2 },
  { id: "3", category: "Cuts", title: "Platinum Bob", image_url: portfolio3 },
  { id: "4", category: "Color", title: "Copper Red Glam", image_url: portfolio4 },
  { id: "5", category: "Color", title: "Honey Highlights", image_url: portfolio1 },
  { id: "6", category: "Styling", title: "Elegant Updo", image_url: portfolio2 },
  { id: "7", category: "Cuts", title: "Sleek Modern Cut", image_url: portfolio3 },
  { id: "8", category: "Color", title: "Vibrant Auburn", image_url: portfolio4 },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { data: portfolioImages = [], isLoading } = usePortfolioImages();

  // Use database images if available, otherwise fallback
  const images = portfolioImages.length > 0 ? portfolioImages : fallbackImages;

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
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div 
              key={image.id} 
              layout 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.4, delay: index * 0.05 }} 
              className="break-inside-avoid group cursor-pointer" 
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="glass-card p-2 overflow-hidden">
                <div className={`relative rounded-xl overflow-hidden ${
                  index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                }`}>
                  <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
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
            </motion.div>
          ))}
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