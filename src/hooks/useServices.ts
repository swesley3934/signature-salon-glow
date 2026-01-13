import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id: string;
  name: string;
  price: string;
  duration: string;
  note: string | null;
  deposit: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useServiceCategories() {
  return useQuery({
    queryKey: ["service_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_categories")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data as ServiceCategory[];
    },
  });
}

export function useServices(categoryId?: string) {
  return useQuery({
    queryKey: ["services", categoryId],
    queryFn: async () => {
      let query = supabase.from("services").select("*").order("display_order");
      
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useServicesWithCategories() {
  return useQuery({
    queryKey: ["services_with_categories"],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from("service_categories")
        .select("*")
        .order("display_order");
      
      if (catError) throw catError;

      const { data: services, error: servError } = await supabase
        .from("services")
        .select("*")
        .order("display_order");
      
      if (servError) throw servError;

      return { 
        categories: categories as ServiceCategory[], 
        services: services as Service[] 
      };
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (category: Omit<ServiceCategory, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("service_categories")
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service_categories"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Category created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating category", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ServiceCategory> & { id: string }) => {
      const { data, error } = await supabase
        .from("service_categories")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service_categories"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Category updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error updating category", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("service_categories")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service_categories"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting category", description: error.message, variant: "destructive" });
    },
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (service: Omit<Service, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("services")
        .insert(service)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Service created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating service", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Service updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error updating service", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services_with_categories"] });
      toast({ title: "Service deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting service", description: error.message, variant: "destructive" });
    },
  });
}
