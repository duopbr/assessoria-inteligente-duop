import { useEffect } from "react";
import { HeroOptimized } from "@/components/landing/hero-optimized";
import { VideoSection } from "@/components/landing/video-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { FeaturesBenefit } from "@/components/landing/features-benefit";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQCompact } from "@/components/landing/faq-compact";
import { HowToUseSection } from "@/components/landing/how-to-use-section";
import { CTAFinalUrgency } from "@/components/landing/cta-final-urgency";
import { Footer } from "@/components/landing/footer";
import { WhatsAppFloatButton } from "@/components/ui/whatsapp-float-button";
import { AccessibilityImprovements } from "@/components/ui/accessibility-improvements";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/utils/scroll";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.appear-animation');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
      <AccessibilityImprovements />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-duop-purple/10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
              alt="Duop Logo"
              className="h-8"
              loading="eager"
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
      </main>

      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
};

export default Index;
