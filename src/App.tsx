
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import ThankYouPurchase from "./pages/ThankYouPurchase";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PixMensal from "./pages/PixMensal";
import PixTrimestral from "./pages/PixTrimestral";
import PixSemestral from "./pages/PixSemestral";
import PixAnual from "./pages/PixAnual";
import PixTesesMensal from "./pages/PixTesesMensal";
import PixTesesTrimestral from "./pages/PixTesesTrimestral";
import PixTesesSemestral from "./pages/PixTesesSemestral";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/obrigado" element={<ThankYou />} />
            <Route path="/obrigado-compra" element={<ThankYouPurchase />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pix-mensal" element={<PixMensal />} />
            <Route path="/pix-trimestral" element={<PixTrimestral />} />
            <Route path="/pix-semestral" element={<PixSemestral />} />
            <Route path="/pix-anual" element={<PixAnual />} />
            <Route path="/teses-pix-mensal" element={<PixTesesMensal />} />
            <Route path="/teses-pix-trimestral" element={<PixTesesTrimestral />} />
            <Route path="/teses-pix-semestral" element={<PixTesesSemestral />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
