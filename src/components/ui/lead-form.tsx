import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useToast } from "@/hooks/use-toast";
// supabase, security e tracking carregados dinamicamente no handleSubmit

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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 11);
    
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

    // 1. Validação barata: campos obrigatórios
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e telefone.",
        variant: "destructive",
      });
      return;
    }

    // 2. Validação barata: telefone tem pelo menos 10 dígitos
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, inclua o DDD e um número válido (ex: 11987654321).",
        variant: "destructive",
      });
      return;
    }

    // 3. Desabilita botão ANTES de baixar libs (previne clique duplo)
    setIsSubmitting(true);

    try {
      // 4. Dynamic imports dentro do try (captura erros de rede/build)
      const [
        { supabase },
        { validatePhoneNumber },
        { trackLeadSubmission },
      ] = await Promise.all([
        import("@/integrations/supabase/client"),
        import("@/lib/security"),
        import("@/lib/tracking"),
      ]);

      // 5. Validação completa com a lib
      if (!validatePhoneNumber(phone)) {
        toast({
          title: "Telefone inválido",
          description: "Por favor, inclua o DDD e um número válido (ex: 11987654321).",
          variant: "destructive",
        });
        return;
      }

      // 6. Resto do fluxo IDÊNTICO ao atual
      const sanitizedName = name.trim();
      const sanitizedEmail = email.trim() || null;
      const sanitizedPhone = phoneDigits;

      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || "direct";
      const utmMedium = urlParams.get("utm_medium") || "none";

      const { error } = await supabase.from("assessores").insert([
        {
          nome: sanitizedName,
          email: sanitizedEmail,
          celular: sanitizedPhone,
          utm_source: utmSource,
          utm_medium: utmMedium,
        },
      ]);

      if (error) throw error;

      await trackLeadSubmission({
        fullName: sanitizedName,
        email: sanitizedEmail || undefined,
        phone: sanitizedPhone,
        source,
      });

      toast({
        title: "✅ Agendamento confirmado!",
        description: "Em breve entraremos em contato via WhatsApp.",
      });

      setName("");
      setEmail("");
      setPhone("");

      setTimeout(() => {
        window.location.href = "/obrigado";
      }, 500);
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
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {showUrgencyBadge && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-center animate-pulse">
          <span className="text-red-600 font-semibold text-sm">
            ⏰ Últimas 23 vagas disponíveis esta semana
          </span>
        </div>
      )}

      <div className="space-y-2.5 sm:space-y-3">
        <Input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`h-11 sm:h-12 ${isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""}`}
          required
        />
        <Input
          type="email"
          placeholder="Email (opcional - para materiais exclusivos)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`h-11 sm:h-12 ${isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""}`}
          required={false}
        />
        <Input
          type="tel"
          placeholder="(11) 98765-4321"
          value={phone}
          onChange={handlePhoneChange}
          className={`h-11 sm:h-12 ${isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""}`}
          maxLength={15}
          required
        />
      </div>

      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-white/70" : "text-duop-gray-dark"}`}>
        📱 Enviaremos o link da demo direto no seu WhatsApp. Por isso precisamos do seu número com DDD.
      </p>

      <Button
        type="submit"
        className={`w-full py-4 sm:py-6 text-base sm:text-lg font-bold ${
          isDark 
            ? "bg-white text-duop-purple hover:bg-white/90" 
            : "bg-duop-purple text-white hover:bg-duop-purple/90"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : ctaText}
      </Button>

      <div className={`flex flex-col items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm ${isDark ? "text-white/80" : "text-duop-gray-dark"}`}>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <span>✅ 15 minutos de demo ao vivo</span>
          <span className="hidden sm:inline">•</span>
          <span>🚫 Zero compromisso</span>
        </div>
        <span>🎁 Acesso imediato</span>
      </div>
    </form>
  );
}
