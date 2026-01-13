import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_received: string;
  review_date: string | null;
  avatar_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function useReviews(publishedOnly = false) {
  return useQuery({
    queryKey: ["reviews", publishedOnly],
    queryFn: async () => {
      let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });
      
      if (publishedOnly) {
        query = query.eq("is_published", true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Review[];
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (review: Omit<Review, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("reviews")
        .insert(review)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Review created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating review", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Review> & { id: string }) => {
      const { data, error } = await supabase
        .from("reviews")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Review updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error updating review", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ title: "Review deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting review", description: error.message, variant: "destructive" });
    },
  });
}

export function useToggleReviewPublished() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { data, error } = await supabase
        .from("reviews")
        .update({ is_published })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({ 
        title: data.is_published ? "Review published" : "Review unpublished" 
      });
    },
    onError: (error) => {
      toast({ title: "Error updating review", description: error.message, variant: "destructive" });
    },
  });
}
