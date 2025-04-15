
import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Phone, Send, CheckCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export function CTASection() {
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
    <Section id="contato" className="bg-gradient-to-br from-duop-purple/10 to-duop-purple/5">
      <SectionTitle emoji="💡">
        Quer testar nossa solução?
      </SectionTitle>
      
      <div className="max-w-md mx-auto text-center">
        <p className="text-xl mb-6">
          Deixe seu telefone e entraremos em contato para disponibilizar 
          um período de teste gratuito da plataforma.
        </p>
        
        {isSubmitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-center gap-2 mb-4">
            <CheckCircle size={20} />
            <span>Recebemos seu contato! Logo retornaremos.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <Label htmlFor="phone" className="text-duop-gray-dark mb-1 block">Seu telefone com DDD</Label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone size={18} className="text-duop-gray" />
                  </div>
                  <Input
                    id="phone"
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
    </Section>
  );
}
