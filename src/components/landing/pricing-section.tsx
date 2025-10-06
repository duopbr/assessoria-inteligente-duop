import { Section, SectionTitle } from "../ui/section";
import { Check, CreditCard, Zap } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Mensal",
      price: "79,90",
      period: "mês",
      periodLabel: "Mensal",
      installments: null,
      monthlyEquivalent: null,
      badge: "⭐ Recomendado",
      link: "https://buy.stripe.com/14AfZh2RbbfLfFBfYB7AI0E",
      highlighted: true,
      noCommitment: true,
    },
    {
      name: "Trimestral",
      price: "227,99",
      period: "trimestre",
      periodLabel: "Trimestral",
      installments: "até 3x sem juros",
      monthlyEquivalent: "75,99",
      badge: "Até 3x sem juros",
      link: "https://buy.stripe.com/cNi7sLdvP83z9hdeUx7AI0y",
      highlighted: false,
      noCommitment: false,
    },
    {
      name: "Semestral",
      price: "429,99",
      period: "semestre",
      periodLabel: "Semestral",
      installments: "até 6x sem juros",
      monthlyEquivalent: "71,66",
      badge: "Até 6x sem juros",
      link: "https://buy.stripe.com/5kQ28r0J3erX2SP4fT7AI0F",
      highlighted: false,
      noCommitment: false,
    },
    {
      name: "Anual",
      price: "814,99",
      period: "ano",
      periodLabel: "Anual",
      installments: "até 12x sem juros",
      monthlyEquivalent: "67,91",
      badge: "🔥 Economize 18%",
      link: "https://buy.stripe.com/00w9AT2Rb0B72SPeUx7AI0A",
      highlighted: false,
      noCommitment: false,
    },
  ];

  const benefits = [
    "Todas as funcionalidades",
    "Suporte via WhatsApp",
    "Atualizações contínuas",
  ];

  return (
    <Section id="planos" className="bg-gradient-to-b from-white to-duop-purple/5">
      <div className="text-center mb-12">
        <SectionTitle>Sem tempo para demo? Comece já.</SectionTitle>
        <p className="text-xl text-duop-gray-dark max-w-3xl mx-auto mt-6">
          Acesso imediato para quem já conhece o valor. Cancele quando quiser,
          sem burocracia e sem fidelidade.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-duop-purple">
          <CreditCard size={20} />
          <span className="font-medium">Pagamento seguro com cartão de crédito</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col ${
              plan.highlighted
                ? "border-2 border-duop-purple ring-2 ring-duop-purple/20 transform scale-105"
                : "border border-gray-200"
            }`}
          >
            {plan.badge && (
              <div
                className={`text-xs font-bold px-3 py-1 rounded-full mb-4 text-center ${
                  plan.highlighted
                    ? "bg-duop-purple text-white"
                    : "bg-duop-blue/10 text-duop-blue"
                }`}
              >
                {plan.badge}
              </div>
            )}

            <h3 className="text-2xl font-bold text-duop-blue mb-2">
              {plan.name}
            </h3>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-duop-purple">
                  R$ {plan.price}
                </span>
                <span className="text-duop-gray-dark">/{plan.period}</span>
              </div>
              {plan.monthlyEquivalent && (
                <p className="text-sm text-duop-gray-dark mt-1">
                  (R$ {plan.monthlyEquivalent}/mês)
                </p>
              )}
              {plan.installments && (
                <p className="text-sm text-duop-blue font-medium mt-1">
                  {plan.installments}
                </p>
              )}
            </div>

            {plan.noCommitment ? (
              <div className="mb-4 py-3 px-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-sm font-semibold text-green-700">
                  Sem fidelidade - Cancele quando quiser
                </p>
              </div>
            ) : (
              <div className="mb-4 py-3 px-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-semibold text-blue-700">
                  Período de compromisso: {plan.periodLabel.toLowerCase()}
                </p>
              </div>
            )}

            <ul className="space-y-3 mb-6 flex-grow">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <Check className="text-duop-purple mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-duop-gray-dark text-sm">{benefit}</span>
                </li>
              ))}
              {plan.highlighted && (
                <li className="flex items-start gap-2">
                  <Zap className="text-duop-purple mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-duop-purple font-medium text-sm">
                    Suporte prioritário
                  </span>
                </li>
              )}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 px-6 rounded-lg font-bold text-center transition-all duration-300 ${
                plan.highlighted
                  ? "bg-duop-purple text-white hover:bg-duop-purple/90 shadow-lg hover:shadow-xl"
                  : "bg-duop-blue text-white hover:bg-duop-blue/90"
              }`}
            >
              Assinar Agora
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-duop-gray-dark">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔒</span>
          <span>Pagamento 100% seguro via Stripe</span>
        </div>
        <div className="hidden sm:block text-duop-purple">|</div>
        <div className="flex items-center gap-2">
          <Check className="text-green-600" size={20} />
          <span>Sem fidelidade - Cancele a qualquer momento</span>
        </div>
      </div>
    </Section>
  );
}
