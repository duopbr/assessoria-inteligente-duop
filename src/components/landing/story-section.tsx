
import { Section, SectionTitle } from "../ui/section";

export function StorySection() {
  return (
    <Section className="bg-white">
      <SectionTitle>
        Construída por um time com muita 
        <br />
        experiência em mercado e em tecnologia.
      </SectionTitle>
      
      <div className="max-w-3xl mx-auto text-lg text-duop-gray-dark space-y-6">
        <p>
          Com ex-gestores, ex-estrategista de grande assessoria e desenvolvedores especialistas em IA, 
          montamos um time técnico e experiente, mestres, doutores e PhDs.
        </p>
        
        <p>
          Estamos criando a Duop juntos com os assessores - validando tudo com quem vive a realidade. 
          Combinando as dores dos assessores com conhecimento prático e tecnologia de ponta.
        </p>
        
        <p>
          A plataforma nasceu desse incômodo de quem sente na pele a sobrecarga.
          E foi pensada para ajudar esse assessor, não substituir.
        </p>
        
        <p className="font-medium">
          Tudo acontece no WhatsApp. Simples, direto, sem planilhas, sistemas travados ou CRMs do século passado.
        </p>
      </div>
    </Section>
  );
}
