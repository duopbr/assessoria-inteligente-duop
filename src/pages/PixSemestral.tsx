import { PixPayment } from "@/components/pix/pix-payment";

const PixSemestral = () => {
  const pixCode = "00020126360014br.gov.bcb.pix0114547777530001375204000053039865406429.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63042045";
  
  return (
    <PixPayment 
      amount="429,99"
      period="Semestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixSemestral;