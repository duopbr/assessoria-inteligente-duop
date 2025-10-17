export function MetricsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          Por que +3.000 assessores já conhecem a Duop?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-duop-purple to-duop-blue text-white shadow-xl">
            <div className="text-6xl font-bold mb-4">5h</div>
            <p className="text-xl">economizadas por semana</p>
            <p className="text-sm opacity-80 mt-2">(média dos assessores)</p>
          </div>

          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-duop-blue to-duop-purple text-white shadow-xl">
            <div className="text-6xl font-bold mb-4">3.000+</div>
            <p className="text-xl">assessores acompanhando</p>
            <p className="text-sm opacity-80 mt-2">e crescendo todo dia</p>
          </div>

          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-duop-purple to-duop-blue text-white shadow-xl">
            <div className="text-6xl font-bold mb-4">&lt;5min</div>
            <p className="text-xl">para começar a usar</p>
            <p className="text-sm opacity-80 mt-2">configuração simples</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">XP</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">•</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">BTG</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">•</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">Warren</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">•</div>
          <div className="text-2xl font-bold text-duop-gray-dark opacity-60">Outras</div>
        </div>
      </div>
    </section>
  );
}
