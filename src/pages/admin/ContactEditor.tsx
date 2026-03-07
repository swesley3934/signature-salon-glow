import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteContent, useBatchUpsertSiteContent } from "@/hooks/useSiteContent";

interface BusinessHour {
  day: string;
  hours: string;
}

const DEFAULT_HOURS: BusinessHour[] = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 7:00 PM" },
  { day: "Friday", hours: "9:00 AM - 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactEditor() {
  const { data: content, isLoading } = useSiteContent("contact");
  const batchUpsert = useBatchUpsertSiteContent();

  const [form, setForm] = useState({
    address_line1: "",
    address_line2: "",
    phone: "",
    email: "",
    instagram: "",
    facebook: "",
    booking_url: "",
    map_embed_url: "",
  });
  const [hours, setHours] = useState<BusinessHour[]>(DEFAULT_HOURS);

  useEffect(() => {
    if (content) {
      const getVal = (key: string) =>
        content.find((c) => c.content_key === key)?.content_value || "";

      setForm({
        address_line1: getVal("address_line1"),
        address_line2: getVal("address_line2"),
        phone: getVal("phone"),
        email: getVal("email"),
        instagram: getVal("instagram"),
        facebook: getVal("facebook"),
        booking_url: getVal("booking_url"),
        map_embed_url: getVal("map_embed_url"),
      });

      const savedHours = getVal("business_hours");
      if (savedHours) {
        try {
          setHours(JSON.parse(savedHours));
        } catch {
          setHours(DEFAULT_HOURS);
        }
      }
    }
  }, [content]);

  const handleSave = async () => {
    const items = [
      ...Object.entries(form).map(([key, value]) => ({
        section: "contact",
        content_key: key,
        content_value: value,
      })),
      {
        section: "contact",
        content_key: "business_hours",
        content_value: JSON.stringify(hours),
      },
    ];
    await batchUpsert.mutateAsync(items);
  };

  const updateHour = (index: number, field: "day" | "hours", value: string) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setHours(newHours);
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
          <h1 className="text-3xl font-serif font-bold gradient-text">Contact Info</h1>
          <p className="text-muted-foreground">Update your contact details and business hours</p>
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
        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input
                  id="address_line1"
                  value={form.address_line1}
                  onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                  placeholder="e.g., 123 Main Street"
                />
              </div>
              <div>
                <Label htmlFor="address_line2">Address Line 2</Label>
                <Input
                  id="address_line2"
                  value={form.address_line2}
                  onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                  placeholder="e.g., Suite 100, City, State ZIP"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g., (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g., hello@scsignaturehairsalon.com"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social & Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Links & Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="booking_url">Booking URL</Label>
                <Input
                  id="booking_url"
                  value={form.booking_url}
                  onChange={(e) => setForm({ ...form, booking_url: e.target.value })}
                  placeholder="e.g., https://vagaro.com/your-salon"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  placeholder="e.g., https://instagram.com/scsignature"
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={form.facebook}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  placeholder="e.g., https://facebook.com/scsignature"
                />
              </div>
              <div>
                <Label htmlFor="map_embed_url">Google Maps Embed URL (Optional)</Label>
                <Input
                  id="map_embed_url"
                  value={form.map_embed_url}
                  onChange={(e) => setForm({ ...form, map_embed_url: e.target.value })}
                  placeholder="Google Maps embed URL"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="font-serif">Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hours.map((hour, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input
                      value={hour.day}
                      onChange={(e) => updateHour(index, "day", e.target.value)}
                      placeholder="Day"
                      className="w-40"
                    />
                    <Input
                      value={hour.hours}
                      onChange={(e) => updateHour(index, "hours", e.target.value)}
                      placeholder="Hours (e.g., 9:00 AM - 6:00 PM)"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setHours(hours.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setHours([...hours, { day: "", hours: "" }])}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
