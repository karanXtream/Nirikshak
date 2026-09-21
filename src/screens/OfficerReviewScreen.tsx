import { useState } from 'react';
import type { Screen } from '../App';

type Decision = 'accept' | 'edit' | 'compliant' | null;

export default function OfficerReviewScreen({ nav }: { nav: (s: Screen) => void }) {
  const [d1, setD1] = useState<Decision>(null);
  const [d2, setD2] = useState<Decision>(null);

  const allDone = d1 !== null && d2 !== null;

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('results-details')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Review Findings</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4 pb-24">
        {/* Info banner */}
        <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#FFF3E0', border: '1px solid #FFE0B2' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-sm font-semibold" style={{ color: '#E65100' }}>
            Please review low-confidence items before finalizing. Items below 90% confidence need officer validation.
          </p>
        </div>

        {/* Item 1 */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#F3E5F5' }}>
            <div>
              <p className="text-sm font-bold" style={{ color: '#4A148C' }}>Importer Address</p>
              <p className="text-xs font-semibold" style={{ color: '#6A1B9A' }}>76% confident · Low severity</p>
            </div>
            <div className="px-3 py-1 rounded-full" style={{ background: '#CE93D8' }}>
              <span className="text-xs font-bold" style={{ color: '#4A148C' }}>Needs Review</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Extracted vs Expected */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3" style={{ background: '#FFEBEE' }}>
                <p className="text-xs font-bold mb-1" style={{ color: '#C62828' }}>Extracted Text</p>
                <p className="text-xs font-mono" style={{ color: '#424242' }}>
                  "Haldiram Foods Intl,{'\n'}New Delhi"
                </p>
              </div>
              <div className="rounded-xl p-3" style={{ background: '#E8F5E9' }}>
                <p className="text-xs font-bold mb-1" style={{ color: '#2E7D32' }}>Required Format</p>
                <p className="text-xs font-mono" style={{ color: '#424242' }}>
                  Name, Street,{'\n'}City - 110001
                </p>
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl text-xs" style={{ background: '#EEF2FA', color: '#1A3A6B' }}>
              <strong>LMPC Rule 10:</strong> Full importer address including city and 6-digit PIN code must be printed on the label.
            </div>

            {d1 ? (
              <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: '#E8F5E9' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-sm font-semibold" style={{ color: '#2E7D32' }}>
                  {d1 === 'accept' ? 'AI Finding Accepted' : d1 === 'edit' ? 'Manual Edit Mode' : 'Marked as Compliant'}
                </span>
                <button onClick={() => setD1(null)} className="ml-auto text-xs" style={{ color: '#9E9E9E' }}>Undo</button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Accept AI Finding', val: 'accept' as Decision, color: '#C62828', bg: '#FFEBEE' },
                  { label: 'Edit Manually', val: 'edit' as Decision, color: '#1A3A6B', bg: '#EEF2FA' },
                  { label: 'Mark Compliant', val: 'compliant' as Decision, color: '#2E7D32', bg: '#E8F5E9' },
                ].map(btn => (
                  <button
                    key={btn.label}
                    onClick={() => setD1(btn.val)}
                    className="py-2 px-1 rounded-xl text-xs font-bold text-center transition-all active:scale-95"
                    style={{ background: btn.bg, color: btn.color }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Item 2 */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#FFF3E0' }}>
            <div>
              <p className="text-sm font-bold" style={{ color: '#E65100' }}>Unit Sale Price</p>
              <p className="text-xs font-semibold" style={{ color: '#EF6C00' }}>88% confident · Medium severity</p>
            </div>
            <div className="px-3 py-1 rounded-full" style={{ background: '#FFCC80' }}>
              <span className="text-xs font-bold" style={{ color: '#E65100' }}>Needs Review</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Evidence image */}
            <div className="relative rounded-xl overflow-hidden" style={{ height: 80, background: '#1a1a1a' }}>
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2a1a, #0d1a0d)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: 70, height: 24, border: '2px dashed #EF6C00', borderRadius: 4 }} />
              </div>
              <div className="absolute bottom-1 left-2 text-xs font-bold" style={{ color: '#EF6C00', fontSize: 9 }}>Area where USP should appear</div>
            </div>

            <div className="px-3 py-2 rounded-xl text-xs" style={{ background: '#FFF3E0', color: '#E65100' }}>
              <strong>LMPC Rule 8:</strong> Unit sale price must be declared for all packaged commodities sold by weight or measure.
            </div>

            {d2 ? (
              <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: '#E8F5E9' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-sm font-semibold" style={{ color: '#2E7D32' }}>
                  {d2 === 'accept' ? 'AI Finding Accepted' : 'Rejected by Officer'}
                </span>
                <button onClick={() => setD2(null)} className="ml-auto text-xs" style={{ color: '#9E9E9E' }}>Undo</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setD2('accept')}
                  className="flex-1 h-10 rounded-xl text-sm font-bold transition-all active:scale-95"
                  style={{ background: '#FFF3E0', color: '#EF6C00', border: '1.5px solid #EF6C00' }}
                >
                  Accept
                </button>
                <button
                  onClick={() => setD2('edit')}
                  className="flex-1 h-10 rounded-xl text-sm font-bold transition-all active:scale-95"
                  style={{ background: '#F5F5F5', color: '#757575', border: '1.5px solid #E0E0E0' }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: '#fff' }}>
          <div className="flex-1">
            <p className="text-xs font-semibold mb-1" style={{ color: '#424242' }}>Review Progress</p>
            <div className="h-2 rounded-full" style={{ background: '#E0E0E0' }}>
              <div className="h-2 rounded-full transition-all" style={{
                width: `${((d1 ? 1 : 0) + (d2 ? 1 : 0)) / 2 * 100}%`,
                background: allDone ? '#2E7D32' : '#1A3A6B',
              }} />
            </div>
          </div>
          <span className="text-sm font-bold" style={{ color: allDone ? '#2E7D32' : '#1A3A6B' }}>
            {(d1 ? 1 : 0) + (d2 ? 1 : 0)}/2
          </span>
        </div>
      </div>

      <div className="px-4 py-3 border-t" style={{ borderColor: '#E0E0E0', background: '#fff' }}>
        <button
          onClick={() => allDone && nav('report-preview')}
          className="w-full h-12 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
          style={{
            background: allDone ? '#2E7D32' : '#E0E0E0',
            color: allDone ? 'white' : '#9E9E9E',
          }}
        >
          {allDone ? 'Finalize Report →' : `Complete All Reviews (${(d1 ? 1 : 0) + (d2 ? 1 : 0)}/2 done)`}
        </button>
      </div>
    </div>
  );
}
