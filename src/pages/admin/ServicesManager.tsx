import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, GripVertical, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useServicesWithCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateService,
  useUpdateService,
  useDeleteService,
  ServiceCategory,
  Service,
} from "@/hooks/useServices";

const ICONS = ["Scissors", "Palette", "Sparkles", "Eye", "Droplet", "Heart", "Brush", "Crown"];

export default function ServicesManager() {
  const { data, isLoading } = useServicesWithCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const { toast } = useToast();

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ type: "category" | "service"; id: string; name: string } | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    icon: "Scissors",
    description: "",
  });
  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    duration: "",
    note: "",
    deposit: "",
    image_url: "",
  });

  const openCategoryDialog = (category?: ServiceCategory) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        icon: category.icon,
        description: category.description || "",
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: "", icon: "Scissors", description: "" });
    }
    setCategoryDialogOpen(true);
  };

  const openServiceDialog = (categoryId: string, service?: Service) => {
    setSelectedCategoryId(categoryId);
    if (service) {
      setEditingService(service);
      setServiceForm({
        name: service.name,
        price: service.price,
        duration: service.duration,
        note: service.note || "",
        deposit: service.deposit || "",
        image_url: service.image_url || "",
      });
    } else {
      setEditingService(null);
      setServiceForm({ name: "", price: "", duration: "", note: "", deposit: "", image_url: "" });
    }
    setServiceDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);

      setServiceForm(prev => ({ ...prev, image_url: publicUrl }));
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error uploading image", description: error.message, variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setServiceForm(prev => ({ ...prev, image_url: "" }));
  };

  const handleSaveCategory = async () => {
    const payload = {
      name: categoryForm.name,
      icon: categoryForm.icon,
      description: categoryForm.description || null,
      display_order: editingCategory?.display_order ?? (data?.categories.length ?? 0),
      image_url: null,
    };

    if (editingCategory) {
      await updateCategory.mutateAsync({ id: editingCategory.id, ...payload });
    } else {
      await createCategory.mutateAsync(payload);
    }
    setCategoryDialogOpen(false);
  };

  const handleSaveService = async () => {
    const payload = {
      category_id: selectedCategoryId,
      name: serviceForm.name,
      price: serviceForm.price,
      duration: serviceForm.duration,
      note: serviceForm.note || null,
      deposit: serviceForm.deposit || null,
      image_url: serviceForm.image_url || null,
      display_order: editingService?.display_order ?? 0,
    };

    if (editingService) {
      await updateService.mutateAsync({ id: editingService.id, ...payload });
    } else {
      await createService.mutateAsync(payload);
    }
    setServiceDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    
    if (deletingItem.type === "category") {
      await deleteCategory.mutateAsync(deletingItem.id);
    } else {
      await deleteService.mutateAsync(deletingItem.id);
    }
    setDeleteDialogOpen(false);
    setDeletingItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const categories = data?.categories ?? [];
  const services = data?.services ?? [];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold gradient-text">Services</h1>
          <p className="text-muted-foreground">Manage your service categories and offerings</p>
        </div>
        <Button onClick={() => openCategoryDialog()} className="glow-button bg-gradient-main">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </motion.div>

      {categories.length === 0 ? (
        <Card className="glass-card border-none">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No service categories yet</p>
            <Button onClick={() => openCategoryDialog()} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="multiple" className="space-y-4">
          {categories.map((category, index) => {
            const categoryServices = services.filter((s) => s.category_id === category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={category.id} className="glass-card border-none rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4 flex-1">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <div className="text-left">
                        <h3 className="font-serif font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {categoryServices.length} services • {category.icon}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mr-4" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openCategoryDialog(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeletingItem({ type: "category", id: category.id, name: category.name });
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-2">
                      {categoryServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {service.image_url ? (
                              <img 
                                src={service.image_url} 
                                alt={service.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {service.price} • {service.duration}
                                {service.note && ` • ${service.note}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openServiceDialog(category.id, service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDeletingItem({ type: "service", id: service.id, name: service.name });
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => openServiceDialog(category.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      )}

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="glass-card border-none">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g., Hair Services"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={categoryForm.icon}
                onValueChange={(v) => setCategoryForm({ ...categoryForm, icon: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICONS.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Brief description of this category"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveCategory}
              disabled={!categoryForm.name || createCategory.isPending || updateCategory.isPending}
              className="bg-gradient-main"
            >
              {(createCategory.isPending || updateCategory.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="glass-card border-none">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingService ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                placeholder="e.g., Women's Haircut"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  placeholder="e.g., $60+"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  placeholder="e.g., 60 min"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                value={serviceForm.note}
                onChange={(e) => setServiceForm({ ...serviceForm, note: e.target.value })}
                placeholder="e.g., Toner Included"
              />
            </div>
            <div>
              <Label htmlFor="deposit">Deposit (Optional)</Label>
              <Input
                id="deposit"
                value={serviceForm.deposit}
                onChange={(e) => setServiceForm({ ...serviceForm, deposit: e.target.value })}
                placeholder="e.g., $50"
              />
            </div>
            <div>
              <Label>Service Image (Optional)</Label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {serviceForm.image_url ? (
                <div className="relative mt-2">
                  <img 
                    src={serviceForm.image_url} 
                    alt="Service preview" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {uploadingImage ? "Uploading..." : "Upload Image"}
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveService}
              disabled={!serviceForm.name || !serviceForm.price || !serviceForm.duration || createService.isPending || updateService.isPending}
              className="bg-gradient-main"
            >
              {(createService.isPending || updateService.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deletingItem?.type === "category" ? "Category" : "Service"}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingItem?.name}"? 
              {deletingItem?.type === "category" && " This will also delete all services in this category."}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
