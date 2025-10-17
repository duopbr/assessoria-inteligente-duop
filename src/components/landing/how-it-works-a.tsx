export function HowItWorksA() {
  return (
    <section className="py-16 md:py-24 bg-duop-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          Veja em 30 segundos como funciona
        </h2>

        <div className="space-y-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl">📱</div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-duop-blue">Tudo no WhatsApp</h3>
              <ul className="space-y-2 text-duop-gray-dark">
                <li>• Sem instalar nada no computador</li>
                <li>• Sem sistemas complicados para aprender</li>
                <li>• Resposta em segundos, direto no seu WhatsApp</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl">🤖</div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-duop-blue">IA Especialista</h3>
              <ul className="space-y-2 text-duop-gray-dark">
                <li>• Treinada com dados reais do mercado financeiro</li>
                <li>• Análises automáticas de carteira personalizadas</li>
                <li>• Linguagem clara e profissional para seus clientes</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl">⚡</div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-duop-blue">Resultados Imediatos</h3>
              <ul className="space-y-2 text-duop-gray-dark">
                <li>• Configure em apenas 5 minutos</li>
                <li>• Teste gratuito de 15 dias, sem compromisso</li>
                <li>• Cancele quando quiser, sem burocracia</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg text-duop-gray-dark mb-6 italic">
            Assista: um assessor usando a Duop em tempo real
          </p>
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/TqQ2oIxKZkE?si=UwJEqnvWfNk-aRWf"
              title="Duop Demo - Como funciona"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
