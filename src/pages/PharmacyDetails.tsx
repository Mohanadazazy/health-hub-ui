import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  ChevronRight,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";
import CategoryCard from "@/components/cards/CategoryCard";

const categories = [
  { id: "pain-relief", name: "Pain Relief", productCount: 12 },
  { id: "cold-flu", name: "Cold & Flu", productCount: 8 },
  { id: "vitamins", name: "Vitamins", productCount: 15 },
  { id: "first-aid", name: "First Aid", productCount: 6 },
  { id: "skin-care", name: "Skin Care", productCount: 10 },
  { id: "digestive", name: "Digestive", productCount: 7 },
];

const mockProducts = [
  {
    id: "1",
    name: "Paracetamol 500mg Tablets (100 Pack)",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format",
    price: 12.99,
    originalPrice: 15.99,
    inStock: true,
    category: "Pain Relief",
  },
  {
    id: "2",
    name: "Vitamin C 1000mg Chewable Tablets",
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
    id: "4",
    name: "First Aid Kit - Complete Set",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&auto=format",
    price: 45.00,
    inStock: false,
    category: "First Aid",
  },
  {
    id: "5",
    name: "Moisturizing Cream 200ml",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format",
    price: 22.99,
    inStock: true,
    category: "Skin Care",
  },
  {
    id: "6",
    name: "Digestive Enzyme Complex",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format",
    price: 28.50,
    originalPrice: 35.00,
    inStock: true,
    category: "Digestive",
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

const PharmacyDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory)
    : [];

  const handleCategoryClick = (categoryName: string) => {
    setSearchParams({ category: categoryName });
  };

  const handleBackToCategories = () => {
    setSearchParams({});
  };

  const handleBackToPharmacies = () => {
    navigate("/pharmacies");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Pharmacy Header */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-primary/80">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-6">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToPharmacies}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pharmacies
            </Button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Pharmacy Logo */}
              <div className="shrink-0">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-primary-light flex items-center justify-center border-4 border-card shadow-card">
                  <span className="text-4xl md:text-5xl font-bold text-primary">H</span>
                </div>
              </div>

              {/* Pharmacy Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        HealthFirst Pharmacy
                      </h1>
                      <Badge className="bg-success">Open</Badge>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      123 Main Street, Downtown, NY 10001
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-bold text-foreground text-lg">4.8</span>
                    </div>
                    <span className="text-muted-foreground">(245 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-5 w-5" />
                    <span>www.healthfirst.com</span>
                  </div>
                </div>

                {/* Pharmacy Tags */}
                <div className="flex flex-wrap gap-2">
                  {["General", "Prescription", "Wellness", "24/7 Delivery"].map(
                    (cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {!selectedCategory ? (
                <>
                  {/* Categories View */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Browse Categories
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Select a category to view available medicines and products
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        {...category}
                        onClick={() => handleCategoryClick(category.name)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Products View */}
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToCategories}
                      className="-ml-2"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Categories
                    </Button>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {selectedCategory}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {filteredProducts.length} products available
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        pharmacyName="HealthFirst Pharmacy"
                      />
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No products found in this category.
                      </p>
                    </div>
                  )}

                  {/* Load More */}
                  {filteredProducts.length > 0 && (
                    <div className="text-center">
                      <Button variant="outline" size="lg">
                        Load More Products
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="info" className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">About This Pharmacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  HealthFirst Pharmacy has been serving the community since 2005. We are committed
                  to providing high-quality pharmaceutical services and healthcare products to our
                  customers. Our team of licensed pharmacists is always available to answer your
                  questions and provide professional advice.
                </p>
                
                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Opening Hours</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>8:00 AM - 10:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sunday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Services</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✓ Prescription Filling</li>
                      <li>✓ Free Delivery</li>
                      <li>✓ Health Consultations</li>
                      <li>✓ Vaccination Services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                          <span className="font-medium text-primary">JD</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">John Doe</span>
                            <div className="flex text-warning">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Reviewed 2 days ago
                          </p>
                          <p className="text-foreground">
                            Excellent pharmacy with great service. The staff is very helpful
                            and knowledgeable. Fast delivery and competitive prices.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PharmacyDetails;
