import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Shield,
  Truck,
  Clock,
  ArrowRight,
  Upload,
  Pill,
  Store,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: MapPin,
    title: "Nearby Pharmacies",
    description: "Find pharmacies closest to you with real-time distance ordering",
  },
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "All pharmacies are verified and licensed for your safety",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your medicines delivered quickly to your doorstep",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Browse and order medicines anytime, anywhere",
  },
];

const stats = [
  { value: "500+", label: "Pharmacies" },
  { value: "50K+", label: "Products" },
  { value: "100K+", label: "Happy Users" },
  { value: "4.8", label: "App Rating", icon: Star },
];

const categories = [
  { name: "Pain Relief", count: 1240 },
  { name: "Vitamins", count: 890 },
  { name: "Cold & Flu", count: 650 },
  { name: "Skin Care", count: 1100 },
  { name: "First Aid", count: 430 },
  { name: "Digestive", count: 320 },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-primary-light text-primary border-0 px-4 py-1.5 text-sm">
              Trusted by 100,000+ users
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Trusted{" "}
              <span className="text-primary">Medicine</span>{" "}
              Marketplace
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with nearby pharmacies, buy medicines at the best prices, or sell your unused medicines safely.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative bg-card rounded-2xl shadow-elevated p-2 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search medicines, pharmacies..."
                    className="pl-12 h-12 border-0 bg-muted/50 rounded-xl text-base"
                  />
                </div>
                <div className="relative flex-1 sm:max-w-[180px]">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    className="pl-12 h-12 border-0 bg-muted/50 rounded-xl text-base"
                  />
                </div>
                <Link to="/search">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto h-12 px-8">
                    Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link to="/prescription">
                <Button variant="outline" className="rounded-full">
                  <Upload className="h-4 w-4" />
                  Upload Prescription
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="rounded-full">
                  <Pill className="h-4 w-4" />
                  Sell Medicine
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-primary-foreground">
                    {stat.value}
                  </span>
                  {stat.icon && <Star className="h-6 w-6 text-warning fill-warning" />}
                </div>
                <p className="text-primary-foreground/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make healthcare accessible by connecting you with trusted pharmacies and ensuring safe, fast delivery of medicines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border group"
              >
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Browse Categories
              </h2>
              <p className="text-muted-foreground">
                Find medicines by category for quick access
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline">
                View All Categories
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?category=${category.name}`}
                className="bg-card rounded-xl p-4 text-center shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary group"
              >
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.count} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Search,
                title: "Search",
                description: "Find the medicine you need or browse nearby pharmacies",
              },
              {
                step: "02",
                icon: Store,
                title: "Compare",
                description: "Compare prices and availability across multiple pharmacies",
              },
              {
                step: "03",
                icon: Truck,
                title: "Order",
                description: "Place your order and get it delivered to your doorstep",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="inline-flex flex-col items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary-light flex items-center justify-center mb-4">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for Pharmacies */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-primary-foreground max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Are You a Pharmacy Owner?
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Join our platform and reach thousands of customers looking for medicines. Increase your sales and grow your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/pharmacy/register">
                <Button variant="secondary" size="xl" className="bg-card text-foreground hover:bg-card/90">
                  <Users className="h-5 w-5" />
                  Join as Pharmacy
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl shadow-elevated border border-border p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Create an account today and start accessing affordable medicines from trusted pharmacies near you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="xl">
                  Browse Medicines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
