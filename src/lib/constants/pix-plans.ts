// Configuração centralizada de todos os planos PIX
// Elimina duplicação de 7 arquivos de página

export interface PixPlan {
  amount: string;
  period: string;
  pixCode: string;
}

export const PIX_PLANS: Record<string, PixPlan> = {
  // Planos Duop principais
  'pix-mensal': {
    amount: '79,90',
    period: 'Mensal',
    pixCode: '00020126360014br.gov.bcb.pix011454777753000137520400005303986540579.905802BR5916GPR ANALISE LTDA6008BRASILIA62070503***630463B0',
  },
  'pix-trimestral': {
    amount: '227,99',
    period: 'Trimestral',
    pixCode: '00020126360014br.gov.bcb.pix0114547777530001375204000053039865406227.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63040073',
  },
  'pix-semestral': {
    amount: '429,99',
    period: 'Semestral',
    pixCode: '00020126360014br.gov.bcb.pix0114547777530001375204000053039865406429.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63042045',
  },
  'pix-anual': {
    amount: '814,99',
    period: 'Anual',
    pixCode: '00020126360014br.gov.bcb.pix0114547777530001375204000053039865406814.995802BR5916GPR ANALISE LTDA6008BRASILIA62070503***6304396E',
  },
  // Planos Teses
  'teses-pix-mensal': {
    amount: '39,90',
    period: 'Mensal',
    pixCode: '00020126450014br.gov.bcb.pix0114547777530001370205duop 520400005303986540539.905802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63049084',
  },
  'teses-pix-trimestral': {
    amount: '113,69',
    period: 'Trimestral',
    pixCode: '00020126360014br.gov.bcb.pix0114547777530001375204000053039865406113.695802BR5916GPR ANALISE LTDA6008BRASILIA62070503***6304CBBF',
  },
  'teses-pix-semestral': {
    amount: '215,69',
    period: 'Semestral',
    pixCode: '00020126360014br.gov.bcb.pix0114547777530001375204000053039865406215.695802BR5916GPR ANALISE LTDA6008BRASILIA62070503***63044441',
  },
} as const;

export type PixPlanKey = keyof typeof PIX_PLANS;
