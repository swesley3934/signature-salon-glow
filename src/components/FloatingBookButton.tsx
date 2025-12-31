import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BOOKING_URL = "https://sharoncarr.glossgenius.com/book";

const FloatingBookButton = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 lg:hidden"
    >
      <Button
        variant="glow"
        size="lg"
        onClick={() => window.open(BOOKING_URL, "_blank")}
        className="shadow-2xl"
      >
        <Calendar className="w-5 h-5" />
        Book Now
      </Button>
    </motion.div>
  );
};

export default FloatingBookButton;
