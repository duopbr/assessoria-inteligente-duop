export function HowItWorksB() {
  const handleScrollToForm = () => {
    const formSection = document.querySelector('#mid-cta-b');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          Simples assim: 3 passos e você está operando
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="relative text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-duop-purple to-duop-blue rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              1
            </div>
            <div className="pt-10 pb-6 px-6 bg-gradient-to-br from-duop-purple/5 to-duop-blue/5 rounded-lg border border-duop-purple/10 h-full">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-duop-blue">Conecte no WhatsApp</h3>
              <p className="text-duop-gray-dark">Em apenas 5 minutos você está pronto</p>
            </div>
          </div>

          <div className="relative text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-duop-blue to-duop-purple rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              2
            </div>
            <div className="pt-10 pb-6 px-6 bg-gradient-to-br from-duop-blue/5 to-duop-purple/5 rounded-lg border border-duop-blue/10 h-full">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3 text-duop-blue">Configure seus ativos</h3>
              <p className="text-duop-gray-dark">Personalização opcional, mas recomendada</p>
            </div>
          </div>

          <div className="relative text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-duop-purple to-duop-blue rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              3
            </div>
            <div className="pt-10 pb-6 px-6 bg-gradient-to-br from-duop-purple/5 to-duop-blue/5 rounded-lg border border-duop-purple/10 h-full">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-duop-blue">Comece a economizar tempo</h3>
              <p className="text-duop-gray-dark">Resultados imediatos no seu atendimento</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleScrollToForm}
            className="cta-button text-lg px-8 py-4"
          >
            Começar agora
          </button>
        </div>
      </div>
    </section>
  );
}
