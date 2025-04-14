
import { Section, SectionTitle } from "../ui/section";
import { ProblemItem } from "../ui/problem-item";
import { Clock, RefreshCcw, Smartphone, Frown, Brain } from "lucide-react";

export function ProblemsSection() {
  return (
    <Section className="bg-gray-50">
      <SectionTitle>
        Se você é assessor, provavelmente já passou por isso:
      </SectionTitle>
      
      <div className="max-w-3xl mx-auto">
        <ProblemItem icon={<Clock />}>
          Acompanhou o mercado, mas não deu tempo de avisar o cliente na hora certa.
        </ProblemItem>
        
        <ProblemItem icon={<RefreshCcw />}>
          Respondeu a mesma dúvida sobre um ativo 15 vezes na mesma semana.
        </ProblemItem>
        
        <ProblemItem icon={<Smartphone />}>
          Perdeu tempo procurando onde estava o dado certo para responder uma pergunta simples.
        </ProblemItem>
        
        <ProblemItem icon={<Frown />}>
          Sabia o que fazer com a carteira, mas o cliente não percebeu nada — e achou que você "sumiu".
        </ProblemItem>
        
        <ProblemItem icon={<Brain />}>
          Queria focar na conversa e orientação, mas passou o dia inteiro resolvendo questões operacionais.
        </ProblemItem>
      </div>
    </Section>
  );
}
