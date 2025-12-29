import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const navLinks = [
    { href: "/search", label: "Find Medicines" },
    { href: "/pharmacies", label: "Pharmacies" },
    { href: "/sell", label: "Sell Medicine" },
    { href: "/prescription", label: "Upload Prescription" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              MediConnect
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          {!isLanding && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search medicines, pharmacies..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={location.pathname === link.href ? "bg-primary-light text-primary" : ""}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  3
                </span>
              </Button>
            </Link>
            
            <Link to="/profile" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>

            <Link to="/register" className="hidden sm:block">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            {/* Mobile Search */}
            {!isLanding && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search medicines, pharmacies..."
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      location.pathname === link.href ? "bg-primary-light text-primary" : ""
                    }`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
