/**
 * Utilitário para capturar cookies do Facebook Pixel
 * _fbc (Facebook Click ID) e _fbp (Facebook Browser ID)
 */

export interface FacebookCookies {
  fbc: string | null;
  fbp: string | null;
}

/**
 * Obtém os cookies do Facebook (_fbc e _fbp)
 * Estes cookies são essenciais para o Enhanced Conversions do Meta Pixel
 */
export const getFacebookCookies = (): FacebookCookies => {
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  return {
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
  };
};
