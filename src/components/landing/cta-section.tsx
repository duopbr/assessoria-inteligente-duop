
import { useState } from "react";
import { Section, SectionTitle } from "../ui/section";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { NameInput } from "../ui/name-input";
import { PhoneInput } from "../ui/phone-input";
import { toast } from "../ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatPhoneNumber } from "@/utils/phone-formatter";

export function CTASection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      
      // Check if phone number already exists
      const { data: existingRecord } = await supabase
        .from('assessores')
        .select('id')
        .eq('celular', phoneWithCountryCode)
        .single();

      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('assessores')
          .update({ nome: name })
          .eq('celular', phoneWithCountryCode);

        if (updateError) {
          console.error("Supabase update error:", updateError);
          toast.error("Ocorreu um erro ao atualizar seus dados. Tente novamente mais tarde.");
          setIsSubmitting(false);
          return;
        }
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('assessores')
          .insert({
            celular: phoneWithCountryCode,
            nome: name
          });

        if (insertError) {
          console.error("Supabase insert error:", insertError);
          toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente mais tarde.");
          setIsSubmitting(false);
          return;
        }
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
            <NameInput
              id="cta-name"
              label="Seu nome"
              value={name}
              onChange={handleNameChange}
              required
            />
            
            <div className="text-left">
              <PhoneInput
                id="phone"
                label="Seu telefone com DDD"
                value={phoneNumber}
                onChange={handlePhoneChange}
                error={error}
                required
              />
              <div className="flex mt-2">
                <div className="flex-1"></div>
                <Button type="submit" className="bg-duop-purple hover:bg-duop-purple/90 text-white"
                  disabled={isSubmitting || phoneNumber.replace(/\D/g, "").length !== 11 || !name.trim()}
                >
                  {isSubmitting ? "Enviando..." : <Send size={18} />}
                </Button>
              </div>
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
