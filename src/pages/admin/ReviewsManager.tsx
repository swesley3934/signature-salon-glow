import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  useReviews,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
  useToggleReviewPublished,
  Review,
} from "@/hooks/useReviews";

export default function ReviewsManager() {
  const { data: reviews, isLoading } = useReviews();
  
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();
  const togglePublished = useToggleReviewPublished();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  const [form, setForm] = useState({
    customer_name: "",
    rating: 5,
    review_text: "",
    service_received: "",
    review_date: "",
    is_published: true,
  });

  const openDialog = (review?: Review) => {
    if (review) {
      setEditingReview(review);
      setForm({
        customer_name: review.customer_name,
        rating: review.rating,
        review_text: review.review_text,
        service_received: review.service_received,
        review_date: review.review_date || "",
        is_published: review.is_published,
      });
    } else {
      setEditingReview(null);
      setForm({
        customer_name: "",
        rating: 5,
        review_text: "",
        service_received: "",
        review_date: "",
        is_published: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      customer_name: form.customer_name,
      rating: form.rating,
      review_text: form.review_text,
      service_received: form.service_received,
      review_date: form.review_date || null,
      is_published: form.is_published,
      avatar_url: null,
    };

    if (editingReview) {
      await updateReview.mutateAsync({ id: editingReview.id, ...payload });
    } else {
      await createReview.mutateAsync(payload);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingReview) return;
    await deleteReview.mutateAsync(deletingReview.id);
    setDeleteDialogOpen(false);
    setDeletingReview(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const publishedCount = reviews?.filter((r) => r.is_published).length ?? 0;
  const unpublishedCount = (reviews?.length ?? 0) - publishedCount;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold gradient-text">Reviews</h1>
          <p className="text-muted-foreground">
            {publishedCount} published, {unpublishedCount} hidden
          </p>
        </div>
        <Button onClick={() => openDialog()} className="glow-button bg-gradient-main">
          <Plus className="h-4 w-4 mr-2" />
          Add Review
        </Button>
      </motion.div>

      {!reviews || reviews.length === 0 ? (
        <Card className="glass-card border-none">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No reviews yet</p>
            <Button onClick={() => openDialog()} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Review
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`glass-card border-none ${!review.is_published && "opacity-60"}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-serif font-semibold">{review.customer_name}</h3>
                        {!review.is_published && (
                          <Badge variant="secondary">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Hidden
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-foreground mb-2">{review.review_text}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.service_received}
                        {review.review_date && ` • ${review.review_date}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublished.mutate({ 
                          id: review.id, 
                          is_published: !review.is_published 
                        })}
                        title={review.is_published ? "Hide review" : "Show review"}
                      >
                        {review.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(review)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeletingReview(review);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card border-none">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingReview ? "Edit Review" : "Add Review"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer_name">Customer Name</Label>
              <Input
                id="customer_name"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                placeholder="e.g., Jennifer M."
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, rating: i + 1 })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < form.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="review_text">Review Text</Label>
              <Textarea
                id="review_text"
                value={form.review_text}
                onChange={(e) => setForm({ ...form, review_text: e.target.value })}
                placeholder="Customer's review..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service_received">Service Received</Label>
                <Input
                  id="service_received"
                  value={form.service_received}
                  onChange={(e) => setForm({ ...form, service_received: e.target.value })}
                  placeholder="e.g., Balayage"
                />
              </div>
              <div>
                <Label htmlFor="review_date">Date (Optional)</Label>
                <Input
                  id="review_date"
                  value={form.review_date}
                  onChange={(e) => setForm({ ...form, review_date: e.target.value })}
                  placeholder="e.g., January 2025"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={form.is_published}
                onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
              />
              <Label htmlFor="is_published" className="cursor-pointer">
                Published (visible on website)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !form.customer_name ||
                !form.review_text ||
                !form.service_received ||
                createReview.isPending ||
                updateReview.isPending
              }
              className="bg-gradient-main"
            >
              {(createReview.isPending || updateReview.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingReview?.customer_name}'s review? 
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
