import { Phone, Send, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";

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
    
    // Remove all non-numeric characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    
    // Check if phone has exactly 11 digits (including area code)
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

      // Also send to Google Sheets
      try {
        const response = await fetch('/api/add-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneWithCountryCode,
            name: name,
            source: 'Hero Section'
          }),
        });

        if (!response.ok) {
          console.error("Google Sheets API error:", await response.text());
          // Don't block the flow if Google Sheets fails
        } else {
          console.log("Data sent to Google Sheets successfully");
        }
      } catch (googleSheetsError) {
        console.error("Error sending to Google Sheets:", googleSheetsError);
        // Don't block the flow if Google Sheets fails
      }

      console.log("Data submitted successfully:", { name, phoneNumber: phoneWithCountryCode });
      
      // Generate a random queue number between 50 and 120
      const queueNumber = Math.floor(Math.random() * 71) + 50;
      
      // Redirect to thank you page with queue number
      navigate(`/obrigado?numero=${queueNumber}`);
      
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente mais tarde.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-duop-purple/5 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto fade-in">
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
        </div>
        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10 fade-in">
          <h3 className="text-xl font-semibold mb-4">Agende sua Demonstração Personalizada de 15 Minutos</h3>
          <p className="mb-4 text-duop-gray-dark">
            Veja <strong>ao vivo</strong> como a Duop vai transformar sua rotina de assessor.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
            
            <p className="text-sm text-duop-gray-dark">
              Ao informar seus dados, você concorda em receber um contato da nossa equipe.
            </p>

            {/* CTA Button - agora é o botão de envio do formulário */}
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-duop-purple hover:bg-duop-purple/90 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11 || !name.trim()}
            >
              {isSubmitting ? "Enviando..." : "QUERO VER A DEMO"}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-sm text-duop-gray-dark">
            ⚡ Demonstração ao vivo • 📱 Direto no WhatsApp • 🚀 Sem compromisso
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
