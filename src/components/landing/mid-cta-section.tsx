import { LeadForm } from "./lead-form";

export function MidCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-duop-purple to-duop-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
          Pronto para ter 5 horas extras por semana?
        </h2>
        
        <p className="text-xl text-white/90 mb-12">
          Agende uma demo personalizada e veja a Duop em ação no seu WhatsApp
        </p>

        <div className="max-w-md mx-auto">
          <LeadForm 
            formId="mid-cta-a"
            ctaText="Quero ganhar 5 horas por semana"
            variant="default"
          />
        </div>
      </div>
    </section>
  );
}
