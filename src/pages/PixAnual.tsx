import { PixPayment } from "@/components/pix/pix-payment";

const PixAnual = () => {
  const pixCode = "00020126360014br.gov.bcb.pix0114547777530001375204000053039865406814.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***6304396E";
  
  return (
    <PixPayment 
      amount="814,99"
      period="Anual"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixAnual;