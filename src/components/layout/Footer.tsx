import { Link } from "react-router-dom";
import { Pill, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MediConnect</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted platform for buying and selling medicines. Connecting pharmacies and users for better healthcare access.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/search" className="hover:text-primary transition-colors">Find Medicines</Link></li>
              <li><Link to="/pharmacies" className="hover:text-primary transition-colors">Browse Pharmacies</Link></li>
              <li><Link to="/sell" className="hover:text-primary transition-colors">Sell Medicine</Link></li>
              <li><Link to="/prescription" className="hover:text-primary transition-colors">Upload Prescription</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* For Pharmacies */}
          <div>
            <h4 className="font-semibold mb-4">For Pharmacies</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/pharmacy/register" className="hover:text-primary transition-colors">Register Your Pharmacy</Link></li>
              <li><Link to="/pharmacy/dashboard" className="hover:text-primary transition-colors">Pharmacy Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Subscription Plans</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@mediconnect.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>123 Healthcare Avenue, Medical District, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© 2024 MediConnect. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
