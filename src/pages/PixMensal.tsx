import { PixPayment } from "@/components/pix/pix-payment";

const PixMensal = () => {
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540597.005802BR5913Duop Servicos6009SAO PAULO61080540900062070503***6304ABCD";
  
  return (
    <PixPayment 
      amount="97,00"
      period="Mensal"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixMensal;