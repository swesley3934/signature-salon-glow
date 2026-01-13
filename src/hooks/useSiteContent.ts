import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SiteContent {
  id: string;
  section: string;
  content_key: string;
  content_value: string | null;
  created_at: string;
  updated_at: string;
}

export function useSiteContent(section?: string) {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      let query = supabase.from("site_content").select("*");
      
      if (section) {
        query = query.eq("section", section);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as SiteContent[];
    },
  });
}

export function useSiteContentByKey(section: string, key: string) {
  return useQuery({
    queryKey: ["site_content", section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section)
        .eq("content_key", key)
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteContent | null;
    },
  });
}

export function useUpsertSiteContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ section, content_key, content_value }: { section: string; content_key: string; content_value: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .upsert(
          { section, content_key, content_value },
          { onConflict: "section,content_key" }
        )
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Content saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving content", description: error.message, variant: "destructive" });
    },
  });
}

export function useBatchUpsertSiteContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (items: { section: string; content_key: string; content_value: string }[]) => {
      const { data, error } = await supabase
        .from("site_content")
        .upsert(items, { onConflict: "section,content_key" })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast({ title: "Content saved successfully" });
    },
    onError: (error) => {
      toast({ title: "Error saving content", description: error.message, variant: "destructive" });
    },
  });
}

export async function uploadSiteImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("site-images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("site-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
