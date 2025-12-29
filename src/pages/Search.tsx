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
import PharmacyCard from "@/components/cards/PharmacyCard";
import SearchFilters from "@/components/search/SearchFilters";

const mockPharmacies = [
  {
    id: "1",
    name: "HealthFirst Pharmacy",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format",
    distance: "0.5 km",
    rating: 4.8,
    reviewCount: 245,
    address: "123 Main Street, Downtown",
    isOpen: true,
    categories: ["General", "Prescription", "Wellness"],
  },
  {
    id: "2",
    name: "MediCare Plus",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format",
    distance: "1.2 km",
    rating: 4.6,
    reviewCount: 189,
    address: "456 Oak Avenue, Midtown",
    isOpen: true,
    categories: ["Prescription", "Vitamins", "Beauty"],
  },
  {
    id: "3",
    name: "QuickMeds Pharmacy",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format",
    distance: "1.8 km",
    rating: 4.5,
    reviewCount: 156,
    address: "789 Pine Road, Uptown",
    isOpen: false,
    categories: ["24/7", "Prescription", "First Aid"],
  },
  {
    id: "4",
    name: "Family Health Store",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format",
    distance: "2.3 km",
    rating: 4.9,
    reviewCount: 312,
    address: "321 Elm Street, Suburbs",
    isOpen: true,
    categories: ["Family", "Pediatric", "Organic"],
  },
  {
    id: "5",
    name: "Central Drugstore",
    image: "https://images.unsplash.com/photo-1576072446583-d06d6e0aca2e?w=500&auto=format",
    distance: "2.8 km",
    rating: 4.4,
    reviewCount: 98,
    address: "555 Center Blvd, Business District",
    isOpen: true,
    categories: ["General", "Supplements", "Diabetic Care"],
  },
  {
    id: "6",
    name: "Wellness Pharmacy",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format",
    distance: "3.1 km",
    rating: 4.7,
    reviewCount: 201,
    address: "888 Health Lane, Medical Center",
    isOpen: true,
    categories: ["Wellness", "Homeopathy", "Vitamins"],
  },
];

const Search = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

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
                  Find Pharmacies Near You
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Showing results for your current location
                </p>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search pharmacies..."
                    className="pl-10 bg-card border-border"
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
                    <span className="font-semibold text-foreground">{mockPharmacies.length}</span>{" "}
                    pharmacies found
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
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
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
                  Open Now
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
                {mockPharmacies.map((pharmacy) => (
                  <PharmacyCard key={pharmacy.id} {...pharmacy} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Pharmacies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
