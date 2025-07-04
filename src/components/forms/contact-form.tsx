
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { NameInput } from "../ui/name-input";
import { PhoneInput } from "../ui/phone-input";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatPhoneNumber } from "@/utils/phone-formatter";

export function ContactForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      
      // Use upsert to handle duplicate phone numbers
      const { error: supabaseError } = await supabase
        .from('assessores')
        .upsert(
          {
            celular: phoneWithCountryCode,
            nome: name
          },
          {
            onConflict: 'celular'
          }
        );

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10 fade-in">
      <h3 className="text-xl font-semibold mb-4">Comece agora!</h3>
      <p className="mb-4 text-duop-gray-dark">
        <strong>Coloque seus dados</strong> abaixo e nossa equipe entrará em contato.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <NameInput
          id="hero-name"
          label="Seu nome"
          value={name}
          onChange={handleNameChange}
          required
        />
        
        <PhoneInput
          id="hero-phone"
          label="Seu telefone com DDD"
          value={phoneNumber}
          onChange={handlePhoneChange}
          error={error}
          required
        />
        
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
          {isSubmitting ? "Enviando..." : "🚀 Transforme sua assessoria hoje mesmo!"}
        </Button>
      </form>
    </div>
  );
}
