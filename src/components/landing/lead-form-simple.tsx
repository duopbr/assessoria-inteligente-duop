import { Phone, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";
import { formRateLimiter, getRateLimitIdentifier, validateName, validatePhoneNumber } from "@/lib/security";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function LeadFormSimple() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length === 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else if (numbers.length > 11) {
      const limitedNumbers = numbers.slice(0, 11);
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
    
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedValue);
    if (error) setError("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setName(sanitizedValue);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const rateLimitId = getRateLimitIdentifier();
    if (!formRateLimiter.isAllowed(rateLimitId)) {
      const timeUntilReset = Math.ceil(formRateLimiter.getTimeUntilReset(rateLimitId) / 1000 / 60);
      setError(`Muitas tentativas. Tente novamente em ${timeUntilReset} minutos.`);
      return;
    }
    
    const sanitizedName = DOMPurify.sanitize(name.trim());
    const nameValidation = validateName(sanitizedName);
    if (!nameValidation.isValid) {
      setError(nameValidation.error || "Nome inválido");
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Por favor, digite um número válido com DDD (11 dígitos).");
      return;
    }
    
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    setIsSubmitting(true);
    
    try {
      let phoneWithCountryCode;
      if (digitsOnly.length === 10) {
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
      } else {
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
      }
      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          nome: sanitizedName,
          phone: phoneWithCountryCode
        });
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');

      const { data: existingEntry } = await supabase
        .from('assessores')
        .select('id')
        .eq('celular', phoneWithCountryCode)
        .eq('nome', sanitizedName)
        .maybeSingle();

      if (existingEntry) {
        const queueNumber = Math.floor(Math.random() * 71) + 50;
        navigate(`/obrigado?numero=${queueNumber}`);
        return;
      }

      const { error: supabaseError } = await supabase
        .from('assessores')
        .insert([
          {
            celular: phoneWithCountryCode,
            nome: sanitizedName,
            utm_source: utmSource,
            utm_medium: utmMedium
          }
        ]);

      if (supabaseError) {
        toast.error("Ops! Tente novamente - funciona na segunda tentativa!");
        setIsSubmitting(false);
        return;
      }
      
      const queueNumber = Math.floor(Math.random() * 71) + 50;
      navigate(`/obrigado?numero=${queueNumber}`);
      
    } catch (err) {
      toast.error("Conexão instável! Clique novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-contato" className="bg-gradient-to-br from-duop-purple to-duop-blue py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🚀 Veja a Duop em ação
          </h2>
          <p className="text-xl text-white/90">
            Agende uma demo de <strong>15 minutos</strong> e descubra como ganhar 5 horas por semana.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <Label htmlFor="lead-name" className="text-duop-gray-dark mb-2 block font-semibold">
                Seu nome
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User size={20} className="text-duop-gray" />
                </div>
                <Input
                  id="lead-name"
                  type="text"
                  placeholder="Ex: João Silva"
                  className="pl-12 py-6 text-lg"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <Label htmlFor="lead-phone" className="text-duop-gray-dark mb-2 block font-semibold">
                Seu WhatsApp com DDD
              </Label>
              <div className="flex items-center">
                <div className="bg-gray-100 border border-r-0 border-gray-300 px-4 py-3 rounded-l-md flex items-center gap-2">
                  <Phone size={20} className="text-duop-gray" />
                  <span className="text-duop-gray-dark font-semibold">+55</span>
                </div>
                <Input
                  id="lead-phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="rounded-l-none py-6 text-lg"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={16}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* CTA Button */}
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-duop-blue hover:bg-duop-blue/90 text-white py-7 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              disabled={isSubmitting || (phoneNumber.replace(/\D/g, "").length !== 10 && phoneNumber.replace(/\D/g, "").length !== 11) || !name.trim()}
            >
              {isSubmitting ? "Enviando..." : "✅ Quero ganhar 5 horas por semana"}
            </Button>

            <p className="text-center text-sm text-duop-gray">
              ⚡ Resposta em até 24h • 📱 Sem compromisso • 🎁 100% gratuito
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
