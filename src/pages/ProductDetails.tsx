import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Star,
  Check,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";

const productImages = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format",
  "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=800&auto=format",
];

const relatedProducts = [
  {
    id: "2",
    name: "Vitamin C 1000mg Tablets",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&auto=format",
    price: 18.50,
    inStock: true,
    category: "Vitamins",
  },
  {
    id: "3",
    name: "Cold & Flu Relief Capsules",
    image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=400&auto=format",
    price: 9.99,
    originalPrice: 12.99,
    inStock: true,
    category: "Cold & Flu",
  },
  {
    id: "7",
    name: "Ibuprofen 400mg Tablets",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format",
    price: 8.99,
    inStock: true,
    category: "Pain Relief",
  },
  {
    id: "8",
    name: "Multivitamin Daily Complex",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&auto=format",
    price: 24.99,
    inStock: true,
    category: "Vitamins",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/search" className="hover:text-primary">Pharmacies</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/pharmacy/1" className="hover:text-primary">HealthFirst Pharmacy</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Paracetamol 500mg</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-card rounded-2xl border border-border overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-contain p-8"
                />
                
                {/* Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 shadow-card flex items-center justify-center hover:bg-card transition-colors"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? productImages.length - 1 : prev - 1
                    )
                  }
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/90 shadow-card flex items-center justify-center hover:bg-card transition-colors"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === productImages.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Discount Badge */}
                <Badge className="absolute top-4 left-4 bg-accent text-lg py-1 px-3">
                  -19%
                </Badge>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`h-20 w-20 rounded-xl border-2 overflow-hidden transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Pain Relief</Badge>
                  <Badge className="bg-success">In Stock</Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Paracetamol 500mg Tablets
                </h1>
                <p className="text-muted-foreground">
                  100 Tablets per pack • Fast-acting pain relief
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4
                          ? "text-warning fill-warning"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">4.0 (128 reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">$12.99</span>
                  <span className="text-xl text-muted-foreground line-through">
                    $15.99
                  </span>
                </div>
                <p className="text-sm text-success font-medium">
                  You save $3.00 (19%)
                </p>
              </div>

              {/* Pharmacy */}
              <Link
                to="/pharmacy/1"
                className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">HealthFirst Pharmacy</p>
                  <p className="text-sm text-muted-foreground">0.5 km away • Open now</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="font-medium">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden">
                    <button
                      className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-16 text-center font-semibold">{quantity}</span>
                    <button
                      className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    243 units available
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="hero" size="xl" className="flex-1">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className={isWishlisted ? "text-accent border-accent" : ""}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="outline" size="xl">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="accent" size="xl" className="w-full">
                Buy Now
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Truck, label: "Free Delivery", desc: "On orders over $30" },
                  { icon: Shield, label: "Genuine Product", desc: "100% authentic" },
                  { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="text-center p-3 rounded-xl bg-muted/50"
                  >
                    <feature.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">How to Use</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (128)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">Product Description</h3>
              <div className="prose text-muted-foreground max-w-none">
                <p className="mb-4">
                  Paracetamol 500mg Tablets provide effective relief from pain and fever. 
                  Each tablet contains 500mg of paracetamol, the active ingredient that works 
                  by blocking the production of certain chemicals in your body that cause pain and fever.
                </p>
                <h4 className="text-foreground font-medium mt-6 mb-2">Key Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Fast-acting pain relief within 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Effective for headaches, toothaches, and muscle pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Reduces fever and cold symptoms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Suitable for adults and children over 12 years</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
              <p className="text-muted-foreground">
                Active Ingredient: Paracetamol 500mg<br />
                Other Ingredients: Maize starch, potassium sorbate, purified talc, stearic acid, 
                povidone, and soluble starch.
              </p>
            </TabsContent>

            <TabsContent value="usage" className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-lg mb-4">How to Use</h3>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Adults and children over 12 years: Take 1-2 tablets every 4-6 hours as needed.
                  Do not exceed 8 tablets in 24 hours.
                </p>
                <p>
                  <strong className="text-foreground">Warning:</strong> Do not take with other products 
                  containing paracetamol. Consult a doctor if symptoms persist.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-border pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                        <span className="font-medium text-primary">SA</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Sarah Adams</span>
                          <div className="flex text-warning">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Reviewed 1 week ago
                        </p>
                        <p className="text-foreground">
                          Works great for headaches and fever. Quick relief and good value for the price.
                          Highly recommend!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
            <Button variant="outline">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
