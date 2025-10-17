import { LeadForm } from "./lead-form";
import { useEffect, useState } from "react";

export function MidCTASectionB() {
  const [recentSignup, setRecentSignup] = useState({ name: "João", time: 3 });

  useEffect(() => {
    const names = ["João", "Maria", "Pedro", "Ana", "Carlos", "Juliana"];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = Math.floor(Math.random() * 10) + 1;
      setRecentSignup({ name: randomName, time: randomTime });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mid-cta-b" className="py-16 md:py-24 bg-gradient-to-r from-duop-blue to-duop-purple">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
          Pronto para ter 5 horas extras por semana?
        </h2>
        
        <p className="text-xl text-white/90 mb-8">
          Agende uma demo personalizada e veja a Duop em ação no seu WhatsApp
        </p>

        <div className="mb-6 inline-block">
          <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm animate-pulse">
            {recentSignup.name} acabou de agendar (há {recentSignup.time} min)
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <LeadForm 
            formId="mid-cta-b"
            ctaText="Quero ganhar 5 horas por semana"
            urgencyBadge="🔥 15 vagas disponíveis esta semana"
            variant="default"
          />
        </div>
      </div>
    </section>
  );
}
