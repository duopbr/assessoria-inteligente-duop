import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroSectionA } from "@/components/landing/hero-section-a";
import { HeroSectionB } from "@/components/landing/hero-section-b";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { HowItWorksA } from "@/components/landing/how-it-works-a";
import { HowItWorksB } from "@/components/landing/how-it-works-b";
import { MidCTASection } from "@/components/landing/mid-cta-section";
import { MidCTASectionB } from "@/components/landing/mid-cta-section-b";
import { FAQSectionA } from "@/components/landing/faq-section-a";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { AccessibilityImprovements } from "@/components/ui/accessibility-improvements";
import { WhatsAppFloatButton } from "@/components/ui/whatsapp-float-button";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.appear-animation');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = (
          rect.top <= (window.innerHeight * 0.85) && 
          rect.bottom >= 0
        );
        
        if (isInView) {
          el.classList.add('in-view');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    document.title = "Duop - Assessoria Inteligente via WhatsApp";
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabChange = (value: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track tab switch
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'tab_switch', {
        version: value
      });
    }
  };
  
  return (
    <>
      <AccessibilityImprovements />
      <div className="min-h-screen flex flex-col">
        <header className="py-6 px-4 sm:px-6 bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
                alt="Duop Logo"
                className="h-10 mr-2"
                loading="eager"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-duop-gray-dark hover:text-duop-purple transition-colors">Início</a></li>
                <li><a href="#contato" className="text-duop-gray-dark hover:text-duop-purple transition-colors">Contato</a></li>
              </ul>
            </nav>
            <a href="#contato" className="cta-button-secondary md:hidden">
              Testar agora
            </a>
          </div>
        </header>

        <Tabs defaultValue="version-a" onValueChange={handleTabChange} className="flex-grow">
          <div className="sticky top-[88px] z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <TabsList className="w-full justify-center bg-transparent h-14">
                <TabsTrigger 
                  value="version-a" 
                  className="flex-1 max-w-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-duop-purple data-[state=active]:to-duop-blue data-[state=active]:text-white text-duop-gray-dark font-semibold"
                >
                  <span className="hidden sm:inline">Versão A - Autoridade & Tecnologia</span>
                  <span className="sm:hidden">Versão A</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="version-b"
                  className="flex-1 max-w-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-duop-blue data-[state=active]:to-duop-purple data-[state=active]:text-white text-duop-gray-dark font-semibold"
                >
                  <span className="hidden sm:inline">Versão B - Resultado & Prova Social</span>
                  <span className="sm:hidden">Versão B</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <main id="main-content">
            <TabsContent value="version-a" className="mt-0">
              <HeroSectionA />
              
              <div className="appear-animation">
                <SocialProofSection />
              </div>
              
              <div className="appear-animation">
                <HowItWorksA />
              </div>
              
              <div className="appear-animation">
                <MidCTASection />
              </div>
              
              <div className="appear-animation">
                <FAQSectionA />
              </div>
              
              <div id="contato" className="appear-animation">
                <CTASection />
              </div>
            </TabsContent>

            <TabsContent value="version-b" className="mt-0">
              <HeroSectionB />
              
              <div className="appear-animation">
                <MetricsSection />
              </div>
              
              <div className="appear-animation">
                <BenefitsSection />
              </div>
              
              <div className="appear-animation">
                <HowItWorksB />
              </div>
              
              <div className="appear-animation">
                <MidCTASectionB />
              </div>
              
              <div className="appear-animation">
                <FAQSectionA />
              </div>
              
              <div id="contato" className="appear-animation">
                <CTASection />
              </div>
            </TabsContent>
          </main>
        </Tabs>
        
        <Footer />
        <WhatsAppFloatButton />
      </div>
    </>
  );
};

export default Index;
