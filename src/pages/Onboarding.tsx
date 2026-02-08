import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Loader2, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const { user, loading, onboardingCompleted, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (onboardingCompleted) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.full_name.trim()) newErrors.full_name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        onboarding_completed: true,
      })
      .eq("user_id", user.id);

    setSaving(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      await refreshProfile();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <Pill className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">MediConnect</span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Complete your profile</h1>
          <p className="text-muted-foreground mt-2">
            Tell us a bit about yourself so we can personalize your experience
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-primary" />
          <div className="h-1.5 flex-1 rounded-full bg-primary/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="full_name"
                placeholder="Your full name"
                className={`pl-10 h-12 ${errors.full_name ? "border-destructive" : ""}`}
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={`pl-10 h-12 ${errors.phone ? "border-destructive" : ""}`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Your delivery address"
                className={`pl-10 h-12 ${errors.address ? "border-destructive" : ""}`}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="city"
                placeholder="Your city"
                className={`pl-10 h-12 ${errors.city ? "border-destructive" : ""}`}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Continue to MediConnect"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
