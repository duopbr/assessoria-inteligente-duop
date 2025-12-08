/**
 * Rola suavemente até o primeiro formulário da página
 */
export const scrollToForm = (): void => {
  const form = document.querySelector('form');
  form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
