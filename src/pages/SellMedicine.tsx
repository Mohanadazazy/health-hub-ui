import { useState } from "react";
import {
  Upload,
  X,
  Plus,
  Camera,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  "Pain Relief",
  "Cold & Flu",
  "Vitamins & Supplements",
  "First Aid",
  "Skin Care",
  "Digestive Health",
  "Allergy",
  "Diabetes Care",
  "Other",
];

const conditions = ["New (Sealed)", "Like New", "Good", "Acceptable"];

const SellMedicine = () => {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    expiryDate: "",
    condition: "",
    prescriptionRequired: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Medicine name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (images.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Sell Your Medicine
              </h1>
              <p className="text-muted-foreground">
                List your unused medicines and help others while earning money
              </p>
            </div>

            {/* Info Banner */}
            <div className="bg-primary-light rounded-2xl p-4 mb-8 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">Before you list:</p>
                <ul className="text-primary/80 space-y-1">
                  <li>• Only list medicines that are sealed and unexpired</li>
                  <li>• Prescription medicines require verification</li>
                  <li>• All listings are reviewed within 24 hours</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <Label className="text-lg font-semibold mb-4 block">
                  Product Images
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload up to 5 clear photos of your medicine. Include the packaging,
                  expiry date, and batch number.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border border-border group"
                    >
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-primary text-xs">
                          Main
                        </Badge>
                      )}
                    </div>
                  ))}

                  {images.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {errors.images && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.images}
                  </p>
                )}
              </div>

              {/* Medicine Details */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <h3 className="text-lg font-semibold">Medicine Details</h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Medicine Name */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Medicine Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Paracetamol 500mg"
                      className={`h-12 ${errors.name ? "border-destructive" : ""}`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className={`h-12 ${errors.category ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <Label>Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) =>
                        setFormData({ ...formData, condition: value })
                      }
                    >
                      <SelectTrigger className={`h-12 ${errors.condition ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond} value={cond}>
                            {cond}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && (
                      <p className="text-sm text-destructive">{errors.condition}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your medicine, including dosage, quantity, and any relevant details..."
                      className="min-h-24 resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <h3 className="text-lg font-semibold">Pricing & Details</h3>

                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className={`h-12 ${errors.price ? "border-destructive" : ""}`}
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      className="h-12"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date *</Label>
                    <Input
                      id="expiry"
                      type="date"
                      className={`h-12 ${errors.expiryDate ? "border-destructive" : ""}`}
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive">{errors.expiryDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      List Medicine for Sale
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" size="xl">
                  Save as Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellMedicine;
