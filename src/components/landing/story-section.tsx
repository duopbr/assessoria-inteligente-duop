
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
          Com <strong>ex-gestores, ex-estrategista de grande assessoria</strong> e desenvolvedores especialistas em IA, 
          montamos um time técnico e experiente, <strong>mestres, doutores e PhDs</strong>.
        </p>
        
        <p>
          Estamos criando a Duop <strong>juntos com os assessores</strong> - validando tudo com quem vive a realidade. 
          Combinando as dores dos assessores com <strong>conhecimento prático e tecnologia de ponta</strong>.
        </p>
        
        <p>
          A plataforma nasceu desse incômodo de quem sente na pele a sobrecarga.
          E foi pensada para <strong>ajudar esse assessor, não substituir</strong>.
        </p>
        
        <p className="font-medium">
          Tudo acontece no WhatsApp. <strong>Simples, direto, sem planilhas</strong>, sistemas travados ou CRMs do século passado.
        </p>
      </div>
    </Section>
  );
}
