
import { Section, SectionTitle } from "../ui/section";

export function StorySection() {
  return (
    <Section className="bg-white">
      <SectionTitle>
        Construída por quem já liderou equipes de assessoria e validada por quem vive a linha de frente.
      </SectionTitle>
      
      <div className="max-w-3xl mx-auto text-lg text-duop-gray-dark space-y-6">
        <p>
          Depois de anos atuando como gestor de fundo e líder de equipes de assessores, 
          identificamos o que o tempo e a rotina tiram daqueles que querem realizar um trabalho 
          verdadeiramente consultivo.
        </p>
        
        <p>
          A Duop nasceu desse incômodo. Com um time que une expertise de mercado e 
          tecnologia, criamos uma plataforma feita para ajudar — e nunca substituir — o assessor.
        </p>
        
        <p className="font-medium">
          Tudo acontece dentro do WhatsApp. Esqueça planilhas, sistemas engessados ou CRMs ultrapassados.
        </p>
      </div>
    </Section>
  );
}
