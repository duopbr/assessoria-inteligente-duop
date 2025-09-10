import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Phone, Send, CheckCircle, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";
import { formRateLimiter, getRateLimitIdentifier, validateName, validatePhoneNumber } from "@/lib/security";

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

  // Função para formatar o número de telefone
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length === 10) {
      // Format for 10 digits: (XX) XXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length === 11) {
      // Format for 11 digits: (XX) XXXXX-XXXX
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else if (numbers.length > 11) {
      // Limit to 11 digits and format accordingly
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
    // Sanitize input to prevent XSS attacks
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setName(sanitizedValue);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log('🔍 CTA FORM: Tentativa de submissão iniciada', { name, phoneNumber });

    // Check rate limiting
    const rateLimitId = getRateLimitIdentifier();
    if (!formRateLimiter.isAllowed(rateLimitId)) {
      const timeUntilReset = Math.ceil(formRateLimiter.getTimeUntilReset(rateLimitId) / 1000 / 60);
      console.log('❌ CTA FORM: Bloqueado por rate limiting');
      setError(`Muitas tentativas. Tente novamente em ${timeUntilReset} minutos.`);
      return;
    }

    // Sanitize and validate name
    const sanitizedName = DOMPurify.sanitize(name.trim());
    const nameValidation = validateName(sanitizedName);
    if (!nameValidation.isValid) {
      setError(nameValidation.error || "Nome inválido");
      return;
    }
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      console.log('❌ CTA FORM: Telefone inválido', { phoneNumber });
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      return;
    }

    const digitsOnly = phoneNumber.replace(/\D/g, "");

    setIsSubmitting(true);

    try {
      // Format phone number based on digit count
      let phoneWithCountryCode;
      if (digitsOnly.length === 10) {
        // Format 10 digits: +55 (XX) XXXX-XXXX
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
      } else {
        // Format 11 digits: +55 (XX) XXXXX-XXXX
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
      }
      
      // Send sanitized data to dataLayer for GTM tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          nome: sanitizedName,
          phone: phoneWithCountryCode
        });
      }
      
      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');

      // Check if entry already exists to prevent duplicates
      const { data: existingEntry } = await supabase
        .from('assessores')
        .select('id')
        .eq('celular', phoneWithCountryCode)
        .eq('nome', sanitizedName)
        .maybeSingle();

      if (existingEntry) {
        // Entry already exists, show success
        setIsSubmitting(false);
        setIsSubmitted(true);
        setPhoneNumber("");
        setName("");
        
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
        return;
      }

      // Insert sanitized data into Supabase assessores table
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
        console.error('❌ CTA FORM: Erro do Supabase:', supabaseError);
        toast.error("Ops! Problema temporário detectado. Clique em 'AGENDAR' novamente - sempre funciona na segunda vez!");
        setIsSubmitting(false);
        return;
      }
      console.log('✅ CTA FORM: Lead salvo com sucesso', { sanitizedName, phoneWithCountryCode });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPhoneNumber("");
      setName("");
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('❌ CTA FORM: Erro na submissão:', err);
      toast.error("Conexão temporariamente instável! Por favor, clique em 'AGENDAR' novamente para confirmar sua demonstração.");
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contato" className="bg-gradient-to-br from-duop-purple/10 to-duop-purple/5">
      <SectionTitle emoji="🚀">Pronto para ver a Duop em ação?</SectionTitle>
      <div className="max-w-md mx-auto text-center px-4">
        <p className="text-lg sm:text-xl mb-6">
          <strong>Agende sua demonstração personalizada de 15 minutos.</strong> Vamos te mostrar exatamente como a Duop vai revolucionar sua rotina de assessor.
        </p>
        {isSubmitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-center gap-2 mb-4">
            <CheckCircle size={20} />
            <span>Recebemos seu contato! Logo retornaremos.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <div className="bg-gray-50 border border-r-0 border-gray-300 px-2 sm:px-3 py-2 rounded-l-md flex items-center gap-1 sm:gap-2 h-full">
                    <Phone size={16} className="text-duop-gray sm:w-[18px] sm:h-[18px]" />
                    <span className="text-duop-gray-dark font-medium text-sm sm:text-base">+55</span>
                  </div>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="pl-20"
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
              className="w-full bg-duop-purple hover:bg-duop-purple/90 text-white text-sm sm:text-base px-3 sm:px-4"
              disabled={isSubmitting || (phoneNumber.replace(/\D/g, "").length !== 10 && phoneNumber.replace(/\D/g, "").length !== 11) || !name.trim()}
            >
              {isSubmitting ? "Enviando..." : "AGENDAR"}
            </Button>
            
            <p className="text-sm text-duop-gray-dark">
              ✅ Um especialista entrará em contato para confirmar o melhor horário para você.
            </p>
          </form>
        )}
      </div>
    </Section>
  );
}
