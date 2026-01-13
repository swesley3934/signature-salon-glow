import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Upload, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  usePortfolioImages,
  useCreatePortfolioImage,
  useUpdatePortfolioImage,
  useDeletePortfolioImage,
  uploadPortfolioImage,
  deletePortfolioImageFile,
  PortfolioImage,
} from "@/hooks/usePortfolio";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Color", "Cut", "Style", "Treatment"];

export default function PortfolioManager() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: images, isLoading } = usePortfolioImages(activeFilter === "All" ? undefined : activeFilter);
  
  const createImage = useCreatePortfolioImage();
  const updateImage = useUpdatePortfolioImage();
  const deleteImage = useDeletePortfolioImage();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<PortfolioImage | null>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Color",
    image_url: "",
    is_featured: false,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openDialog = (image?: PortfolioImage) => {
    if (image) {
      setEditingImage(image);
      setForm({
        title: image.title,
        category: image.category,
        image_url: image.image_url,
        is_featured: image.is_featured,
      });
      setPreviewUrl(image.image_url);
    } else {
      setEditingImage(null);
      setForm({ title: "", category: "Color", image_url: "", is_featured: false });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setUploading(true);
    try {
      let imageUrl = form.image_url;

      if (selectedFile) {
        imageUrl = await uploadPortfolioImage(selectedFile);
      }

      const payload = {
        title: form.title,
        category: form.category,
        image_url: imageUrl,
        is_featured: form.is_featured,
        display_order: editingImage?.display_order ?? (images?.length ?? 0),
        before_image_url: null,
      };

      if (editingImage) {
        await updateImage.mutateAsync({ id: editingImage.id, ...payload });
      } else {
        await createImage.mutateAsync(payload);
      }
      setDialogOpen(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingImage) return;
    
    // Delete file from storage
    if (deletingImage.image_url) {
      await deletePortfolioImageFile(deletingImage.image_url);
    }
    
    await deleteImage.mutateAsync(deletingImage.id);
    setDeleteDialogOpen(false);
    setDeletingImage(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold gradient-text">Portfolio</h1>
          <p className="text-muted-foreground">Manage your gallery images</p>
        </div>
        <Button onClick={() => openDialog()} className="glow-button bg-gradient-main">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {["All", ...CATEGORIES].map((cat) => (
          <Button
            key={cat}
            variant={activeFilter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(cat)}
            className={cn(
              activeFilter === cat && "bg-gradient-main"
            )}
          >
            {cat}
          </Button>
        ))}
      </motion.div>

      {/* Images Grid */}
      {!images || images.length === 0 ? (
        <Card className="glass-card border-none">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No portfolio images yet</p>
            <Button onClick={() => openDialog()} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card border-none overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  {image.is_featured && (
                    <Badge className="absolute top-2 left-2 bg-gradient-main">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openDialog(image)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        setDeletingImage(image);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium truncate">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card border-none max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingImage ? "Edit Image" : "Add Image"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload/Preview */}
            <div>
              <Label>Image</Label>
              <div className="mt-2">
                {previewUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                        setForm({ ...form, image_url: "" });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Balayage Transformation"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured image
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!form.title || (!form.image_url && !selectedFile) || uploading}
              className="bg-gradient-main"
            >
              {uploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingImage?.title}"? This action cannot be undone.
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
