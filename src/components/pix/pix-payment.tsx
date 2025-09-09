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
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">DUOP</span>
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2 text-duop-gray-dark">
          Pagamento PIX - Plano {period}
        </h2>
        <p className="text-xl font-semibold text-duop-purple mb-6">
          R$ {amount}
        </p>

        {/* Selo de Membro */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/0f21ed54-64e7-4392-aaac-eb9fc22bf605.png" 
            alt="Membro Duop" 
            className="w-32 h-auto"
          />
        </div>

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
          <h3 className="text-xl font-semibold text-duop-gray-dark mb-3 text-center">
            Instruções de Pagamento
          </h3>
          <p className="text-duop-gray-dark text-center text-lg">
            Faça o pagamento e envie o comprovante dentro do fluxo do WhatsApp para confirmar sua assinatura.
          </p>
        </div>
      </div>
    </div>
  );
}