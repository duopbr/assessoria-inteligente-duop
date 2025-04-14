
import { Section, SectionTitle } from "../ui/section";
import { Check } from "lucide-react";

export function ValidationSection() {
  return (
    <Section className="bg-duop-purple/5">
      <SectionTitle>
        Mais de 3.000 assessores estão no nosso radar. Os primeiros já estão testando.
      </SectionTitle>
      
      <div className="max-w-3xl mx-auto text-center text-xl">
        <p className="mb-6">
          Não somos uma assessoria. Não vendemos produtos. Somos a inteligência que trabalha com você — 
          ajudando a entregar mais valor com menos desgaste.
        </p>
        
        <div className="flex justify-center items-center gap-2 mt-10">
          <Check className="text-duop-purple" size={24} />
          <span className="text-duop-purple font-bold">Validado por assessores para assessores</span>
        </div>
      </div>
    </Section>
  );
}
