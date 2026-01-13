import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const { user, isLoading, isAdmin, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="glass-card p-8 flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="decorative-blob w-96 h-96 -top-48 -left-48" />
      <div className="decorative-blob w-64 h-64 -bottom-32 -right-32" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 max-w-md w-full mx-4 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold gradient-text mb-2">
            SC Signature
          </h1>
          <h2 className="text-xl font-serif text-foreground mb-2">
            Admin Portal
          </h2>
          <p className="text-muted-foreground">
            Sign in to manage your salon's content
          </p>
        </div>

        {user && !isAdmin ? (
          <div className="text-center">
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Signed in as:</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <p className="text-destructive text-sm mb-4">
              You don't have admin privileges. Please contact the site owner.
            </p>
            <Button
              variant="outline"
              onClick={() => signInWithGoogle()}
              className="w-full"
            >
              Try a different account
            </Button>
          </div>
        ) : (
          <Button
            onClick={signInWithGoogle}
            className="w-full h-12 glow-button bg-gradient-main text-white font-medium"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6">
          Access restricted to authorized administrators only
        </p>
      </motion.div>
    </div>
  );
}
