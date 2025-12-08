import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import ThankYouPurchase from "./pages/ThankYouPurchase";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PixPaymentPage from "./pages/PixPaymentPage";

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
            {/* Rotas PIX dinâmicas - mesmas URLs que antes */}
            <Route path="/pix-mensal" element={<PixPaymentPage />} />
            <Route path="/pix-trimestral" element={<PixPaymentPage />} />
            <Route path="/pix-semestral" element={<PixPaymentPage />} />
            <Route path="/pix-anual" element={<PixPaymentPage />} />
            <Route path="/teses-pix-mensal" element={<PixPaymentPage />} />
            <Route path="/teses-pix-trimestral" element={<PixPaymentPage />} />
            <Route path="/teses-pix-semestral" element={<PixPaymentPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
