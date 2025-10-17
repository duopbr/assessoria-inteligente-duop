import { Phone, User, CheckCircle, Play } from "lucide-react";
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

export function HeroConversion() {
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
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
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
      toast.error("Conexão instável! Clique novamente para confirmar.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-duop-blue">⚡ IA que economiza 5h por semana</span> no seu atendimento
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-duop-gray-dark">
              Tudo acontece no <strong>WhatsApp</strong>. A Duop automatiza tarefas operacionais 
              e te deixa livre para o que importa: <strong>seus clientes</strong>.
            </p>

            {/* 3 Bullets Principais */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                <p className="text-lg"><strong>Gere resumos de carteira automáticos</strong> em segundos</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                <p className="text-lg"><strong>Responda clientes direto no WhatsApp</strong> com IA</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                <p className="text-lg"><strong>Receba alertas inteligentes</strong> antes dos clientes</p>
              </div>
            </div>

            {/* CTA Scroll */}
            <Button 
              onClick={() => document.getElementById('form-contato')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="w-full md:w-auto bg-duop-blue hover:bg-duop-blue/90 text-white px-12 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              📱 Quero ver na prática agora
            </Button>

            <p className="text-sm text-duop-gray mt-4">
              ✅ Demo gratuita • ⏱️ 15 minutos • 🚫 Sem compromisso
            </p>
          </div>

          {/* Vídeo */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-duop-purple/20">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/cxyJzfPjgUM"
                  title="Duop - Como funciona"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-center mt-4 text-duop-gray flex items-center justify-center gap-2">
              <Play size={16} className="text-duop-blue" />
              Veja em 30 segundos como funciona
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
