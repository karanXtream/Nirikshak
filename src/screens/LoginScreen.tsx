import { useState } from 'react';
import type { Screen } from '../App';

export default function LoginScreen({ nav }: { nav: (s: Screen) => void }) {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#fff' }}>
      {/* Navy header curve */}
      <div
        className="flex flex-col items-center pt-10 pb-12 px-6"
        style={{
          background: 'linear-gradient(160deg, #1A3A6B 0%, #2A4F8F 100%)',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center mb-3"
          style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', borderRadius: 20 }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            {/* Product box */}
            <rect x="6" y="18" width="26" height="28" rx="3" fill="white" fillOpacity="0.9"/>
            <rect x="10" y="22" width="10" height="2" rx="1" fill="#1A3A6B"/>
            <rect x="10" y="26" width="16" height="1.5" rx="0.75" fill="#1A3A6B" fillOpacity="0.5"/>
            <rect x="10" y="30" width="12" height="1.5" rx="0.75" fill="#1A3A6B" fillOpacity="0.5"/>
            {/* Magnifying glass */}
            <circle cx="35" cy="22" r="11" fill="none" stroke="white" strokeWidth="3"/>
            <circle cx="35" cy="22" r="7" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
            <line x1="43" y1="30" x2="49" y2="36" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-wide mb-1">Nirikshak</h1>
        <p className="text-white text-sm font-medium" style={{ opacity: 0.8 }}>
          Smart Inspection in Your Hand
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col px-6 pt-8 pb-4">
        {/* Language selector */}
        <div className="flex justify-end mb-5">
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: '#1A3A6B' }}>
            {(['en','hi'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-4 py-1.5 text-sm font-semibold transition-all"
                style={{
                  background: lang === l ? '#1A3A6B' : '#fff',
                  color: lang === l ? '#fff' : '#1A3A6B',
                }}
              >
                {l === 'en' ? 'English' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1.5" style={{ color: '#424242' }}>
            {lang === 'en' ? 'Username' : 'उपयोगकर्ता नाम'}
          </label>
          <div className="flex items-center gap-3 px-4 rounded-xl border-2 h-12 transition-all focus-within:border-blue-700" style={{ borderColor: '#E0E0E0', background: '#FAFAFA' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input
              type="text"
              placeholder={lang === 'en' ? 'Officer ID / Username' : 'अधिकारी ID / उपयोगकर्ता नाम'}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#212121' }}
              defaultValue="officer.kumar"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-semibold mb-1.5" style={{ color: '#424242' }}>
            {lang === 'en' ? 'Password' : 'पासवर्ड'}
          </label>
          <div className="flex items-center gap-3 px-4 rounded-xl border-2 h-12 focus-within:border-blue-700 transition-all" style={{ borderColor: '#E0E0E0', background: '#FAFAFA' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <input
              type="password"
              placeholder="••••••••"
              className="flex-1 bg-transparent text-sm outline-none"
              defaultValue="password123"
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="text-sm font-semibold" style={{ color: '#1A3A6B' }}>
            {lang === 'en' ? 'Forgot Password?' : 'पासवर्ड भूल गए?'}
          </button>
        </div>

        <button
          onClick={() => nav('home')}
          className="w-full h-12 rounded-xl text-white text-base font-bold tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #1A3A6B, #2A4F8F)', boxShadow: '0 4px 16px rgba(26,58,107,0.35)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          {lang === 'en' ? 'Login' : 'लॉगिन करें'}
        </button>

        <div className="flex-1" />

        <div className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div style={{ height: 1, width: 40, background: '#E0E0E0' }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <div style={{ height: 1, width: 40, background: '#E0E0E0' }} />
          </div>
          <p className="text-xs font-medium" style={{ color: '#9E9E9E' }}>
            Ministry of Consumer Affairs,{'\n'}Food & Public Distribution
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#BDBDBD' }}>
            Government of India
          </p>
        </div>
      </div>
    </div>
  );
}
