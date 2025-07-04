
import { HeroSection } from "@/components/landing/hero-section";
import { StorySection } from "@/components/landing/story-section";
import { ProblemsSection } from "@/components/landing/problems-section";
import { SolutionSection } from "@/components/landing/solution-section";
import { ValidationSection } from "@/components/landing/validation-section";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { DiscountOffer } from "@/components/landing/discount-offer";
import { useEffect } from "react";

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
    handleScroll(); // Check on initial load
    
    document.title = "Duop - Assessoria Inteligente via WhatsApp";
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <DiscountOffer />
      
      <header className="py-6 px-4 sm:px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
              alt="Duop Logo"
              className="h-10 mr-2"
            />
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-duop-gray-dark hover:text-duop-purple transition-colors">Início</a></li>
              <li><a href="#contato" className="text-duop-gray-dark hover:text-duop-purple transition-colors">Contato</a></li>
            </ul>
          </nav>
          <a href="#contato" className="cta-button-secondary">
            Testar agora
          </a>
        </div>
      </header>
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="appear-animation">
          <StorySection />
        </div>
        
        <div className="appear-animation">
          <ProblemsSection />
        </div>
        
        <div className="appear-animation">
          <SolutionSection />
        </div>
        
        <div className="appear-animation">
          <ValidationSection />
        </div>
        
        <div className="appear-animation">
          <CTASection />
        </div>
        
        <div className="appear-animation">
          <FAQSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
