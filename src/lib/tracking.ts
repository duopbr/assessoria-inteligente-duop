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
    
    // Normalizar dados em texto plano - CAPI faz hash server-side
    const firstNameNormalized = firstName.toLowerCase().trim();
    const lastNameNormalized = lastName.toLowerCase().trim();
    const emailNormalized = data.email ? data.email.toLowerCase().trim() : undefined;
    const phoneE164 = formatPhoneE164(data.phone);
    
    // Objeto de Enhanced Conversion - dados em texto plano para CAPI hashear
    const conversionData: EnhancedConversionData = {
      event: 'lead_form_submit',
      event_id: eventId,
      user_data: {
        email_address: emailNormalized,
        phone_number: phoneE164,
        address: {
          first_name: firstNameNormalized,
          last_name: lastNameNormalized,
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
