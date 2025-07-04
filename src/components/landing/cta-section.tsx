import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Phone, Send, CheckCircle, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function CTASection() {
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
      
      // Send data to dataLayer for GTM tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          nome: name.trim(),
          phone: phoneWithCountryCode
        });
      }
      
      // Insert into Supabase assessores table with correct lowercase names
      const { error: supabaseError } = await supabase
        .from('assessores')
        .insert([
          {
            celular: phoneWithCountryCode,
            nome: name
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
    <Section id="contato" className="bg-gradient-to-br from-duop-purple/10 to-duop-purple/5">
      <SectionTitle emoji="💡">Quer testar nossa solução?</SectionTitle>
      <div className="max-w-md mx-auto text-center">
        <p className="text-xl mb-6">
          Deixe seus dados e entraremos em contato para disponibilizar um período de teste gratuito da plataforma.
        </p>
        {isSubmitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-center gap-2 mb-4">
            <CheckCircle size={20} />
            <span>Recebemos seu contato! Logo retornaremos.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <Label htmlFor="cta-name" className="text-duop-gray-dark mb-1 block">
                Seu nome
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User size={18} className="text-duop-gray" />
                </div>
                <Input
                  id="cta-name"
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
              <Label htmlFor="phone" className="text-duop-gray-dark mb-1 block">
                Seu telefone com DDD
              </Label>
              <div className="flex">
                <div className="flex items-center">
                  <div className="bg-gray-50 border border-r-0 border-gray-300 px-3 py-2 rounded-l-md flex items-center gap-2">
                    <Phone size={18} className="text-duop-gray" />
                    <span className="text-duop-gray-dark font-medium">+55</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="rounded-l-none rounded-r-none"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={16}
                    required
                  />
                </div>
                <Button type="submit" className="ml-0 bg-duop-purple hover:bg-duop-purple/90 text-white rounded-l-none"
                  disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11 || !name.trim()}
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
