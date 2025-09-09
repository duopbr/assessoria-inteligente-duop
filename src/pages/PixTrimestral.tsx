import { PixPayment } from "@/components/pix/pix-payment";

const PixTrimestral = () => {
  const pixCode = "00020126360014br.gov.bcb.pix0114547777530001375204000053039865406227.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63040073";
  
  return (
    <PixPayment 
      amount="227,99"
      period="Trimestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixTrimestral;