import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Search from "./pages/Search";
import Pharmacies from "./pages/Pharmacies";
import PharmacyDetails from "./pages/PharmacyDetails";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SellMedicine from "./pages/SellMedicine";
import Prescription from "./pages/Prescription";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import TopLoadingBar from "./components/common/TopLoadingBar";
import RouteLoader from "./components/common/RouteLoader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TopLoadingBar />
          <RouteLoader />
          <Routes>
            {/* Auth pages without navbar/footer */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Landing page with its own layout */}
            <Route path="/" element={
              <>
                <Navbar />
                <Landing />
                <Footer />
              </>
            } />
            
            {/* Other pages */}
            <Route path="/search" element={<Search />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<SellMedicine />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
