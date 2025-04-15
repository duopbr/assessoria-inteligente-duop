
import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Phone, Send, CheckCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "../ui/sonner";

export function CTASection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    try {
      // Replace with your Google Apps Script deployment URL
      const appScriptUrl = "https://script.google.com/macros/s/AKfycbwbAoC3oNkDXHoiymJ2dryJzLeyVzjgSCGMK0zKN2ki6fkRxZ5qRreBkDfgJwSDTj4/exec";
      
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      formData.append('source', 'cta-section');
      formData.append('timestamp', new Date().toISOString());
      
      // Using fetch with no-cors mode since Apps Script doesn't support CORS by default
      const response = await fetch(appScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      console.log("Phone number submitted:", phoneNumber);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPhoneNumber("");
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente mais tarde.");
      setIsSubmitting(false);
    }
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
        )}
      </div>
    </Section>
  );
}
