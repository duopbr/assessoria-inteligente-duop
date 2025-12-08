import { Navigate, useLocation } from 'react-router-dom';
import { PixPayment } from '@/components/pix/pix-payment';
import { PIX_PLANS, PixPlanKey } from '@/lib/constants/pix-plans';

const PixPaymentPage = () => {
  const location = useLocation();
  
  // Extrai o nome do plano da URL (ex: /pix-mensal -> pix-mensal)
  const planKey = location.pathname.slice(1) as PixPlanKey;
  const planConfig = PIX_PLANS[planKey];
  
  if (!planConfig) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <PixPayment 
      amount={planConfig.amount}
      period={planConfig.period}
      pixCode={planConfig.pixCode}
      qrCodeUrl=""
    />
  );
};

export default PixPaymentPage;
