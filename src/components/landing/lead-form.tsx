import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { toast } from "sonner";
import { formRateLimiter, getRateLimitIdentifier, validateName, validatePhoneNumber } from "@/lib/security";

interface LeadFormProps {
  ctaText?: string;
  showBadge?: boolean;
  badgeText?: string;
  showMiniTestimonial?: boolean;
  urgencyBadge?: string;
  formId: string;
  variant?: "default" | "gradient";
}

export function LeadForm({
  ctaText = "Quero ver como funciona",
  showBadge = false,
  badgeText = "+3.000 assessores já conhecem a Duop",
  showMiniTestimonial = false,
  urgencyBadge,
  formId,
  variant = "default"
}: LeadFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Check rate limiting
    const rateLimitId = getRateLimitIdentifier();
    if (!formRateLimiter.isAllowed(rateLimitId)) {
      const timeUntilReset = Math.ceil(formRateLimiter.getTimeUntilReset(rateLimitId) / 1000 / 60);
      setError(`Muitas tentativas. Tente novamente em ${timeUntilReset} minutos.`);
      return;
    }

    // Sanitize and validate name
    const sanitizedName = DOMPurify.sanitize(name.trim());
    const nameValidation = validateName(sanitizedName);
    if (!nameValidation.isValid) {
      setError(nameValidation.error || "Nome inválido");
      toast.error(nameValidation.error || "Nome inválido");
      return;
    }
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      toast.error("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      return;
    }

    const digitsOnly = phoneNumber.replace(/\D/g, "");
    setIsSubmitting(true);

    try {
      // Format phone number based on digit count
      let phoneWithCountryCode;
      if (digitsOnly.length === 10) {
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
      } else {
        phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
      }

      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');

      // Check if entry already exists
      const { data: existingEntry } = await supabase
        .from('assessores')
        .select('id')
        .eq('celular', phoneWithCountryCode)
        .eq('nome', sanitizedName)
        .maybeSingle();

      if (existingEntry) {
        toast.success("Dados enviados com sucesso!");
        navigate("/thank-you");
        return;
      }

      // Insert into Supabase
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
        console.error('Error inserting lead:', supabaseError);
        throw new Error("Erro ao enviar seus dados. Tente novamente.");
      }
      
      toast.success("Dados enviados com sucesso!");
      navigate("/thank-you");
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerClass = variant === "gradient" 
    ? "bg-gradient-to-r from-duop-purple to-duop-blue p-8 rounded-lg shadow-xl"
    : "";

  return (
    <div className={containerClass}>
      {urgencyBadge && (
        <div className="mb-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
          {urgencyBadge}
        </div>
      )}
      
      {showBadge && (
        <div className="mb-4 inline-block bg-duop-purple/10 text-duop-purple px-4 py-2 rounded-full text-sm font-semibold">
          {badgeText}
        </div>
      )}

      {showMiniTestimonial && (
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/90 italic text-sm">
            "Economizei 6 horas por semana nas tarefas operacionais"
          </p>
          <p className="text-white/70 text-xs mt-2">— João Silva, XP Investimentos</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id={`name-${formId}`}
            value={name}
            onChange={handleNameChange}
            placeholder="Seu nome completo"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-duop-purple focus:border-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <input
            type="tel"
            id={`phone-${formId}`}
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-duop-purple focus:border-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cta-button text-lg py-4"
        >
          {isSubmitting ? "Enviando..." : ctaText}
        </button>

        <p className="text-sm text-center text-duop-gray-dark mt-4">
          ✅ Demo gratuita • 📱 15 minutos • 🚀 Sem compromisso
        </p>
      </form>
    </div>
  );
}
