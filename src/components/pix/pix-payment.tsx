import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface PixPaymentProps {
  amount: string;
  period: string;
  pixCode: string;
  qrCodeUrl: string;
}

export function PixPayment({ amount, period, pixCode, qrCodeUrl }: PixPaymentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success("PIX copiado com sucesso!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar PIX");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-duop-purple/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
            alt="Duop Logo"
            className="h-12 mx-auto"
            loading="eager"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2 text-duop-gray-dark">
          Pagamento PIX - Plano {period}
        </h2>
        <p className="text-xl font-semibold text-duop-purple mb-8">
          R$ {amount}
        </p>

        <div className="mb-8">
          {/* PIX Copia e Cola */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-duop-gray-dark text-center">
              PIX Copia e Cola
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-xs text-gray-600 break-all font-mono leading-relaxed">
                {pixCode}
              </p>
            </div>
            <Button 
              onClick={handleCopyPix}
              className="w-full bg-duop-purple hover:bg-duop-purple/90 text-white"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar PIX
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-white border-2 border-duop-purple/20 p-6 rounded-lg">
          <p className="text-duop-gray-dark text-center text-lg">
            Faça o pagamento e envie o comprovante na tela do WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}