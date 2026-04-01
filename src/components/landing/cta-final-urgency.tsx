import { Section } from "../ui/section";
import { LeadForm } from "./lead-form";
import { Smartphone, Rocket, Check } from "lucide-react";

export function CTAFinalUrgency() {
  return (
    <Section className="bg-gradient-to-br from-duop-purple to-duop-purple-dark text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Agende Sua Demo Antes Que as Vagas Acabem
          </h2>
          <p className="text-lg md:text-xl mb-2 text-white/90">
            Estamos abrindo acesso gradual para garantir a qualidade do atendimento.
          </p>
          <p className="text-base text-white/80 inline-flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5">
              <Smartphone size={16} />
              Demo de 15 minutos direto no seu WhatsApp
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Rocket size={16} />
              Acesso em até 24h
            </span>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
          <LeadForm 
            variant="dark" 
            showUrgencyBadge={true}
            ctaText="Garantir Minha Vaga Agora"
            source="cta_final"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-white" />
            <span>Sem cartão de crédito</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="flex items-center gap-2">
            <Check size={18} className="text-white" />
            <span>Sem instalação</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="flex items-center gap-2">
            <Check size={18} className="text-white" />
            <span>Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CTAFinalUrgency;