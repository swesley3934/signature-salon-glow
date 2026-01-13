import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent, useBatchUpsertSiteContent, uploadSiteImage } from "@/hooks/useSiteContent";

export default function AboutEditor() {
  const { data: content, isLoading } = useSiteContent("about");
  const batchUpsert = useBatchUpsertSiteContent();
  
  const [form, setForm] = useState({
    owner_name: "",
    tagline: "",
    story: "",
    mission: "",
    years_experience: "",
    happy_clients: "",
    awards: "",
    services_count: "",
    owner_image: "",
    salon_image: "",
  });
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (content) {
      const getVal = (key: string) => 
        content.find((c) => c.content_key === key)?.content_value || "";
      
      setForm({
        owner_name: getVal("owner_name"),
        tagline: getVal("tagline"),
        story: getVal("story"),
        mission: getVal("mission"),
        years_experience: getVal("years_experience"),
        happy_clients: getVal("happy_clients"),
        awards: getVal("awards"),
        services_count: getVal("services_count"),
        owner_image: getVal("owner_image"),
        salon_image: getVal("salon_image"),
      });
    }
  }, [content]);

  const handleSave = async () => {
    const items = Object.entries(form).map(([key, value]) => ({
      section: "about",
      content_key: key,
      content_value: value,
    }));
    await batchUpsert.mutateAsync(items);
  };

  const handleImageUpload = async (field: "owner_image" | "salon_image", file: File) => {
    setUploading(field);
    try {
      const url = await uploadSiteImage(file);
      setForm({ ...form, [field]: url });
    } finally {
      setUploading(null);
    }
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
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold gradient-text">About Section</h1>
          <p className="text-muted-foreground">Edit your salon's story and information</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={batchUpsert.isPending}
          className="glow-button bg-gradient-main"
        >
          {batchUpsert.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="owner_name">Owner/Stylist Name</Label>
                <Input
                  id="owner_name"
                  value={form.owner_name}
                  onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                  placeholder="e.g., Sharon"
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g., Where Beauty Meets Artistry"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="years_experience">Years Experience</Label>
                <Input
                  id="years_experience"
                  value={form.years_experience}
                  onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
                  placeholder="e.g., 15+"
                />
              </div>
              <div>
                <Label htmlFor="happy_clients">Happy Clients</Label>
                <Input
                  id="happy_clients"
                  value={form.happy_clients}
                  onChange={(e) => setForm({ ...form, happy_clients: e.target.value })}
                  placeholder="e.g., 5000+"
                />
              </div>
              <div>
                <Label htmlFor="awards">Awards/Recognition</Label>
                <Input
                  id="awards"
                  value={form.awards}
                  onChange={(e) => setForm({ ...form, awards: e.target.value })}
                  placeholder="e.g., 10+"
                />
              </div>
              <div>
                <Label htmlFor="services_count">Services Offered</Label>
                <Input
                  id="services_count"
                  value={form.services_count}
                  onChange={(e) => setForm({ ...form, services_count: e.target.value })}
                  placeholder="e.g., 50+"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Your Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story">About Story</Label>
                <Textarea
                  id="story"
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  placeholder="Tell your story..."
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={form.mission}
                  onChange={(e) => setForm({ ...form, mission: e.target.value })}
                  placeholder="Your mission..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Owner/Stylist Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {form.owner_image ? (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={form.owner_image}
                    alt="Owner"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => setForm({ ...form, owner_image: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  {uploading === "owner_image" ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload photo</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload("owner_image", file);
                    }}
                    disabled={uploading === "owner_image"}
                  />
                </label>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Salon Interior Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {form.salon_image ? (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={form.salon_image}
                    alt="Salon"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => setForm({ ...form, salon_image: "" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  {uploading === "salon_image" ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload photo</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload("salon_image", file);
                    }}
                    disabled={uploading === "salon_image"}
                  />
                </label>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
