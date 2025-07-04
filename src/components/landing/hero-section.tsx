
import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Phone, Send, CheckCircle, User } from "lucide-react";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";

export function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Função para formatar o número de telefone conforme (00) 00000-0000
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedValue);
    if (error) setError("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate name
    if (!name.trim()) {
      setError("Por favor, digite seu nome.");
      return;
    }

    // Remove caracteres não-numéricos para a validação
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (digitsOnly.length !== 11) {
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add +55 prefix to the phone number before saving
      const phoneWithCountryCode = `+55${digitsOnly}`;
      
      // Insert into Supabase assessores table
      const { error: supabaseError } = await supabase
        .from('Assessores')
        .insert([
          {
            Celular: phoneWithCountryCode,
            Nome: name
          }
        ]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente mais tarde.");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Data submitted successfully:", { name, phoneNumber: phoneWithCountryCode });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPhoneNumber("");
      setName("");
      
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
    <Section className="hero-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-duop-gray-dark mb-6 leading-tight">
              Transforme sua assessoria de investimentos em <span className="text-duop-purple">máquina de resultados</span>
            </h1>
            <p className="text-xl text-duop-gray mb-8 leading-relaxed">
              Gere leads qualificados, responda dúvidas complexas e acompanhe o mercado — tudo automatizado via WhatsApp. <strong>Por apenas R$ 79,90/mês</strong>
            </p>
            
            {isSubmitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-2 mb-6">
                <CheckCircle size={20} />
                <span>Recebemos seu contato! Logo retornaremos.</span>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg border border-duop-purple/20">
                <h3 className="text-lg font-semibold text-duop-gray-dark mb-4">
                  📞 Solicite seu período de teste gratuito
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left">
                    <Label htmlFor="hero-name" className="text-duop-gray-dark mb-1 block">
                      Seu nome
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User size={18} className="text-duop-gray" />
                      </div>
                      <Input
                        id="hero-name"
                        type="text"
                        placeholder="Digite seu nome"
                        className="pl-10"
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <Label htmlFor="hero-phone" className="text-duop-gray-dark mb-1 block">Seu telefone com DDD</Label>
                    <div className="flex items-center">
                      <div className="bg-gray-50 border border-r-0 border-gray-300 px-3 py-2 rounded-l-md flex items-center gap-2">
                        <Phone size={18} className="text-duop-gray" />
                        <span className="text-duop-gray-dark font-medium">+55</span>
                      </div>
                      <Input
                        id="hero-phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="rounded-l-none"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={16}
                        required
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-duop-purple hover:bg-duop-purple/90 text-white"
                    disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11 || !name.trim()}
                  >
                    {isSubmitting ? "Enviando..." : (
                      <>
                        <Send size={18} className="mr-2" />
                        Quero testar grátis
                      </>
                    )}
                  </Button>
                </form>
                <p className="text-sm text-duop-gray-dark mt-3 text-center">
                  Sem compromisso. Teste gratuito por 7 dias.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <img
              src="/lovable-uploads/c6949d6b-bf95-4219-8830-3e3e3232a1c9.png"
              alt="WhatsApp Interface"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
