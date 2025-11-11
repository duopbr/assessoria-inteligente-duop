import { Section, SectionTitle } from "../ui/section";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { YouTubeFacade } from "../ui/youtube-facade";

export function VideoSection() {
  const scrollToForm = () => {
    const form = document.querySelector('form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Section className="bg-gradient-to-b from-white to-duop-purple/5">
      <SectionTitle>Veja em 30 Segundos Como Funciona</SectionTitle>
      
      <div className="max-w-4xl mx-auto mt-8">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-duop-purple/20">
          <YouTubeFacade 
            videoId="JrfYvv90IVE"
            title="Duop - Demonstração"
            startTime={80}
          />
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={scrollToForm}
            className="bg-duop-purple text-white hover:bg-duop-purple/90 px-8 py-6 text-lg font-bold"
          >
            <Play className="mr-2" size={20} />
            Quero isso na minha rotina
          </Button>
          <p className="text-sm text-duop-gray-dark mt-3">
            👆 Agende sua demo personalizada e veja como funciona no seu dia a dia
          </p>
        </div>
      </div>
    </Section>
  );
}
