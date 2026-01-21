import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Navigation,
  Search,
  Filter,
  Star,
  Clock,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Pharmacy {
  id: string;
  name: string;
  image: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  openUntil: string;
  categories: number;
  deliveryTime: string;
  isFeatured?: boolean;
}

const pharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "HealthFirst Pharmacy",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&auto=format",
    address: "123 Medical Center Drive, Downtown",
    distance: "0.3 km",
    rating: 4.8,
    reviews: 342,
    isOpen: true,
    openUntil: "10:00 PM",
    categories: 12,
    deliveryTime: "15-20 min",
    isFeatured: true,
  },
  {
    id: "2",
    name: "MediCare Plus",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format",
    address: "456 Health Boulevard, Midtown",
    distance: "0.8 km",
    rating: 4.6,
    reviews: 218,
    isOpen: true,
    openUntil: "9:00 PM",
    categories: 10,
    deliveryTime: "20-30 min",
  },
  {
    id: "3",
    name: "QuickMeds Pharmacy",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&auto=format",
    address: "789 Wellness Street, Uptown",
    distance: "1.2 km",
    rating: 4.5,
    reviews: 156,
    isOpen: true,
    openUntil: "8:00 PM",
    categories: 8,
    deliveryTime: "25-35 min",
  },
  {
    id: "4",
    name: "City Health Drugstore",
    image: "https://images.unsplash.com/photo-1586015555751-63c29b8cd794?w=400&auto=format",
    address: "321 Care Avenue, East Side",
    distance: "1.5 km",
    rating: 4.7,
    reviews: 289,
    isOpen: false,
    openUntil: "Opens 8:00 AM",
    categories: 15,
    deliveryTime: "30-40 min",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Wellness Pharmacy",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&auto=format",
    address: "654 Healthy Lane, West End",
    distance: "2.0 km",
    rating: 4.4,
    reviews: 124,
    isOpen: true,
    openUntil: "11:00 PM",
    categories: 9,
    deliveryTime: "35-45 min",
  },
  {
    id: "6",
    name: "PharmaCare Express",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&auto=format",
    address: "987 Medicine Road, Suburbs",
    distance: "2.5 km",
    rating: 4.3,
    reviews: 98,
    isOpen: true,
    openUntil: "7:00 PM",
    categories: 7,
    deliveryTime: "40-50 min",
  },
];

const Pharmacies = () => {
  const [showLocationDialog, setShowLocationDialog] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [filterOpen, setFilterOpen] = useState<"all" | "open" | "closed">("all");

  const handleGetLocation = () => {
    setLocationLoading(true);
    // Simulate geolocation
    setTimeout(() => {
      setUserLocation("Downtown, City Center");
      setLocationLoading(false);
      setShowLocationDialog(false);
    }, 1500);
  };

  const handleSkipLocation = () => {
    setUserLocation("All Areas");
    setShowLocationDialog(false);
  };

  const handleManualLocation = () => {
    setUserLocation("Manual Location");
    setShowLocationDialog(false);
  };

  const filteredPharmacies = pharmacies
    .filter((pharmacy) => {
      const matchesSearch =
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterOpen === "all" ||
        (filterOpen === "open" && pharmacy.isOpen) ||
        (filterOpen === "closed" && !pharmacy.isOpen);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Location Permission Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Enable Location Services
            </DialogTitle>
            <DialogDescription className="text-center">
              Allow us to find pharmacies near you for faster delivery and pickup options.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleGetLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="h-5 w-5 mr-2" />
                  Use My Current Location
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={handleManualLocation}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Enter Location Manually
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleSkipLocation}
            >
              Skip for now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nearby Pharmacies
            </h1>
            {userLocation && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{userLocation}</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary p-0 h-auto"
                  onClick={() => setShowLocationDialog(true)}
                >
                  Change
                </Button>
              </div>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search pharmacies by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterOpen} onValueChange={(v) => setFilterOpen(v as any)}>
                <SelectTrigger className="w-[140px] h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open Now</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredPharmacies.length}</span> pharmacies
          </p>

          {/* Pharmacy Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy) => (
              <Link
                key={pharmacy.id}
                to={`/pharmacy/${pharmacy.id}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {pharmacy.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium">{pharmacy.distance}</span>
                  </div>
                  {!pharmacy.isOpen && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm">
                        Currently Closed
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {pharmacy.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold text-foreground">{pharmacy.rating}</span>
                      <span className="text-muted-foreground text-sm">({pharmacy.reviews})</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                    {pharmacy.address}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${pharmacy.isOpen ? "text-success" : "text-muted-foreground"}`}>
                        <Clock className="h-4 w-4" />
                        {pharmacy.isOpen ? `Until ${pharmacy.openUntil}` : pharmacy.openUntil}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {pharmacy.categories} categories
                    </Badge>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Delivery: <span className="text-foreground font-medium">{pharmacy.deliveryTime}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPharmacies.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No pharmacies found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterOpen("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pharmacies;
