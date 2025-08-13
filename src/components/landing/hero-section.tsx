import { Phone, Send, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
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

export function HeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input to prevent XSS attacks
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setName(sanitizedValue);
    if (error) setError("");
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    console.log('🔍 HERO FORM: Tentativa de submissão iniciada', { name, phoneNumber });
    
    // Check rate limiting
    const rateLimitId = getRateLimitIdentifier();
    if (!formRateLimiter.isAllowed(rateLimitId)) {
      const timeUntilReset = Math.ceil(formRateLimiter.getTimeUntilReset(rateLimitId) / 1000 / 60);
      console.log('❌ HERO FORM: Bloqueado por rate limiting');
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
      console.log('❌ HERO FORM: Telefone inválido', { phoneNumber });
      setError("Por favor, digite um número de telefone válido com 11 dígitos incluindo DDD.");
      return;
    }
    
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    
    setIsSubmitting(true);
    
    try {
      // Format phone number as +55 (XX) XXXXX-XXXX
      const phoneWithCountryCode = `+55 (${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
      
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
        // Entry already exists, just redirect
        console.log('ℹ️ HERO FORM: Lead duplicado encontrado, redirecionando', { existingEntry });
        const queueNumber = Math.floor(Math.random() * 71) + 50;
        navigate(`/obrigado?numero=${queueNumber}`);
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
        console.error('❌ HERO FORM: Erro do Supabase:', supabaseError);
        toast.error("Ops! Houve um problema temporário. Por favor, clique em 'QUERO VER A DEMO' novamente - funciona na segunda tentativa!");
        setIsSubmitting(false);
        return;
      }
      
      // Generate a random queue number between 50 and 120
      const queueNumber = Math.floor(Math.random() * 71) + 50;
      
      console.log('✅ HERO FORM: Lead salvo com sucesso, redirecionando', { sanitizedName, phoneWithCountryCode });
      
      // Redirect to thank you page with queue number
      navigate(`/obrigado?numero=${queueNumber}`);
      
    } catch (err) {
      console.error('❌ HERO FORM: Erro na submissão:', err);
      toast.error("Conexão instável detectada! Clique em 'QUERO VER A DEMO' mais uma vez para garantir seu agendamento.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-duop-purple/5 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Coluna do Conteúdo */}
          <div className="fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">A Rotina do Assessor,</span> Reinventada.
              <br />
              100% no WhatsApp.
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-duop-gray-dark">
              Descubra como <strong>revolucionar sua assessoria</strong> em apenas 15 minutos. 
              Vamos te mostrar como <strong>automatizar tarefas</strong>, <strong>antecipar o mercado</strong> 
              e <strong>impressionar clientes</strong> — tudo direto no WhatsApp.
            </p>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Agende sua Demonstração Personalizada de 15 Minutos</h3>
              <p className="mb-4 text-duop-gray-dark">
                Veja <strong>ao vivo</strong> como a Duop vai transformar sua rotina de assessor.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="text-left">
                  <Label htmlFor="hero-name" className="text-duop-gray-dark mb-1 block">Seu nome</Label>
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
                    <div className="bg-gray-50 border border-r-0 border-gray-300 px-2 sm:px-3 py-2 rounded-l-md flex items-center gap-1 sm:gap-2">
                      <Phone size={16} className="text-duop-gray sm:w-[18px] sm:h-[18px]" />
                      <span className="text-duop-gray-dark font-medium text-sm sm:text-base">+55</span>
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
                
                <p className="text-sm text-duop-gray-dark">
                  Ao informar seus dados, você concorda em receber um contato da nossa equipe.
                </p>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-duop-purple hover:bg-duop-purple/90 text-white px-6 sm:px-12 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11 || !name.trim()}
                >
                  {isSubmitting ? "Enviando..." : "QUERO VER A DEMO"}
                </Button>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-duop-gray-dark">
                ⚡ Demonstração ao vivo • 📱 Direto no WhatsApp • 🚀 Sem compromisso
              </p>
            </div>
          </div>

          {/* Coluna do Vídeo */}
          <div className="fade-in">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/JrfYvv90IVE"
                title="Duop - Demonstração da Plataforma"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-sm text-duop-gray-dark mt-3">
              🎥 Veja como a Duop funciona na prática
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
