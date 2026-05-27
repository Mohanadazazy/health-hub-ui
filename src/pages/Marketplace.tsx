import { useMemo, useState } from "react";
import { Search, MapPin, Phone, Calendar, Filter, X, Clock, Package, Plus, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Listing {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  condition: "Sealed" | "Opened" | "New";
  location: string;
  expirationDate: string;
  phone: string;
  description: string;
  postedAt: string;
  sellerName: string;
  verified?: boolean;
}

const CATEGORIES = [
  "All",
  "Pain Relief",
  "Vitamins & Supplements",
  "Cold & Flu",
  "Skin Care",
  "Baby Care",
  "First Aid",
  "Medical Equipment",
  "Diabetes Care",
];

const LOCATIONS = [
  "All Locations",
  "Cairo",
  "Alexandria",
  "Giza",
  "Mansoura",
  "Tanta",
  "Aswan",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    name: "Panadol Extra 500mg - 24 Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    price: 45,
    category: "Pain Relief",
    condition: "Sealed",
    location: "Cairo",
    expirationDate: "2026-08-15",
    phone: "+20 100 123 4567",
    description: "Brand new sealed box, bought from El Ezaby pharmacy. No longer needed.",
    postedAt: "2h ago",
    sellerName: "Ahmed M.",
    verified: true,
  },
  {
    id: "2",
    name: "Centrum Multivitamin - 100 Tablets",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=600&q=80",
    price: 320,
    category: "Vitamins & Supplements",
    condition: "Sealed",
    location: "Alexandria",
    expirationDate: "2027-03-20",
    phone: "+20 101 555 8899",
    description: "Bought from abroad, original sealed bottle. Perfect for daily intake.",
    postedAt: "5h ago",
    sellerName: "Mona K.",
    verified: true,
  },
  {
    id: "3",
    name: "Omron Blood Pressure Monitor",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80",
    price: 850,
    category: "Medical Equipment",
    condition: "Opened",
    location: "Giza",
    expirationDate: "2030-01-01",
    phone: "+20 102 777 1234",
    description: "Used twice only, like new. All accessories and original box included.",
    postedAt: "1d ago",
    sellerName: "Khaled S.",
  },
  {
    id: "4",
    name: "Vitamin D3 5000 IU - 120 Softgels",
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=600&q=80",
    price: 180,
    category: "Vitamins & Supplements",
    condition: "Sealed",
    location: "Cairo",
    expirationDate: "2026-12-10",
    phone: "+20 109 333 2211",
    description: "Original Now Foods brand. Sealed and authentic.",
    postedAt: "1d ago",
    sellerName: "Sara A.",
    verified: true,
  },
  {
    id: "5",
    name: "Cetaphil Gentle Cleanser 500ml",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    price: 220,
    category: "Skin Care",
    condition: "New",
    location: "Mansoura",
    expirationDate: "2027-06-30",
    phone: "+20 106 888 4455",
    description: "Bought by mistake, never opened. Selling at a discount.",
    postedAt: "2d ago",
    sellerName: "Nour H.",
  },
  {
    id: "6",
    name: "Pampers Baby Diapers Size 4 - 80pcs",
    image: "https://images.unsplash.com/photo-1581985673473-0784a7a44e39?w=600&q=80",
    price: 280,
    category: "Baby Care",
    condition: "Sealed",
    location: "Tanta",
    expirationDate: "2028-01-01",
    phone: "+20 100 222 7788",
    description: "Baby grew out of this size. Brand new mega pack.",
    postedAt: "3d ago",
    sellerName: "Heba R.",
  },
  {
    id: "7",
    name: "Accu-Chek Glucose Test Strips - 50ct",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    price: 350,
    category: "Diabetes Care",
    condition: "Sealed",
    location: "Cairo",
    expirationDate: "2026-05-20",
    phone: "+20 122 999 1010",
    description: "Original strips, sealed box. Switched to a different brand.",
    postedAt: "4d ago",
    sellerName: "Tarek M.",
    verified: true,
  },
  {
    id: "8",
    name: "First Aid Kit - 120 pieces",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80",
    price: 195,
    category: "First Aid",
    condition: "New",
    location: "Aswan",
    expirationDate: "2029-10-15",
    phone: "+20 111 444 6677",
    description: "Complete kit for home or travel. Never used.",
    postedAt: "5d ago",
    sellerName: "Omar Y.",
  },
];

