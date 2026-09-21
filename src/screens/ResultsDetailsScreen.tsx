import { useState } from 'react';
import type { Screen } from '../App';

const violations = [
  {
    id: 1,
    title: 'Font Size Violation',
    severity: 'High',
    rule: 'LMPC Rule 6(2)',
    desc: 'Net quantity numeral height is 3.2mm. Minimum required is 4mm as per LMPC Rules.',
    confidence: 94,
    severityColor: '#C62828',
    severityBg: '#FFEBEE',
  },
  {
    id: 2,
    title: 'Missing Unit Sale Price',
    severity: 'Medium',
    rule: 'LMPC Rule 8',
    desc: 'Unit sale price not declared on label. It is mandatory for all retail packaged commodities.',
    confidence: 88,
    severityColor: '#EF6C00',
    severityBg: '#FFF3E0',
  },
  {
    id: 3,
    title: 'Incomplete Importer Address',
    severity: 'Low',
    rule: 'LMPC Rule 10',
    desc: 'Importer address missing city and pincode. Full address with city and PIN code is required.',
    confidence: 76,
    severityColor: '#6A1B9A',
    severityBg: '#F3E5F5',
  },
];

function EvidenceBox({ v }: { v: typeof violations[0] }) {
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height: 80, background: '#1a2a1a' }}>
      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2a1a, #0d1a0d)' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
      </div>
      {/* Red highlight zone */}
      <div className="absolute" style={{
        top: '20%', left: '30%', width: 60, height: 30,
        border: `2px solid ${v.severityColor}`,
        borderRadius: 4,
        boxShadow: `0 0 8px ${v.severityColor}60`,
      }} />
      <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded text-xs font-bold" style={{ background: v.severityColor, color: 'white', fontSize: 9 }}>
        Tap to enlarge
      </div>
    </div>
  );
}

export default function ResultsDetailsScreen({ nav }: { nav: (s: Screen) => void }) {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [decisions, setDecisions] = useState<Record<number, 'confirm' | 'reject' | null>>({ 1: null, 2: null, 3: null });

  const decide = (id: number, d: 'confirm' | 'reject') => {
    setDecisions(prev => ({ ...prev, [id]: d }));
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('results-summary')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Violation Details</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-3 pb-24">
        {violations.map(v => (
          <div key={v.id} className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              className="w-full flex items-start gap-3 p-4"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: v.severityBg }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={v.severityColor} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold" style={{ color: '#212121' }}>{v.title}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: v.severityBg, color: v.severityColor }}>
                    {v.severity} Severity
                  </span>
                </div>
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#9E9E9E' }}>{v.rule}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" style={{ transform: expanded === v.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {expanded === v.id && (
              <div className="px-4 pb-4 space-y-3 animate-fade-in">
                <div className="h-px" style={{ background: '#F0F0F0' }} />

                <p className="text-sm" style={{ color: '#424242' }}>{v.desc}</p>

                <EvidenceBox v={v} />

                {/* Confidence */}
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#F5F5F5' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3A6B" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: '#424242' }}>
                    AI Confidence: <span style={{ color: v.confidence >= 90 ? '#2E7D32' : v.confidence >= 80 ? '#EF6C00' : '#C62828' }}>{v.confidence}%</span>
                  </span>
                  <div className="flex-1 ml-2">
                    <div className="h-2 rounded-full" style={{ background: '#E0E0E0' }}>
                      <div className="h-2 rounded-full" style={{
                        width: `${v.confidence}%`,
                        background: v.confidence >= 90 ? '#2E7D32' : v.confidence >= 80 ? '#EF6C00' : '#C62828',
                      }} />
                    </div>
                  </div>
                </div>

                {/* Decisions */}
                {decisions[v.id] ? (
                  <div className="flex items-center gap-2 p-3 rounded-xl" style={{
                    background: decisions[v.id] === 'confirm' ? '#FFEBEE' : '#E8F5E9',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={decisions[v.id] === 'confirm' ? '#C62828' : '#2E7D32'} strokeWidth="2.5" strokeLinecap="round">
                      {decisions[v.id] === 'confirm' ? <><polyline points="20 6 9 17 4 12"/></> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
                    </svg>
                    <span className="text-sm font-semibold" style={{ color: decisions[v.id] === 'confirm' ? '#C62828' : '#2E7D32' }}>
                      {decisions[v.id] === 'confirm' ? 'Violation Confirmed' : 'Violation Rejected'}
                    </span>
                    <button onClick={() => setDecisions(p => ({ ...p, [v.id]: null }))} className="ml-auto text-xs" style={{ color: '#9E9E9E' }}>Undo</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => decide(v.id, 'confirm')}
                      className="flex-1 h-10 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{ background: '#FFEBEE', color: '#C62828', border: '1.5px solid #C62828' }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => decide(v.id, 'reject')}
                      className="flex-1 h-10 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{ background: '#F5F5F5', color: '#757575', border: '1.5px solid #E0E0E0' }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t" style={{ borderColor: '#E0E0E0', background: '#fff' }}>
        <button
          onClick={() => nav('officer-review')}
          className="w-full h-12 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
          style={{ background: '#1A3A6B' }}
        >
          Continue to Report
        </button>
      </div>
    </div>
  );
}
