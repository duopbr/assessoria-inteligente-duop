import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { scrollToForm } from "@/lib/utils/scroll";

export function VideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <Section className="bg-gradient-to-b from-white to-duop-purple/5">
      <SectionTitle>Veja em 30 Segundos Como Funciona</SectionTitle>
      
      <div className="max-w-4xl mx-auto mt-8">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-card border border-border">
          {!isVideoLoaded ? (
            <button
              onClick={handlePlayClick}
              className="w-full h-full relative group cursor-pointer bg-duop-blue/10"
              aria-label="Reproduzir vídeo de demonstração"
            >
              <img
                src="https://img.youtube.com/vi/QSkl2vUAUow/maxresdefault.jpg"
                alt="Thumbnail do vídeo de demonstração Duop"
                className="w-full h-full object-cover"
                loading="lazy"
                width="1280"
                height="720"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-duop-purple rounded-full flex items-center justify-center shadow-card group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/QSkl2vUAUow?autoplay=1"
              title="Duop - Demonstração"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={scrollToForm}
            className="bg-duop-purple text-white hover:bg-duop-purple/90 px-8 py-6 text-lg font-bold gap-2"
          >
            <Play size={20} />
            Quero isso na minha rotina
          </Button>
          <p className="text-sm text-duop-gray-dark mt-3">
            Agende sua demo personalizada e veja como funciona no seu dia a dia
          </p>
        </div>
      </div>
    </Section>
  );
}

export default VideoSection;