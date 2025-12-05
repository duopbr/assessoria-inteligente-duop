import { Suspense, lazy, useEffect } from "react";
import { HeroOptimized } from "@/components/landing/hero-optimized";
import { Footer } from "@/components/landing/footer";
import { WhatsAppFloatButton } from "@/components/ui/whatsapp-float-button";
import { AccessibilityImprovements } from "@/components/ui/accessibility-improvements";
import { Button } from "@/components/ui/button";

// Code splitting - seções abaixo da dobra carregam sob demanda
const VideoSection = lazy(() => import("@/components/landing/video-section").then(m => ({ default: m.VideoSection })));
const SolutionSection = lazy(() => import("@/components/landing/solution-section").then(m => ({ default: m.SolutionSection })));
const FeaturesBenefit = lazy(() => import("@/components/landing/features-benefit").then(m => ({ default: m.FeaturesBenefit })));
const TestimonialsSection = lazy(() => import("@/components/landing/testimonials-section").then(m => ({ default: m.TestimonialsSection })));
const FAQCompact = lazy(() => import("@/components/landing/faq-compact").then(m => ({ default: m.FAQCompact })));
const HowToUseSection = lazy(() => import("@/components/landing/how-to-use-section").then(m => ({ default: m.HowToUseSection })));
const CTAFinalUrgency = lazy(() => import("@/components/landing/cta-final-urgency").then(m => ({ default: m.CTAFinalUrgency })));

const Index = () => {
  // IntersectionObserver para animações - sem reflow forçado
  useEffect(() => {
    const elements = document.querySelectorAll(".appear-animation");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = "Duop - Ganhe 5 Dias por Mês com IA para Assessores";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Automatize relatórios, análises e atendimento. A Duop libera 5 dias de trabalho por mês para assessores de investimento focarem no que importa.');
    }
  }, []);

  const scrollToForm = () => {
    const form = document.querySelector('form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AccessibilityImprovements />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-duop-purple/10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <picture>
              {/* Mobile + navegadores modernos → WebP */}
              <source
                srcSet="/images/logo.webp"
                type="image/webp"
                media="(max-width: 768px)"
              />
              {/* Fallback (desktop / browsers sem WebP) → PNG */}
              <img
                src="/images/logo.png"
                alt="Duop Logo"
                width={170}
                height={56}
                className="h-8 w-auto"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
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

        <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
          <div className="appear-animation">
            <VideoSection />
          </div>

          <div className="appear-animation">
            <SolutionSection />
          </div>

          <div className="appear-animation">
            <FeaturesBenefit />
          </div>

          <div className="appear-animation">
            <TestimonialsSection />
          </div>

          <div className="appear-animation">
            <FAQCompact />
          </div>

          <div className="appear-animation">
            <HowToUseSection />
          </div>

          <div className="appear-animation">
            <CTAFinalUrgency />
          </div>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
};

export default Index;
