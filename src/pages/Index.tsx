import { HeroConversion } from "@/components/landing/hero-conversion";
import { SocialProofCompact } from "@/components/landing/social-proof-compact";
import { BenefitsFocused } from "@/components/landing/benefits-focused";
import { LeadFormSimple } from "@/components/landing/lead-form-simple";
import { FAQCompact } from "@/components/landing/faq-compact";
import { Footer } from "@/components/landing/footer";
import { AccessibilityImprovements } from "@/components/ui/accessibility-improvements";
import { WhatsAppFloatButton } from "@/components/ui/whatsapp-float-button";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Duop - IA que economiza 5h por semana no atendimento";
    
    // Meta description otimizada para conversão
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Economize 5 horas por semana com IA no WhatsApp. Gere resumos de carteira, responda clientes instantaneamente e receba alertas inteligentes. +3.000 assessores já conhecem.'
      );
    }
  }, []);
  
  return (
    <>
      <AccessibilityImprovements />
      <div className="min-h-screen flex flex-col">
        {/* Header simplificado */}
        <header className="py-4 px-4 sm:px-6 bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
                alt="Duop - IA para Assessores"
                className="h-10"
                loading="eager"
              />
            </div>
            <button 
              onClick={() => document.getElementById('form-contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-duop-blue hover:bg-duop-blue/90 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Testar agora
            </button>
          </div>
        </header>
      
        <main id="main-content" className="flex-grow">
          {/* Hero - Primeira dobra otimizada */}
          <HeroConversion />
          
          {/* Prova social logo cedo */}
          <SocialProofCompact />
          
          {/* 3 Benefícios principais */}
          <BenefitsFocused />
          
          {/* Formulário repetido - CTA forte */}
          <LeadFormSimple />
          
          {/* FAQ curto */}
          <FAQCompact />
        </main>
      
        <Footer />
        <WhatsAppFloatButton />
      </div>
    </>
  );
};

export default Index;
