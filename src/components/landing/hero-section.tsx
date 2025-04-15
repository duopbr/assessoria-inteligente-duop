
import { Phone, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");
    
    // Format the phone number as (00) 00000-0000
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    
    // Limit to 11 digits total
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedValue);
    
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Remove all non-numeric characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    
    // Check if phone has exactly 11 digits (including area code)
    if (digitsOnly.length !== 11) {
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Phone number submitted:", phoneNumber);
      
      // Generate a random queue number between 50 and 120
      const queueNumber = Math.floor(Math.random() * 71) + 50;
      
      // Redirect to thank you page with queue number
      navigate(`/obrigado?numero=${queueNumber}`);
      
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
            <strong>Coloque seu telefone</strong> abaixo e recebe o trial por 7 dias.
          </p>
          
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
                    onChange={handlePhoneChange}
                    maxLength={16}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="ml-2 bg-duop-purple hover:bg-duop-purple/90 text-white"
                  disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11}
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
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
