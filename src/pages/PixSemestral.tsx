import { PixPayment } from "@/components/pix/pix-payment";

const PixSemestral = () => {
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540582.005802BR5913Duop Servicos6009SAO PAULO61080540900062070503***6304ABCD";
  
  return (
    <PixPayment 
      amount="582,00"
      period="Semestral"
      pixCode={pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixSemestral;