import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, Grid3X3, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import ProductCard from "@/components/cards/ProductCard";
import SearchFilters from "@/components/search/SearchFilters";

const mockMedicines = [
  {
    id: "1",
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format",
    price: 4.99,
    originalPrice: 6.99,
    inStock: true,
    category: "Pain Relief",
    pharmacyName: "HealthFirst Pharmacy",
    pharmacyDistance: "0.5 km",
  },
  {
    id: "2",
    name: "Vitamin C 1000mg Effervescent",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format",
    price: 8.49,
    inStock: true,
    category: "Vitamins",
    pharmacyName: "MediCare Plus",
    pharmacyDistance: "1.2 km",
  },
  {
    id: "3",
    name: "Ibuprofen 400mg Capsules",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format",
    price: 5.99,
    originalPrice: 7.49,
    inStock: true,
    category: "Pain Relief",
    pharmacyName: "QuickMeds Pharmacy",
    pharmacyDistance: "1.8 km",
  },
  {
    id: "4",
    name: "Cetirizine 10mg Allergy Relief",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format",
    price: 6.29,
    inStock: false,
    category: "Allergy",
    pharmacyName: "Family Health Store",
    pharmacyDistance: "2.3 km",
  },
  {
    id: "5",
    name: "Omeprazole 20mg Capsules",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format",
    price: 9.99,
    originalPrice: 12.99,
    inStock: true,
    category: "Digestive Health",
    pharmacyName: "Central Drugstore",
    pharmacyDistance: "2.8 km",
  },
  {
    id: "6",
    name: "Multivitamin Daily Complex",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format",
    price: 12.99,
    inStock: true,
    category: "Vitamins",
    pharmacyName: "Wellness Pharmacy",
    pharmacyDistance: "3.1 km",
  },
  {
    id: "7",
    name: "Bandage First Aid Kit",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format",
    price: 14.99,
    originalPrice: 19.99,
    inStock: true,
    category: "First Aid",
    pharmacyName: "HealthFirst Pharmacy",
    pharmacyDistance: "0.5 km",
  },
  {
    id: "8",
    name: "Cough Syrup 200ml",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format",
    price: 7.49,
    inStock: true,
    category: "Cold & Flu",
    pharmacyName: "MediCare Plus",
    pharmacyDistance: "1.2 km",
  },
];

const Search = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedicines = mockMedicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-primary-light border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Find Medicines
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Showing results from pharmacies near you
                </p>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medicines..."
                    className="pl-10 bg-card border-border"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <SearchFilters />
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredMedicines.length}</span>{" "}
                    medicines found
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Select defaultValue="distance">
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Nearest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-none"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className="rounded-none"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 animate-fade-in">
                  <SearchFilters />
                </div>
              )}

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="pl-3 pr-2 py-1.5">
                  In Stock
                  <button className="ml-2 hover:text-destructive">×</button>
                </Badge>
                <Badge variant="secondary" className="pl-3 pr-2 py-1.5">
                  Within 5 km
                  <button className="ml-2 hover:text-destructive">×</button>
                </Badge>
              </div>

              {/* Results Grid */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredMedicines.map((medicine) => (
                  <ProductCard key={medicine.id} {...medicine} />
                ))}
              </div>

              {filteredMedicines.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No medicines found matching your search.</p>
                </div>
              )}

              {/* Load More */}
              {filteredMedicines.length > 0 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    Load More Medicines
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
