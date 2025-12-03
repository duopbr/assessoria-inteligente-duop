
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Eager load Index (main landing page)
import Index from "./pages/Index";

// Lazy load all other routes
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const ThankYouPurchase = lazy(() => import("./pages/ThankYouPurchase"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const PixMensal = lazy(() => import("./pages/PixMensal"));
const PixTrimestral = lazy(() => import("./pages/PixTrimestral"));
const PixSemestral = lazy(() => import("./pages/PixSemestral"));
const PixAnual = lazy(() => import("./pages/PixAnual"));
const PixTesesMensal = lazy(() => import("./pages/PixTesesMensal"));
const PixTesesTrimestral = lazy(() => import("./pages/PixTesesTrimestral"));
const PixTesesSemestral = lazy(() => import("./pages/PixTesesSemestral"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-pulse text-duop-purple font-semibold">Carregando...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
