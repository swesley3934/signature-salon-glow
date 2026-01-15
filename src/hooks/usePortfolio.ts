import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PortfolioImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  before_image_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function usePortfolioImages(category?: string) {
  return useQuery({
    queryKey: ["portfolio_images", category],
    queryFn: async () => {
      let query = supabase.from("portfolio_images").select("*").order("display_order");
      
      if (category && category !== "All") {
        query = query.eq("category", category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as PortfolioImage[];
    },
  });
}

export function useCreatePortfolioImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (image: Omit<PortfolioImage, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("portfolio_images")
        .insert(image)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_images"] });
      toast({ title: "Image added successfully" });
    },
    onError: (error) => {
      toast({ title: "Error adding image", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdatePortfolioImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PortfolioImage> & { id: string }) => {
      const { data, error } = await supabase
        .from("portfolio_images")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_images"] });
      toast({ title: "Image updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error updating image", description: error.message, variant: "destructive" });
    },
  });
}

export function useReorderPortfolioImages() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (updates: { id: string; display_order: number }[]) => {
      const promises = updates.map(({ id, display_order }) =>
        supabase
          .from("portfolio_images")
          .update({ display_order })
          .eq("id", id)
      );
      
      const results = await Promise.all(promises);
      const error = results.find((r) => r.error)?.error;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_images"] });
      toast({ title: "Order updated" });
    },
    onError: (error) => {
      toast({ title: "Error reordering", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeletePortfolioImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("portfolio_images")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio_images"] });
      toast({ title: "Image deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting image", description: error.message, variant: "destructive" });
    },
  });
}

export async function uploadPortfolioImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deletePortfolioImageFile(url: string) {
  const path = url.split("/portfolio-images/").pop();
  if (path) {
    await supabase.storage.from("portfolio-images").remove([path]);
  }
}
