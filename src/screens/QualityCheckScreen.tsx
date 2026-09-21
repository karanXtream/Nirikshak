import { useState } from 'react';
import type { Screen } from '../App';

type Check = { label: string; status: 'ok' | 'warn'; message?: string };

const scenarios = [
  {
    name: 'Good Image',
    checks: [
      { label: 'Image Clarity', status: 'ok' },
      { label: 'Lighting', status: 'ok' },
      { label: 'Reference Card', status: 'ok' },
    ] as Check[],
  },
  {
    name: 'Blurry Image',
    checks: [
      { label: 'Image Clarity', status: 'warn', message: 'Image is blurry. Please retake.' },
      { label: 'Lighting', status: 'ok' },
      { label: 'Reference Card', status: 'ok' },
    ] as Check[],
  },
  {
    name: 'Dark + No Card',
    checks: [
      { label: 'Image Clarity', status: 'ok' },
      { label: 'Lighting', status: 'warn', message: 'Image is too dark. Move to better light.' },
      { label: 'Reference Card', status: 'warn', message: 'Reference card not visible. Please include card.' },
    ] as Check[],
  },
];

export default function QualityCheckScreen({ nav }: { nav: (s: Screen) => void }) {
  const [scenario, setScenario] = useState(0);
  const current = scenarios[scenario];
  const allOk = current.checks.every(c => c.status === 'ok');

  return (
    <div className="flex flex-col h-full" style={{ background: '#fff' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('capture')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Image Quality Check</span>
        <div className="w-6" />
      </div>

      {/* Preview image (simulated) */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden" style={{ height: 240 }}>
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: scenario === 1
              ? 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
              : scenario === 2
              ? 'linear-gradient(135deg, #0a0a0a, #050505)'
              : 'linear-gradient(135deg, #1a2a1a, #0d1a0d)',
            filter: scenario === 1 ? 'blur(2px)' : 'none',
          }}
        >
          <div className="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Captured image preview</p>
          </div>
          {/* Simulated label zones */}
          {allOk && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg" style={{ width: 160, height: 100, border: '2px solid rgba(46,125,50,0.8)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
          )}
        </div>
        {/* Overlay status badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full" style={{ background: allOk ? '#2E7D32' : '#C62828' }}>
          <span className="text-white text-xs font-bold">{allOk ? '✓ Good' : '⚠ Issues Found'}</span>
        </div>
      </div>

      {/* Scenario switcher */}
      <div className="mx-4 mt-3 flex gap-2">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => setScenario(i)}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: scenario === i ? '#1A3A6B' : '#F5F5F5',
              color: scenario === i ? 'white' : '#757575',
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Checks */}
      <div className="mx-4 mt-4 space-y-3 flex-1">
        {current.checks.map((check, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{ background: check.status === 'ok' ? '#E8F5E9' : '#FFEBEE' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: check.status === 'ok' ? '#2E7D32' : '#C62828' }}
            >
              {check.status === 'ok' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: check.status === 'ok' ? '#1B5E20' : '#B71C1C' }}>
                {check.label}
              </p>
              {check.message && (
                <p className="text-xs mt-0.5" style={{ color: '#C62828' }}>{check.message}</p>
              )}
              {check.status === 'ok' && (
                <p className="text-xs mt-0.5" style={{ color: '#2E7D32' }}>Looks good</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="px-4 py-4 flex gap-3">
        <button
          onClick={() => nav('capture')}
          className="flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: '#FFF3E0', color: '#EF6C00', border: '2px solid #EF6C00' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          Retake
        </button>
        <button
          onClick={() => allOk && nav('processing')}
          className="flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{
            background: allOk ? '#2E7D32' : '#E0E0E0',
            color: allOk ? 'white' : '#9E9E9E',
            cursor: allOk ? 'pointer' : 'not-allowed',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={allOk ? 'white' : '#9E9E9E'} strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Use This Photo
        </button>
      </div>
    </div>
  );
}
