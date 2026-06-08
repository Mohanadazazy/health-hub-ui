import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, ShoppingBag, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  pharmacy: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  promoDiscount: number;
  total: number;
  status: "Processing" | "In Transit" | "Delivered";
  createdAt: string;
}

const STORAGE_KEY = "mediconnect_orders";

export const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const statusColors: Record<Order["status"], string> = {
  Delivered: "bg-success text-success-foreground",
  "In Transit": "bg-primary text-primary-foreground",
  Processing: "bg-warning text-warning-foreground",
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Orders</h1>
              <p className="text-muted-foreground">
                {orders.length} {orders.length === 1 ? "order" : "orders"} placed
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your placed orders will appear here.
              </p>
              <Link to="/search">
                <Button size="lg">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card transition-shadow"
                >
                  <div className="px-6 py-4 bg-muted/40 border-b border-border flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                      <Badge variant="secondary">{order.pharmacy}</Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="divide-y divide-border">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-3 flex gap-4 items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-foreground whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
                        <p>
                          Delivery:{" "}
                          {order.deliveryFee === 0 ? "FREE" : `$${order.deliveryFee.toFixed(2)}`}
                        </p>
                        {order.promoDiscount > 0 && (
                          <p className="text-success">
                            Promo: -${order.promoDiscount.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link to="/search">
                  <Button variant="outline">
                    Continue Shopping
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