const conditionStyles: Record<Listing["condition"], string> = {
  Sealed: "bg-success/15 text-success border-success/30",
  New: "bg-primary/15 text-primary border-primary/30",
  Opened: "bg-accent/15 text-accent border-accent/30",
};

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [contactOpen, setContactOpen] = useState<Listing | null>(null);

  const filtered = useMemo(() => {
    let items = MOCK_LISTINGS.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || l.category === category;
      const matchesLoc = location === "All Locations" || l.location === location;
      const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
      return matchesSearch && matchesCat && matchesLoc && matchesPrice;
    });

    const sorters: Record<string, (a: Listing, b: Listing) => number> = {
      newest: (a, b) => Number(a.id) - Number(b.id),
      oldest: (a, b) => Number(b.id) - Number(a.id),
      price_asc: (a, b) => a.price - b.price,
      price_desc: (a, b) => b.price - a.price,
    };
    return [...items].sort(sorters[sortBy]);
  }, [search, category, location, priceRange, sortBy]);

  const activeFilters =
    (category !== "All" ? 1 : 0) +
    (location !== "All Locations" ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

  const clearFilters = () => {
    setCategory("All");
    setLocation("All Locations");
    setPriceRange([0, 1000]);
  };

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-3 block">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-muted border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block">Location</label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-semibold mb-3 block">
          Price Range: <span className="text-primary">EGP {priceRange[0]} – {priceRange[1]}</span>
        </label>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          min={0}
          max={1000}
          step={10}
        />
      </div>

      {activeFilters > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" /> Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge className="bg-card/20 text-primary-foreground border-0 mb-3">
                Community Marketplace
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Buy & Sell Medicines Locally
              </h1>
              <p className="text-primary-foreground/80 max-w-xl">
                A trusted community space to find unused medicines, equipment, and pharmacy products from neighbors near you.
              </p>
            </div>
            <Button size="lg" variant="accent" className="self-start md:self-auto">
              <Plus className="h-4 w-4 mr-1" /> Post a Listing
            </Button>
          </div>

          {/* Search */}
          <div className="mt-6 bg-card rounded-2xl p-2 shadow-elevated flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines, equipment, brands..."
              className="border-0 focus-visible:ring-0 text-foreground"
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden shrink-0">
                  <Filter className="h-4 w-4 mr-1" /> Filters
                  {activeFilters > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                {FilterPanel}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="font-bold">Filters</h2>
                {activeFilters > 0 && (
                  <Badge className="ml-auto">{activeFilters}</Badge>
                )}
              </div>
              {FilterPanel}
            </div>
          </aside>

          {/* Listings */}
          <section>
            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> listings found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-1">No listings match your search</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((l) => (
                  <article
                    key={l.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={l.image}
                        alt={l.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className={`absolute top-3 left-3 border ${conditionStyles[l.condition]}`}>
                        {l.condition}
                      </Badge>
                      <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-soft">
                        <span className="text-lg font-bold text-primary">EGP {l.price}</span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-card-foreground line-clamp-2 mb-2 min-h-[3rem]">
                        {l.name}
                      </h3>

                      <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{l.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span>Exp: {new Date(l.expirationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>{l.postedAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-1.5 text-xs">
                          <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary">
                            {l.sellerName.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground truncate">{l.sellerName}</span>
                          {l.verified && <ShieldCheck className="h-3.5 w-3.5 text-success" />}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Button variant="outline" size="sm" onClick={() => setSelected(l)}>
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => setContactOpen(l)}>
                          <MessageCircle className="h-3.5 w-3.5 mr-1" /> Contact
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Details Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <div className="aspect-video rounded-xl overflow-hidden bg-muted -mt-2">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              </div>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <DialogTitle className="text-xl">{selected.name}</DialogTitle>
                  <Badge className={`border ${conditionStyles[selected.condition]}`}>
                    {selected.condition}
                  </Badge>
                </div>
                <DialogDescription className="text-2xl font-bold text-primary">
                  EGP {selected.price}
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm text-muted-foreground">{selected.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Category</div>
                  <div className="font-medium">{selected.category}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Location</div>
                  <div className="font-medium flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {selected.location}
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Expiration</div>
                  <div className="font-medium">{new Date(selected.expirationDate).toLocaleDateString()}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Posted</div>
                  <div className="font-medium">{selected.postedAt}</div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-primary/5 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {selected.sellerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-1">
                      {selected.sellerName}
                      {selected.verified && <ShieldCheck className="h-4 w-4 text-success" />}
                    </div>
                    <div className="text-xs text-muted-foreground">Seller</div>
                  </div>
                </div>
                <Button onClick={() => { setContactOpen(selected); setSelected(null); }}>
                  <MessageCircle className="h-4 w-4 mr-1" /> Contact Seller
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={!!contactOpen} onOpenChange={(o) => !o && setContactOpen(null)}>
        <DialogContent className="max-w-md">
          {contactOpen && (
            <>
              <DialogHeader>
                <DialogTitle>Contact {contactOpen.sellerName}</DialogTitle>
                <DialogDescription>
                  Reach out directly to ask questions or arrange a meetup.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <a
                  href={`tel:${contactOpen.phone}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Call</div>
                    <div className="font-semibold">{contactOpen.phone}</div>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${contactOpen.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-success hover:bg-success/5 transition-all"
                >
                  <div className="h-10 w-10 rounded-full bg-success/15 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">WhatsApp</div>
                    <div className="font-semibold">Chat on WhatsApp</div>
                  </div>
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
