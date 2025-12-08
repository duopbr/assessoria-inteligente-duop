import { useEffect, useRef, lazy, Suspense } from "react";
import { HeroOptimized } from "@/components/landing/hero-optimized";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/utils/scroll";

// Lazy load below-the-fold sections
const VideoSection = lazy(() => import("@/components/landing/video-section").then(m => ({ default: m.VideoSection })));
const SolutionSection = lazy(() => import("@/components/landing/solution-section").then(m => ({ default: m.SolutionSection })));
const FeaturesBenefit = lazy(() => import("@/components/landing/features-benefit").then(m => ({ default: m.FeaturesBenefit })));
const TestimonialsSection = lazy(() => import("@/components/landing/testimonials-section").then(m => ({ default: m.TestimonialsSection })));
const FAQCompact = lazy(() => import("@/components/landing/faq-compact").then(m => ({ default: m.FAQCompact })));
const HowToUseSection = lazy(() => import("@/components/landing/how-to-use-section").then(m => ({ default: m.HowToUseSection })));
const CTAFinalUrgency = lazy(() => import("@/components/landing/cta-final-urgency").then(m => ({ default: m.CTAFinalUrgency })));
const Footer = lazy(() => import("@/components/landing/footer").then(m => ({ default: m.Footer })));
const WhatsAppFloatButton = lazy(() => import("@/components/ui/whatsapp-float-button").then(m => ({ default: m.WhatsAppFloatButton })));
const AccessibilityImprovements = lazy(() => import("@/components/ui/accessibility-improvements").then(m => ({ default: m.AccessibilityImprovements })));

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
              src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
              alt="Duop Logo"
              className="h-8"
              width="170"
              height="56"
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
