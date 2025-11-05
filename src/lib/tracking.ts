import { getFacebookCookies } from './facebook-tracking';

export interface LeadData {
  fullName: string;
  email?: string;
  phone: string;
  source: string;
}

interface EnhancedConversionData {
  event: string;
  event_id: string;
  user_data: {
    email_address?: string;
    phone_number?: string;
    address: {
      first_name: string;
      last_name: string;
      country: string;
    };
  };
  external_id: string;
  fbc?: string;
  fbp?: string;
  form_location: string;
}

/**
 * Hash de dados usando SHA-256 para Enhanced Conversions
 * Meta Pixel requer dados sensíveis hasheados
 */
const hashData = async (data: string): Promise<string> => {
  const normalized = data.toLowerCase().trim();
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Separa nome completo em primeiro nome e sobrenome
 */
const splitName = (fullName: string): { firstName: string; lastName: string } => {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
};

/**
 * Formata telefone no padrão E.164 (+5521999999999)
 */
const formatPhoneE164 = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  return `+55${digits}`;
};

/**
 * Envia dados de lead para tracking com Enhanced Conversions
 * Suporta email opcional para não aumentar fricção no formulário
 */
export const trackLeadSubmission = async (data: LeadData): Promise<void> => {
  try {
    const { fbc, fbp } = getFacebookCookies();
    const phoneDigitsOnly = data.phone.replace(/\D/g, '');
    const { firstName, lastName } = splitName(data.fullName);
    const eventId = `${Date.now()}_${phoneDigitsOnly}`;
    
    // Hash dos dados sensíveis (apenas se existirem)
    const emailHash = data.email ? await hashData(data.email) : undefined;
    const phoneHash = await hashData(phoneDigitsOnly);
    const phoneE164 = formatPhoneE164(data.phone);
    
    // Objeto de Enhanced Conversion
    const conversionData: EnhancedConversionData = {
      event: 'lead_form_submit',
      event_id: eventId,
      user_data: {
        email_address: emailHash,
        phone_number: phoneHash,
        address: {
          first_name: firstName,
          last_name: lastName,
          country: 'BR',
        },
      },
      external_id: `${phoneDigitsOnly}_${eventId}`,
      fbc: fbc || undefined,
      fbp: fbp || undefined,
      form_location: data.source,
    };

    // Envia ao dataLayer para GTM processar
    if (window.dataLayer) {
      window.dataLayer.push(conversionData);
      
      console.log('📊 Enhanced Conversion enviado:', {
        event_id: eventId,
        has_email: !!data.email,
        has_fbc: !!fbc,
        has_fbp: !!fbp,
        phone_format: phoneE164,
      });
    }
  } catch (error) {
    console.error('❌ Erro ao enviar tracking:', error);
    // Não bloqueia o fluxo se tracking falhar
  }
};

// Tipagem para window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
