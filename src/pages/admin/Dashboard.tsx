import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scissors,
  Image,
  MessageSquare,
  User,
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const statsCards = [
  {
    title: "Service Categories",
    icon: Scissors,
    table: "service_categories",
    link: "/admin/services",
    color: "text-pink-primary",
  },
  {
    title: "Portfolio Images",
    icon: Image,
    table: "portfolio_images",
    link: "/admin/portfolio",
    color: "text-purple-primary",
  },
  {
    title: "Reviews",
    icon: MessageSquare,
    table: "reviews",
    link: "/admin/reviews",
    color: "text-pink-primary",
  },
];

export default function Dashboard() {
  const { data: categoriesCount, isLoading: loadingCategories } = useQuery({
    queryKey: ["admin-stats", "service_categories"],
    queryFn: async () => {
      const { count } = await supabase
        .from("service_categories")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: portfolioCount, isLoading: loadingPortfolio } = useQuery({
    queryKey: ["admin-stats", "portfolio_images"],
    queryFn: async () => {
      const { count } = await supabase
        .from("portfolio_images")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: reviewsCount, isLoading: loadingReviews } = useQuery({
    queryKey: ["admin-stats", "reviews"],
    queryFn: async () => {
      const { count } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const counts = [categoriesCount, portfolioCount, reviewsCount];
  const loading = [loadingCategories, loadingPortfolio, loadingReviews];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-serif font-bold gradient-text mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage your salon's content from this dashboard
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">
                  {loading[index] ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    counts[index]
                  )}
                </div>
                <Link to={card.link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                  >
                    Manage <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-serif font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/services">
            <Card className="glass-card border-none hover:shadow-glass-hover transition-all cursor-pointer group">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Edit Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Update prices & offerings
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/portfolio">
            <Card className="glass-card border-none hover:shadow-glass-hover transition-all cursor-pointer group">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Image className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Add Photos</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload portfolio images
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/about">
            <Card className="glass-card border-none hover:shadow-glass-hover transition-all cursor-pointer group">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-accent/30 group-hover:bg-accent/50 transition-colors">
                  <User className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">About Section</h3>
                  <p className="text-sm text-muted-foreground">
                    Edit your story
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/contact">
            <Card className="glass-card border-none hover:shadow-glass-hover transition-all cursor-pointer group">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-full bg-pink-primary/10 group-hover:bg-pink-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-pink-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Contact Info</h3>
                  <p className="text-sm text-muted-foreground">
                    Update hours & details
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>

      {/* View Site Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Link to="/" target="_blank">
          <Button variant="outline" className="gap-2">
            View Public Site
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
