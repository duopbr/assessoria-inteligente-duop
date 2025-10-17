import { LeadForm } from "./lead-form";

export function HeroSectionA() {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-duop-blue">
              ⚡ Economize 5 horas por semana no atendimento com IA
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-duop-gray-dark">
              Tudo pelo WhatsApp. Automatize tarefas operacionais e foque no que realmente importa: <strong>crescer sua carteira e encantar clientes</strong>.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-lg text-duop-gray-dark">Resumos de carteira em segundos (sem planilhas)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-lg text-duop-gray-dark">Respostas automáticas direto no WhatsApp</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-lg text-duop-gray-dark">Alertas inteligentes antes do cliente perguntar</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-duop-purple to-duop-blue rounded-lg p-6 shadow-xl">
              <LeadForm 
                formId="hero-a"
                showBadge={true}
                showMiniTestimonial={true}
                ctaText="Quero ver como funciona"
              />
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-duop-purple/20">
              <iframe
                src="https://www.youtube.com/embed/cxyJzfPjgUM"
                title="Duop Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
