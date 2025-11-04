import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePhoneNumber } from "@/lib/security";

interface LeadFormProps {
  variant?: "light" | "dark";
  showUrgencyBadge?: boolean;
  ctaText?: string;
  source?: string;
}

export function LeadForm({ 
  variant = "light", 
  showUrgencyBadge = false, 
  ctaText = "📱 Agendar Demonstração",
  source = "hero"
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length <= 11) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
    
    return limited;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e telefone.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(phone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, inclua o DDD e um número válido (ex: 11987654321).",
        variant: "destructive",
      });
      return;
    }

    const sanitizedName = name.trim();
    const sanitizedPhone = phone.replace(/\D/g, ''); // Remove máscara para salvar apenas números

    setIsSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || "direct";
      const utmMedium = urlParams.get("utm_medium") || "none";
      const utmCampaign = urlParams.get("utm_campaign") || "none";

      const { error } = await supabase.from("assessores").insert([
        {
          nome: sanitizedName,
          celular: sanitizedPhone,
          utm_source: utmSource,
          utm_medium: utmMedium,
        },
      ]);

      if (error) throw error;

      // Google Analytics tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission",
          form_name: "lead_form",
          form_location: source,
        });
      }

      toast({
        title: "✅ Agendamento confirmado!",
        description: "Em breve entraremos em contato via WhatsApp.",
      });

      setName("");
      setPhone("");

      setTimeout(() => {
        window.location.href = "/obrigado";
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showUrgencyBadge && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-center animate-pulse">
          <span className="text-red-600 font-semibold text-sm">
            ⏰ Últimas 23 vagas disponíveis esta semana
          </span>
        </div>
      )}

      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""}
          required
        />
        <Input
          type="tel"
          placeholder="(11) 98765-4321"
          value={phone}
          onChange={handlePhoneChange}
          className={isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""}
          maxLength={15}
          required
        />
      </div>

      <p className={`text-sm ${isDark ? "text-white/70" : "text-duop-gray-dark"}`}>
        📱 Enviaremos o link da demo direto no seu WhatsApp. Por isso precisamos do seu número com DDD.
      </p>

      <Button
        type="submit"
        className={`w-full py-6 text-lg font-bold ${
          isDark 
            ? "bg-white text-duop-purple hover:bg-white/90" 
            : "bg-duop-purple text-white hover:bg-duop-purple/90"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : ctaText}
      </Button>

      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 text-sm ${isDark ? "text-white/80" : "text-duop-gray-dark"}`}>
        <span>✅ 15 minutos de demo ao vivo</span>
        <span className="hidden sm:inline">•</span>
        <span>🚫 Zero compromisso</span>
        <span className="hidden sm:inline">•</span>
        <span>🎁 Acesso imediato</span>
      </div>
    </form>
  );
}
