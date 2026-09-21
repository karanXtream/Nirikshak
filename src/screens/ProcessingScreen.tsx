import { useState, useEffect } from 'react';
import type { Screen } from '../App';

const steps = [
  { label: 'Detecting label zones', duration: 800 },
  { label: 'Reading text', duration: 1200 },
  { label: 'Measuring letter size', duration: 1600 },
  { label: 'Checking rules', duration: 2000 },
];

export default function ProcessingScreen({ nav }: { nav: (s: Screen) => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    setStepIdx(0);
    setTimeLeft(5);
    const interval = setInterval(() => {
      setStepIdx(i => Math.min(i + 1, steps.length));
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stepIdx >= steps.length && timeLeft === 0) {
      const t = setTimeout(() => nav('results-summary'), 600);
      return () => clearTimeout(t);
    }
  }, [stepIdx, timeLeft, nav]);

  return (
    <div className="flex flex-col h-full items-center" style={{ background: '#fff' }}>
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <div className="w-6" />
        <span className="text-white text-base font-bold">Analyzing Label</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
        {/* Spinner */}
        <div className="relative mb-6">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#EEF2FA" strokeWidth="8"/>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#1A3A6B" strokeWidth="8"
              strokeDasharray="138 138" strokeDashoffset="100" strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1A3A6B" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1" style={{ color: '#212121' }}>Reading label...</h2>
        <p className="text-sm mb-8" style={{ color: '#9E9E9E' }}>
          {timeLeft > 0 ? `About ${timeLeft} second${timeLeft !== 1 ? 's' : ''} remaining` : 'Almost done...'}
        </p>

        {/* Steps */}
        <div className="w-full space-y-3">
          {steps.map((step, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{
                background: done ? '#E8F5E9' : active ? '#EEF2FA' : '#F5F5F5',
              }}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: done ? '#2E7D32' : active ? '#1A3A6B' : '#E0E0E0',
                  }}
                >
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : active ? (
                    <div className="w-3 h-3 rounded-full bg-white animate-progress-pulse" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#BDBDBD' }} />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{
                    color: done ? '#1B5E20' : active ? '#1A3A6B' : '#9E9E9E',
                  }}>{step.label}</span>
                </div>
                <span className="text-xs font-semibold" style={{
                  color: done ? '#2E7D32' : active ? '#1A3A6B' : '#BDBDBD',
                }}>
                  {done ? 'Done' : active ? 'In progress' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full mt-6">
          <div className="w-full h-2 rounded-full" style={{ background: '#E0E0E0' }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(stepIdx / steps.length) * 100}%`,
                background: 'linear-gradient(90deg, #1A3A6B, #2A4F8F)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: '#9E9E9E' }}>0%</span>
            <span className="text-xs font-semibold" style={{ color: '#1A3A6B' }}>{Math.round((stepIdx / steps.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Cancel */}
      <div className="pb-8">
        <button
          onClick={() => nav('home')}
          className="px-8 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: '#F5F5F5', color: '#9E9E9E' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
