import { useState } from "react";
import {
  User,
  Package,
  Pill,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Edit2,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const orders = [
  {
    id: "ORD-001",
    date: "Dec 28, 2024",
    status: "Delivered",
    total: 45.99,
    items: 3,
    pharmacy: "HealthFirst Pharmacy",
  },
  {
    id: "ORD-002",
    date: "Dec 25, 2024",
    status: "In Transit",
    total: 28.50,
    items: 2,
    pharmacy: "MediCare Plus",
  },
  {
    id: "ORD-003",
    date: "Dec 20, 2024",
    status: "Processing",
    total: 67.00,
    items: 5,
    pharmacy: "QuickMeds Pharmacy",
  },
];

const sellingItems = [
  {
    id: "1",
    name: "Vitamin D3 5000 IU",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&auto=format",
    price: 15.00,
    status: "Available",
    views: 45,
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil Capsules",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format",
    price: 22.00,
    status: "Pending",
    views: 12,
  },
  {
    id: "3",
    name: "Probiotic Complex",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&auto=format",
    price: 18.50,
    status: "Sold",
    views: 89,
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-success",
  "In Transit": "bg-primary",
  Processing: "bg-warning",
  Available: "bg-success",
  Pending: "bg-warning",
  Sold: "bg-muted text-muted-foreground",
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="h-24 w-24 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">JD</span>
                    </div>
                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-card">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {[
                    { icon: Package, label: "My Orders", value: "orders" },
                    { icon: Pill, label: "Selling", value: "selling" },
                    { icon: MapPin, label: "Addresses", value: "addresses" },
                    { icon: CreditCard, label: "Payment Methods", value: "payment" },
                    { icon: Bell, label: "Notifications", value: "notifications" },
                    { icon: Shield, label: "Privacy", value: "privacy" },
                    { icon: Settings, label: "Settings", value: "settings" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === item.value
                          ? "bg-primary-light text-primary"
                          : "hover:bg-muted text-foreground"
                      }`}
                      onClick={() => setActiveTab(item.value)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">My Orders</h2>
                    <Button variant="outline">View All</Button>
                  </div>

                  {/* Order Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Total Orders", value: "24" },
                      { label: "Delivered", value: "21" },
                      { label: "In Progress", value: "2" },
                      { label: "Cancelled", value: "1" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-card rounded-xl border border-border p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Orders List */}
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-foreground">{order.id}</h3>
                              <Badge className={statusColors[order.status]}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.pharmacy} • {order.items} items
                            </p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-xl font-bold text-foreground">
                              ${order.total.toFixed(2)}
                            </p>
                            <Button variant="outline" size="sm">
                              View Details
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Selling Tab */}
                <TabsContent value="selling" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">
                      Medicines I'm Selling
                    </h2>
                    <Button>
                      <Pill className="h-4 w-4 mr-2" />
                      Add Medicine
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Listed", value: "5" },
                      { label: "Pending", value: "2" },
                      { label: "Sold", value: "8" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-card rounded-xl border border-border p-4 text-center"
                      >
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {sellingItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-card rounded-2xl border border-border p-4 flex gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {item.name}
                              </h3>
                              <p className="text-lg font-bold text-primary mt-1">
                                ${item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.views} views
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={statusColors[item.status]}>
                                {item.status}
                              </Badge>
                              <Button variant="ghost" size="icon">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Other Tabs - Placeholder */}
                {["addresses", "payment", "notifications", "privacy", "settings"].map(
                  (tab) => (
                    <TabsContent key={tab} value={tab}>
                      <div className="bg-card rounded-2xl border border-border p-12 text-center">
                        <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                        </h3>
                        <p className="text-muted-foreground">
                          This section is coming soon.
                        </p>
                      </div>
                    </TabsContent>
                  )
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
