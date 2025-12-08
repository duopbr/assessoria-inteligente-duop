import { useEffect } from 'react';

export function AccessibilityImprovements() {
  useEffect(() => {
    // Add skip to main content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-duop-purple text-white p-2 z-50';
    
    // Insert as first element in body
    if (document.body && !document.querySelector('.skip-link')) {
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Add focus trap for modals and improve keyboard navigation
    const handleKeydown = (e: KeyboardEvent) => {
      // Escape key to close modals
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.closest('[role="dialog"]')) {
          const closeButton = activeElement.closest('[role="dialog"]')?.querySelector('[aria-label*="fechar"], [aria-label*="close"]') as HTMLElement;
          closeButton?.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return null; // This is a utility component that doesn't render anything
}

export default AccessibilityImprovements;