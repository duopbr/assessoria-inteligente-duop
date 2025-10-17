export function SocialProofSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          Criada por quem entende de mercado e tecnologia
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-duop-blue/5 to-duop-purple/5 border border-duop-purple/10">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-4 text-duop-blue">Credibilidade</h3>
            <ul className="space-y-2 text-duop-gray-dark">
              <li>✓ Ex-gestores de grandes assessorias</li>
              <li>✓ Time técnico: Mestres e PhDs</li>
              <li>✓ Especialistas em IA financeira</li>
            </ul>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-duop-purple/5 to-duop-blue/5 border border-duop-blue/10">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-4 text-duop-blue">Validação no mercado</h3>
            <ul className="space-y-2 text-duop-gray-dark">
              <li>✓ +3.000 assessores acompanhando</li>
              <li>✓ Co-criada com assessores reais</li>
              <li>✓ Presente em XP, BTG e Warren</li>
            </ul>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-to-br from-duop-blue/5 to-duop-purple/5 border border-duop-purple/10">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-4 text-duop-blue">Resultados comprovados</h3>
            <ul className="space-y-2 text-duop-gray-dark">
              <li>✓ Economize até 5h por semana</li>
              <li>✓ Atenda 3x mais clientes</li>
              <li>✓ Zero estresse operacional</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
