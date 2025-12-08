import { useEffect, useRef, lazy, Suspense } from "react";
import { HeroOptimized } from "@/components/landing/hero-optimized";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/utils/scroll";

// Lazy load below-the-fold sections with simplified imports (using default exports)
const VideoSection = lazy(() => import("@/components/landing/video-section"));
const SolutionSection = lazy(() => import("@/components/landing/solution-section"));
const FeaturesBenefit = lazy(() => import("@/components/landing/features-benefit"));
const TestimonialsSection = lazy(() => import("@/components/landing/testimonials-section"));
const FAQCompact = lazy(() => import("@/components/landing/faq-compact"));
const HowToUseSection = lazy(() => import("@/components/landing/how-to-use-section"));
const CTAFinalUrgency = lazy(() => import("@/components/landing/cta-final-urgency"));
const Footer = lazy(() => import("@/components/landing/footer"));
const WhatsAppFloatButton = lazy(() => import("@/components/ui/whatsapp-float-button"));
const AccessibilityImprovements = lazy(() => import("@/components/ui/accessibility-improvements"));

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Use IntersectionObserver instead of scroll event for better performance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after animation triggers to save resources
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.appear-animation');
    elements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = "Duop - Ganhe 5 Dias por Mês com IA para Assessores";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Automatize relatórios, análises e atendimento. A Duop libera 5 dias de trabalho por mês para assessores de investimento focarem no que importa.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Suspense fallback={null}>
        <AccessibilityImprovements />
      </Suspense>
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-duop-purple/10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <img
              src="/logo.webp"
              alt="Duop Logo"
              className="h-8 w-auto"
              width="112"
              height="32"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <Button 
            onClick={scrollToForm}
            className="bg-duop-purple text-white hover:bg-duop-purple/90"
          >
            📱 Testar Agora
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="appear-animation">
          <HeroOptimized />
        </div>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <VideoSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <SolutionSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <FeaturesBenefit />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <TestimonialsSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <FAQCompact />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <HowToUseSection />
          </div>
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <div className="appear-animation">
            <CTAFinalUrgency />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppFloatButton />
      </Suspense>
    </div>
  );
};

export default Index;
