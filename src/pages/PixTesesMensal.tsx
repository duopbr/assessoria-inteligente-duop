import { PixPayment } from "@/components/pix/pix-payment";

const PixTesesMensal = () => {
  const pixCode = "00020126450014br.gov.bcb.pix0114547777530001370205duop 520400005303986540539.905802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63049084";
  
  return (
    <PixPayment 
      amount="39,90"
      period="Mensal"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixTesesMensal;
