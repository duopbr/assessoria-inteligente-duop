import { PixPayment } from "@/components/pix/pix-payment";

const PixTesesTrimestral = () => {
  const pixCode = "00020126360014br.gov.bcb.pix0114547777530001375204000053039865406113.695802BR5916GPR ANALISE LTDA6008BRASILIA62070503***6304CBBF";
  
  return (
    <PixPayment 
      amount="113,69"
      period="Trimestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixTesesTrimestral;
