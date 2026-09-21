import { useState } from 'react';
import type { Screen } from '../App';

const compliant = [
  { label: 'MRP Declared', value: '₹50.00' },
  { label: 'Net Quantity', value: '500g' },
  { label: 'Manufacturer Name', value: 'Present' },
  { label: 'Consumer Care', value: 'Present' },
  { label: 'Date of Manufacture', value: '05/2025' },
  { label: 'Country of Origin', value: 'India' },
  { label: 'Product Name', value: 'Present' },
];

const violations = [
  { label: 'Font Size', detail: 'Net Qty numeral is 3.2mm (required: 4mm)', severity: 'High' },
  { label: 'Unit Sale Price', detail: 'Missing', severity: 'Medium' },
  { label: 'Importer Address', detail: 'Incomplete', severity: 'Low' },
];

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 90 ? '#2E7D32' : score >= 70 ? '#EF6C00' : '#C62828';
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#F0F0F0" strokeWidth="12"/>
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{score}%</span>
        <span className="text-xs font-semibold" style={{ color: '#9E9E9E' }}>Score</span>
      </div>
    </div>
  );
}

export default function ResultsSummaryScreen({ nav }: { nav: (s: Screen) => void }) {
  const [tab, setTab] = useState<'summary' | 'details'>('summary');

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('home')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Inspection Results</span>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Score section */}
        <div className="flex flex-col items-center py-6" style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
          <ScoreCircle score={85} />
          <div className="mt-3 text-center">
            <p className="text-lg font-bold" style={{ color: '#EF6C00' }}>Partial Compliance</p>
            <p className="text-sm" style={{ color: '#757575' }}>3 Violations Found · 7 Compliant</p>
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#2E7D32' }} />
              <span className="text-xs font-semibold" style={{ color: '#424242' }}>7 Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#C62828' }} />
              <span className="text-xs font-semibold" style={{ color: '#424242' }}>3 Violations</span>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-4 mt-3 p-3 rounded-xl flex items-center gap-3" style={{ background: '#fff' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#EEF2FA' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A3A6B" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: '#212121' }}>Haldiram Bhujia 200g</p>
            <p className="text-xs" style={{ color: '#757575' }}>Inspected: 19 Sep 2026, 11:42 AM</p>
            <p className="text-xs" style={{ color: '#757575' }}>Ref: INS/DL/2026/0847</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-4 mt-3 flex rounded-xl overflow-hidden" style={{ background: '#E0E0E0' }}>
          {(['summary', 'details'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 text-sm font-bold capitalize transition-all"
              style={{
                background: tab === t ? '#1A3A6B' : 'transparent',
                color: tab === t ? 'white' : '#757575',
                borderRadius: 10,
                margin: 3,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'summary' ? (
          <div className="px-4 mt-3 space-y-3 pb-24">
            {/* Compliant */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E8F5E9' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#E8F5E9' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-sm font-bold" style={{ color: '#1B5E20' }}>Compliant Items ({compliant.length})</span>
              </div>
              {compliant.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: '#F0F0F0' }}>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm" style={{ color: '#424242' }}>{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#2E7D32' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Violations */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #FFEBEE' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#FFEBEE' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-sm font-bold" style={{ color: '#B71C1C' }}>Violations ({violations.length})</span>
              </div>
              {violations.map((item, i) => (
                <div key={i} className="flex items-start gap-2 px-4 py-2.5 border-t" style={{ borderColor: '#F0F0F0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <div className="flex-1">
                    <span className="text-sm font-semibold" style={{ color: '#C62828' }}>{item.label}:</span>
                    <span className="text-sm" style={{ color: '#424242' }}> {item.detail}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: item.severity === 'High' ? '#FFEBEE' : item.severity === 'Medium' ? '#FFF3E0' : '#F3E5F5',
                      color: item.severity === 'High' ? '#C62828' : item.severity === 'Medium' ? '#EF6C00' : '#6A1B9A',
                    }}
                  >
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 mt-3 pb-24">
            <p className="text-sm text-center py-8" style={{ color: '#9E9E9E' }}>
              Tap "View Details" to see violation evidence
            </p>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="px-4 py-3 flex gap-3 border-t" style={{ borderColor: '#E0E0E0', background: '#fff' }}>
        <button
          onClick={() => nav('results-details')}
          className="flex-1 h-12 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{ background: '#1A3A6B', color: 'white' }}
        >
          View Details
        </button>
        <button
          onClick={() => nav('officer-review')}
          className="flex-1 h-12 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{ background: '#2E7D32', color: 'white' }}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}
