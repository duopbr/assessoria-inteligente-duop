export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-duop-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          O que você vai conseguir fazer com a Duop
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-duop-blue">
              Responda 3x mais rápido
            </h3>
            <ul className="space-y-3 text-duop-gray-dark">
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Respostas automáticas para dúvidas comuns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>IA busca dados em segundos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Cliente não espera mais horas</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">📊</div>
            <h3 className="text-2xl font-bold mb-4 text-duop-blue">
              Gere relatórios em 10 segundos
            </h3>
            <ul className="space-y-3 text-duop-gray-dark">
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Análise de carteira completa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Linguagem simples para o cliente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Envie direto no WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-duop-blue">
              Antecipe-se ao mercado
            </h3>
            <ul className="space-y-3 text-duop-gray-dark">
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Alertas antes dos clientes perguntarem</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Notificações personalizadas por carteira</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-duop-purple mt-1">•</span>
                <span>Você sempre um passo à frente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
