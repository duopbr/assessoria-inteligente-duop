import { PixPayment } from "@/components/pix/pix-payment";

const PixTrimestral = () => {
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540291.005802BR5913Duop Servicos6009SAO PAULO61080540900062070503***6304ABCD";
  
  return (
    <PixPayment 
      amount="291,00"
      period="Trimestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixTrimestral;