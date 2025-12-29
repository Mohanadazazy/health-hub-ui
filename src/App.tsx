import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import PharmacyDetails from "./pages/PharmacyDetails";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SellMedicine from "./pages/SellMedicine";
import Prescription from "./pages/Prescription";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth pages without navbar/footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
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
          <Route path="/pharmacy/:id" element={<PharmacyDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sell" element={<SellMedicine />} />
          <Route path="/prescription" element={<Prescription />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
