import { LeadForm } from "./lead-form";

export function CTASection() {

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-duop-purple to-duop-blue text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Veja a Duop em ação. Agende sua demo agora.
        </h2>
        
        <p className="text-xl text-white/90 mb-10">
          ✅ Demo ao vivo • 📱 15 minutos • 🎁 100% gratuita
        </p>

        <div className="max-w-md mx-auto">
          <LeadForm 
            formId="cta-final"
            ctaText="Quero ver a demo"
            variant="default"
          />
        </div>
      </div>
    </section>
  );
}
