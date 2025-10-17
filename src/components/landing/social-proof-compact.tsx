import { Users, Shield, TrendingUp } from "lucide-react";

export function SocialProofCompact() {
  return (
    <section className="bg-duop-purple/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-duop-blue mb-4">
            +3.000 assessores já conhecem a Duop
          </h2>
          <p className="text-lg text-duop-gray-dark">
            Construída <strong>com</strong> e <strong>para</strong> assessores de <strong>XP, BTG e Warren</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Credibilidade */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="text-duop-blue mx-auto mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Time experiente</h3>
            <p className="text-sm text-duop-gray">
              Ex-gestores, estrategistas e PhDs em IA
            </p>
          </div>

          {/* Validação */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="text-duop-purple mx-auto mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Co-criada com assessores</h3>
            <p className="text-sm text-duop-gray">
              Validada por quem vive a realidade do mercado
            </p>
          </div>

          {/* Resultado */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <TrendingUp className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="font-bold text-lg mb-2">Resultados reais</h3>
            <p className="text-sm text-duop-gray">
              Economize até 5h por semana em tarefas operacionais
            </p>
          </div>
        </div>

        {/* Depoimento destaque */}
        <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border-l-4 border-duop-blue">
          <p className="text-lg italic text-duop-gray-dark mb-4">
            "Economizei 6h por semana. Agora tenho tempo para prospectar e realmente cuidar dos clientes."
          </p>
          <p className="font-bold text-duop-blue">
            — João Silva, Assessor XP Investimentos
          </p>
        </div>
      </div>
    </section>
  );
}
