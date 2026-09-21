import { useRef, useState } from 'react';
import type React from 'react';
import type { Screen } from '../App';

export default function CaptureScreen({ nav }: { nav: (s: Screen) => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const captureInputRef = useRef<HTMLInputElement | null>(null);
  const [flash, setFlash] = useState(false);
  const [grid, setGrid] = useState(true);
  const [selectedUploadType, setSelectedUploadType] = useState<'single' | null>('single');
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const uploadImage = () => {
    setSelectedUploadType('single');
    fileInputRef.current?.click();
  };

  const captureImage = () => {
    setSelectedUploadType('single');
    captureInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setUploadedImage(previewUrl);
    setHasUploadedImage(true);
    event.target.value = '';
  };

  const hasAny = hasUploadedImage;

  return (
    <div className="flex flex-col h-full" style={{ background: '#111' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('home')} className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">New Inspection</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setFlash(f => !f)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: flash ? '#EF6C00' : 'rgba(255,255,255,0.2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </button>
          <button onClick={() => setGrid(g => !g)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: grid ? '#2E7D32' : 'rgba(255,255,255,0.2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#1A3A6B' }}>
        {[1,2,3,4].map(step => (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: step === 1 ? 'white' : 'rgba(255,255,255,0.2)',
                color: step === 1 ? '#1A3A6B' : 'rgba(255,255,255,0.6)',
              }}
            >
              {step}
            </div>
            {step < 4 && <div className="flex-1 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />}
          </div>
        ))}
      </div>
      <div className="px-4 pb-2" style={{ background: '#1A3A6B' }}>
        <p className="text-white text-xs font-semibold" style={{ opacity: 0.9 }}>Step 1 of 4: Capture Images</p>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden" style={{ background: '#1a1a1a' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <input
          ref={captureInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={handleFileChange}
        />

        <div className="absolute inset-0" style={{
          background: hasUploadedImage
            ? 'linear-gradient(135deg, rgba(12,24,41,0.9), rgba(17,17,17,0.9))'
            : 'linear-gradient(135deg, #1a2a1a 0%, #0d1a0d 50%, #1a1a2a 100%)',
        }} />

        {grid && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
            <svg width="100%" height="100%">
              <line x1="33%" y1="0" x2="33%" y2="100%" stroke="white" strokeWidth="0.5"/>
              <line x1="66%" y1="0" x2="66%" y2="100%" stroke="white" strokeWidth="0.5"/>
              <line x1="0" y1="33%" x2="100%" y2="33%" stroke="white" strokeWidth="0.5"/>
              <line x1="0" y1="66%" x2="100%" y2="66%" stroke="white" strokeWidth="0.5"/>
            </svg>
          </div>
        )}

        <div className="relative" style={{ width: 280, height: 220 }}>
          {uploadedImage ? (
            <div className="absolute inset-0 overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
              <img src={uploadedImage} alt="uploaded product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3" style={{ border: '1px dashed rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)' }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>
              </svg>
              <span className="text-xs font-medium text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>Upload product image</span>
            </div>
          )}
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ background: 'rgba(0,0,0,0.72)' }}>
          <span className="h-2 w-2 rounded-full" style={{ background: '#EF4444' }} />
          <span className="text-xs font-semibold text-white">Reference card</span>
        </div>

        <p className="absolute bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: 'rgba(0,0,0,0.72)', color: 'rgba(255,255,255,0.9)' }}>
          Place reference card next to product
        </p>

        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={captureImage}
              className="rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg"
              style={{ background: '#2E7D32', color: '#fff' }}
            >
              Capture
            </button>
            <button
              onClick={uploadImage}
              className="rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg"
              style={{ background: '#f0f0f0', color: '#111827' }}
            >
              Upload Image
            </button>
          </div>
          <p className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg inline-block" style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.85)' }}>
            Select any product image to continue
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 pb-3" style={{ background: '#1a1a1a' }}>
        <div className="flex items-center justify-between">
          <button onClick={() => nav('home')} className="px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
            Cancel
          </button>
          <button
            onClick={() => hasAny && nav('quality')}
            className="px-8 py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              background: hasAny ? '#2E7D32' : 'rgba(255,255,255,0.15)',
              color: hasAny ? 'white' : 'rgba(255,255,255,0.35)',
              cursor: hasAny ? 'pointer' : 'default',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
