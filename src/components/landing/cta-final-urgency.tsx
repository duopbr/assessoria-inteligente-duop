import { Section } from "../ui/section";
import { LeadForm } from "./lead-form";

export function CTAFinalUrgency() {
  return (
    <Section className="bg-gradient-to-br from-duop-purple to-duop-purple-dark text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Agende Sua Demo Antes Que as Vagas Acabem
          </h2>
          <p className="text-xl md:text-2xl mb-2 text-white/90">
            Estamos abrindo acesso gradual para garantir a qualidade do atendimento.
          </p>
          <p className="text-lg text-white/80">
            📱 Demo de 15 minutos direto no seu WhatsApp • 🚀 Acesso em até 24h
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <LeadForm 
            variant="dark" 
            showUrgencyBadge={true}
            ctaText="🚀 Garantir Minha Vaga Agora"
            source="cta_final"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Sem cartão de crédito</span>
          </div>
          <span className="hidden sm:inline text-white/50">•</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Sem instalação</span>
          </div>
          <span className="hidden sm:inline text-white/50">•</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CTAFinalUrgency;
