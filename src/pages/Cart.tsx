import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { saveOrder } from "@/pages/Orders";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  pharmacy: string;
  inStock: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Paracetamol 500mg Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format",
    price: 8.99,
    originalPrice: 12.99,
    quantity: 2,
    pharmacy: "HealthFirst Pharmacy",
    inStock: true,
  },
  {
    id: "2",
    name: "Vitamin D3 5000 IU Capsules",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&auto=format",
    price: 15.49,
    quantity: 1,
    pharmacy: "MediCare Plus",
    inStock: true,
  },
  {
    id: "3",
    name: "Omega-3 Fish Oil 1000mg",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format",
    price: 22.00,
    originalPrice: 28.00,
    quantity: 1,
    pharmacy: "HealthFirst Pharmacy",
    inStock: true,
  },
  {
    id: "4",
    name: "Multivitamin Complex Daily",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&auto=format",
    price: 18.99,
    quantity: 3,
    pharmacy: "QuickMeds Pharmacy",
    inStock: true,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCodes, setPromoCodes] = useState<Record<string, string>>({});
  const [promoApplied, setPromoApplied] = useState<Record<string, boolean>>({});
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const pharmacies = Array.from(new Set(cartItems.map((item) => item.pharmacy)));

  // Auto-select first pharmacy if none selected
  if (pharmacies.length > 0 && (!selectedPharmacy || !pharmacies.includes(selectedPharmacy))) {
    // use setTimeout to avoid setState during render
    setTimeout(() => setSelectedPharmacy(pharmacies[0]), 0);
  }

  const getPharmacyTotals = (pharmacy: string) => {
    const items = cartItems.filter((i) => i.pharmacy === pharmacy);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const savings = items.reduce(
      (sum, item) =>
        sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
      0
    );
    const deliveryFee = subtotal > 50 ? 0 : 4.99;
    const applied = promoApplied[pharmacy];
    const promoDiscount = applied ? subtotal * 0.1 : 0;
    const total = subtotal + deliveryFee - promoDiscount;
    return { items, subtotal, savings, deliveryFee, promoDiscount, total, applied };
  };

  const applyPromoCode = (pharmacy: string) => {
    const code = promoCodes[pharmacy] || "";
    if (code.toLowerCase() === "save10") {
      setPromoApplied((prev) => ({ ...prev, [pharmacy]: true }));
    }
  };

  const handleCheckout = (pharmacy: string) => {
    const { total } = getPharmacyTotals(pharmacy);
    alert(`Checking out from ${pharmacy} - Total: $${total.toFixed(2)}`);
  };

  const activePharmacy = selectedPharmacy && pharmacies.includes(selectedPharmacy)
    ? selectedPharmacy
    : pharmacies[0];
  const summaryData = activePharmacy ? getPharmacyTotals(activePharmacy) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Looks like you haven't added any medicines yet. Start exploring to find what you need.
              </p>
              <Link to="/search">
                <Button size="lg">
                  Browse Medicines
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Group by pharmacy */}
                {pharmacies.map(
                  (pharmacy) => (
                    <div
                      key={pharmacy}
                      onClick={() => setSelectedPharmacy(pharmacy)}
                      className={`bg-card rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${
                        activePharmacy === pharmacy
                          ? "border-primary shadow-card"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {/* Pharmacy Header */}
                      <div className={`px-6 py-3 border-b border-border transition-colors ${
                        activePharmacy === pharmacy ? "bg-primary/10" : "bg-muted/50"
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {pharmacy}
                            </span>
                            {activePharmacy === pharmacy && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                Selected
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {cartItems.filter((i) => i.pharmacy === pharmacy).length} items
                          </Badge>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-border">
                        {cartItems
                          .filter((item) => item.pharmacy === pharmacy)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="p-4 md:p-6 flex gap-4 hover:bg-muted/30 transition-colors"
                            >
                              {/* Image */}
                              <Link to={`/product/${item.id}`} className="shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                                />
                              </Link>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                  <div>
                                    <Link
                                      to={`/product/${item.id}`}
                                      className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                                    >
                                      {item.name}
                                    </Link>
                                    {item.originalPrice && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-muted-foreground line-through">
                                          ${item.originalPrice.toFixed(2)}
                                        </span>
                                        <Badge className="bg-accent text-accent-foreground text-xs">
                                          Save ${(item.originalPrice - item.price).toFixed(2)}
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-lg font-bold text-primary whitespace-nowrap">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-lg"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-10 text-center font-semibold text-foreground">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-lg"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                    {activePharmacy && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Checking out from <span className="font-semibold text-primary">{activePharmacy}</span>
                      </p>
                    )}
                  </div>

                  {summaryData && activePharmacy && (
                    <>
                      {/* Promo Code */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Promo Code
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter code"
                              value={promoCodes[activePharmacy] || ""}
                              onChange={(e) =>
                                setPromoCodes((prev) => ({ ...prev, [activePharmacy]: e.target.value }))
                              }
                              className="pl-10"
                              disabled={summaryData.applied}
                            />
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => applyPromoCode(activePharmacy)}
                            disabled={summaryData.applied || !promoCodes[activePharmacy]}
                          >
                            {summaryData.applied ? "Applied!" : "Apply"}
                          </Button>
                        </div>
                        {summaryData.applied && (
                          <p className="text-sm text-success flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            10% discount applied!
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Try "SAVE10" for 10% off
                        </p>
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-foreground">
                          <span>Subtotal</span>
                          <span>${summaryData.subtotal.toFixed(2)}</span>
                        </div>
                        {summaryData.savings > 0 && (
                          <div className="flex justify-between text-success">
                            <span>You Save</span>
                            <span>-${summaryData.savings.toFixed(2)}</span>
                          </div>
                        )}
                        {summaryData.applied && (
                          <div className="flex justify-between text-success">
                            <span>Promo Discount</span>
                            <span>-${summaryData.promoDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-foreground">
                          <span className="flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            Delivery
                          </span>
                          <span>
                            {summaryData.deliveryFee === 0 ? (
                              <span className="text-success">FREE</span>
                            ) : (
                              `$${summaryData.deliveryFee.toFixed(2)}`
                            )}
                          </span>
                        </div>
                        {summaryData.deliveryFee > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Add ${(50 - summaryData.subtotal).toFixed(2)} more for free delivery
                          </p>
                        )}
                      </div>

                      <Separator />

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${summaryData.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Checkout Button */}
                      <Button className="w-full" size="lg" onClick={() => handleCheckout(activePharmacy)}>
                        Checkout from {activePharmacy}
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </Button>

                      {pharmacies.length > 1 && (
                        <p className="text-xs text-center text-muted-foreground">
                          Select another pharmacy on the left to checkout its cart separately
                        </p>
                      )}
                    </>
                  )}
                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Fast delivery</span>
                    </div>
                  </div>

                  {/* Continue Shopping */}
                  <Link to="/search" className="block">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
