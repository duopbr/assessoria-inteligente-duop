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
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-duop-blue">
              🚀 +3.000 assessores economizando 5h/semana com IA no WhatsApp
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-duop-gray-dark">
              Automatize tarefas operacionais enquanto você foca em <strong>crescer sua carteira</strong> e <strong>encantar clientes</strong>.
            </p>

            <div className="mb-8">
              <Carousel className="w-full max-w-lg">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-duop-purple/5 rounded-lg p-6 border border-duop-purple/20">
                        <p className="text-lg italic mb-3 text-duop-gray-dark">"{testimonial.text}"</p>
                        <p className="text-sm text-duop-gray">
                          — {testimonial.author}, {testimonial.company}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-duop-blue border-duop-purple/20" />
                <CarouselNext className="text-duop-blue border-duop-purple/20" />
              </Carousel>
            </div>

            <div className="bg-gradient-to-r from-duop-purple to-duop-blue rounded-lg p-6 shadow-xl">
              <LeadForm 
                formId="hero-b"
                ctaText="Quero ver como funciona"
              />
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-duop-purple/20">
              <iframe
                src="https://www.youtube.com/embed/cxyJzfPjgUM"
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
