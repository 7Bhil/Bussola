import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Écouter l'événement d'installation PWA émis par le navigateur (Chrome / Android / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Ne pas afficher si l'utilisateur a déjà décliné dans cette session
      if (!sessionStorage.getItem('pwa_banner_dismissed')) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Détecter si l'application est déjà installée (mode standalone)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afficher l'invite native d'installation d'Android / Chrome
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('[PWA] L\'utilisateur a accepté l\'installation.');
    }
    
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed-bottom p-3 z-3" 
      style={{ 
        zIndex: 9999, 
        maxWidth: '500px', 
        margin: '0 auto 15px auto', 
        left: '15px', 
        right: '15px' 
      }}
    >
      <div 
        className="bg-white rounded-3 shadow-lg border p-3 d-flex align-items-center justify-content-between gap-3"
        style={{ borderColor: 'var(--brand-primary, #2864ae)' }}
      >
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-2 p-2 d-flex align-items-center justify-content-center text-white flex-shrink-0"
            style={{ backgroundColor: '#2864ae', width: '48px', height: '48px' }}
          >
            <Smartphone size={26} />
          </div>
          <div>
            <h6 className="m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>ONG Busola App</h6>
            <p className="m-0 text-muted" style={{ fontSize: '12px', lineHeight: '1.3' }}>
              Installer sur l'écran d'accueil pour un accès rapide.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <button 
            onClick={handleInstallClick}
            className="btn btn-sm btn-primary fw-bold px-3 py-2 d-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#2864ae', border: 'none', borderRadius: '8px' }}
          >
            <Download size={14} />
            <span>Installer</span>
          </button>
          <button 
            onClick={handleDismiss}
            className="btn btn-sm btn-light text-muted p-2"
            aria-label="Fermer"
            style={{ borderRadius: '8px' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
