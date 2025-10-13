import { PixPayment } from "@/components/pix/pix-payment";

const PixTesesSemestral = () => {
  const pixCode = "00020126360014br.gov.bcb.pix0114547777530001375204000053039865406215.695802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63044441";
  
  return (
    <PixPayment 
      amount="215,69"
      period="Semestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixTesesSemestral;
