
import { ArrowDown, Phone, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation for Brazilian phone number format
    const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Por favor, digite um número de telefone válido com DDD.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Phone number submitted:", phoneNumber);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPhoneNumber("");
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-br from-white to-duop-purple/5 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">A inteligência</span> que trabalha por você.
            <br />
            Direto no WhatsApp.
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-duop-gray-dark">
            <strong>Menos tempo apagando incêndio</strong>. Mais presença com o cliente. 
            Um conversador feito para assessores que querem <strong>ganhar produtividade</strong>. 
            Por apenas <strong>47,00 reais ao mês</strong>.
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10 fade-in">
          <h3 className="text-xl font-semibold mb-4">Experimente gratuitamente!</h3>
          <p className="mb-4 text-duop-gray-dark">
            Deixe seu telefone para ter acesso ao período de teste gratuito. 
            Nossa equipe entrará em contato para configurar seu trial sem compromisso.
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-center gap-2">
              <CheckCircle size={20} />
              <span>Recebemos seu contato! Logo retornaremos.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <Label htmlFor="hero-phone" className="text-duop-gray-dark mb-1 block">Seu telefone com DDD</Label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={18} className="text-duop-gray" />
                    </div>
                    <Input
                      id="hero-phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="pl-10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="ml-2 bg-duop-purple hover:bg-duop-purple/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : <Send size={18} />}
                  </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              
              <p className="text-sm text-duop-gray-dark">
                Ao informar seus dados, você concorda em receber um contato da nossa equipe.
              </p>
            </form>
          )}
        </div>
        
        <a 
          href="#contato" 
          className="cta-button mx-auto max-w-xs transform transition-transform hover:scale-105 flex"
        >
          🚀 Saiba mais
          <ArrowDown size={18} />
        </a>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
