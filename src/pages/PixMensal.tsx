import { PixPayment } from "@/components/pix/pix-payment";

const PixMensal = () => {
  const pixCode = "00020126360014br.gov.bcb.pix011454777753000137520400005303986540579.905802BR5916GPR ANALISE LTDA6008BRASILIA62070503***630463B0";
  
  return (
    <PixPayment 
      amount="79,90"
      period="Mensal"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixMensal;