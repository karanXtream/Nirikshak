import { useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CaptureScreen from './screens/CaptureScreen';
import QualityCheckScreen from './screens/QualityCheckScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultsSummaryScreen from './screens/ResultsSummaryScreen';
import ResultsDetailsScreen from './screens/ResultsDetailsScreen';
import OfficerReviewScreen from './screens/OfficerReviewScreen';
import ReportPreviewScreen from './screens/ReportPreviewScreen';
import MyInspectionsScreen from './screens/MyInspectionsScreen';
import ProfileScreen from './screens/ProfileScreen';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export type Screen =
  | 'login'
  | 'home'
  | 'capture'
  | 'quality'
  | 'processing'
  | 'results-summary'
  | 'results-details'
  | 'officer-review'
  | 'report-preview'
  | 'my-inspections'
  | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManualInstallMessage, setShowManualInstallMessage] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone;
    const isMobileOrTablet = /android|iphone|ipod|ipad|mobile|tablet/i.test(window.navigator.userAgent);

    if (isStandalone || !isMobileOrTablet) {
      return;
    }

    const dismissed = sessionStorage.getItem('nirikshak-install-dismissed') === 'true';
    if (dismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    setShowInstallPrompt(true);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const dismissInstallPrompt = () => {
    sessionStorage.setItem('nirikshak-install-dismissed', 'true');
    setShowInstallPrompt(false);
  };

  const handleInstallApp = async () => {
    if (!installPromptEvent) {
      setShowManualInstallMessage(true);
      return;
    }

    try {
      await installPromptEvent.prompt();
      await installPromptEvent.userChoice;
      dismissInstallPrompt();
    } catch {
      setShowManualInstallMessage(true);
    }
  };

  const nav = (s: Screen) => setScreen(s);

  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen nav={nav} />;
      case 'home': return <HomeScreen nav={nav} />;
      case 'capture': return <CaptureScreen nav={nav} />;
      case 'quality': return <QualityCheckScreen nav={nav} />;
      case 'processing': return <ProcessingScreen nav={nav} />;
      case 'results-summary': return <ResultsSummaryScreen nav={nav} />;
      case 'results-details': return <ResultsDetailsScreen nav={nav} />;
      case 'officer-review': return <OfficerReviewScreen nav={nav} />;
      case 'report-preview': return <ReportPreviewScreen nav={nav} />;
      case 'my-inspections': return <MyInspectionsScreen nav={nav} />;
      case 'profile': return <ProfileScreen nav={nav} />;
    }
  };

  return (
    <div className="app-root" style={{ position: 'relative' }}>
      {showInstallPrompt && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 16, 30, 0.72)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: '#ffffff',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #1A3A6B, #2A4F8F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                <circle cx="30" cy="20" r="10" fill="none" stroke="white" strokeWidth="3"/>
                <line x1="37" y1="27" x2="44" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <rect x="5" y="16" width="20" height="24" rx="2" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>

            <p style={{ margin: 0, textAlign: 'center', color: '#1A3A6B', fontWeight: 800, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Install App
            </p>
            <h2 style={{ margin: '10px 0 8px', textAlign: 'center', color: '#111827', fontSize: 28, lineHeight: 1.2 }}>
              Download Nirikshak on your phone
            </h2>
            <p style={{ margin: '0 0 18px', textAlign: 'center', color: '#4b5563', fontSize: 15, lineHeight: 1.5 }}>
              For the best experience, install this app from your browser and use it like a native app on your mobile or tablet.
            </p>

            <div style={{ background: '#EEF2FA', borderRadius: 14, padding: '12px 14px', marginBottom: 18, color: '#1A3A6B', fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>
              Open your browser menu and tap “Add to Home Screen” or “Install app”.
            </div>

            {showManualInstallMessage && (
              <div style={{ background: '#FFF7ED', borderRadius: 14, padding: '12px 14px', marginBottom: 18, color: '#9A3412', fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>
                Your browser does not provide a one-tap install prompt here. Use the browser menu above to install Nirikshak.
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <button
                onClick={handleInstallApp}
                style={{
                  border: 'none',
                  borderRadius: 14,
                  background: '#1A3A6B',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                {installPromptEvent ? 'Install App' : 'Show Install Steps'}
              </button>
              <button
                onClick={dismissInstallPrompt}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: 14,
                  background: '#fff',
                  color: '#374151',
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                Continue in Browser
              </button>
            </div>
          </div>
        </div>
      )}

      {renderScreen()}
    </div>
  );
}
