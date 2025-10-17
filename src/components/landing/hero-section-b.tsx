import { LeadForm } from "./lead-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function HeroSectionB() {
  const testimonials = [
    { text: "Dobrei meu tempo para prospecção", author: "Maria Costa", company: "BTG" },
    { text: "Meus clientes elogiam a rapidez", author: "Pedro Santos", company: "XP" },
    { text: "Menos estresse, mais resultados", author: "Ana Lima", company: "Warren" },
    { text: "Uso todos os dias, não largo mais", author: "Carlos Souza", company: "XP" }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-duop-purple to-duop-blue overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              🚀 Assessores estão economizando 5h/semana com IA no WhatsApp
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              A Duop automatiza tarefas operacionais enquanto você foca em <strong>crescer sua carteira</strong> e <strong>encantar clientes</strong>.
            </p>

            <div className="mb-8">
              <Carousel className="w-full max-w-lg">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <p className="text-lg italic mb-3">"{testimonial.text}"</p>
                        <p className="text-sm text-white/70">
                          — {testimonial.author}, {testimonial.company}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white border-white/20" />
                <CarouselNext className="text-white border-white/20" />
              </Carousel>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <LeadForm 
                formId="hero-b"
                ctaText="Quero ver como funciona"
              />
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
              <iframe
                src="https://www.youtube.com/embed/TqQ2oIxKZkE?si=UwJEqnvWfNk-aRWf"
                title="Duop Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
