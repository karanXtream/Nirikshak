import type { Screen } from '../App';

export default function ReportPreviewScreen({ nav }: { nav: (s: Screen) => void }) {
  const now = new Date();
  const reportDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const reportTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('officer-review')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Report Preview</span>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        {/* PDF-style preview */}
        <div className="mx-3 my-3 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          {/* Report header */}
          <div className="px-5 py-5" style={{ background: '#1A3A6B' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <svg width="28" height="28" viewBox="0 0 52 52" fill="none">
                    <circle cx="30" cy="20" r="10" fill="none" stroke="white" strokeWidth="3"/>
                    <line x1="37" y1="27" x2="44" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <rect x="5" y="16" width="20" height="24" rx="2" fill="white" fillOpacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold" style={{ opacity: 0.8 }}>Government of India</p>
                  <p className="text-white text-sm font-bold">Legal Metrology Inspection Report</p>
                  <p className="text-white text-xs" style={{ opacity: 0.7 }}>Ministry of Consumer Affairs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ashoka Emblem-style divider */}
          <div className="flex items-center px-5 py-2" style={{ background: '#EEF2FA', borderBottom: '3px solid #1A3A6B' }}>
            <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #1A3A6B, transparent)' }} />
            <span className="text-xs font-bold px-3" style={{ color: '#1A3A6B' }}>OFFICIAL INSPECTION REPORT</span>
            <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(270deg, #1A3A6B, transparent)' }} />
          </div>

          <div className="px-5 py-4 space-y-4">
            {/* Meta info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Report No.', value: 'INS/DL/2026/0847' },
                { label: 'Date', value: reportDate },
                { label: 'Time', value: reportTime },
                { label: 'GPS Location', value: '28.7041° N, 77.1025° E' },
              ].map((item, i) => (
                <div key={i} className="rounded-lg p-2.5" style={{ background: '#F5F5F5' }}>
                  <p className="text-xs font-semibold" style={{ color: '#9E9E9E' }}>{item.label}</p>
                  <p className="text-xs font-bold mt-0.5" style={{ color: '#212121', fontFamily: 'JetBrains Mono, monospace' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Officer details */}
            <div className="rounded-xl p-3" style={{ background: '#EEF2FA', border: '1px solid #C5D3EA' }}>
              <p className="text-xs font-bold mb-2" style={{ color: '#1A3A6B' }}>INSPECTING OFFICER</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Name', value: 'Rajesh Kumar' },
                  { label: 'Officer ID', value: 'LMO/DL/2847' },
                  { label: 'Jurisdiction', value: 'Delhi (North)' },
                  { label: 'Designation', value: 'LM Officer Gr.II' },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-xs" style={{ color: '#9E9E9E' }}>{f.label}</p>
                    <p className="text-xs font-semibold" style={{ color: '#212121' }}>{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product details */}
            <div className="rounded-xl p-3" style={{ background: '#F5F5F5', border: '1px solid #E0E0E0' }}>
              <p className="text-xs font-bold mb-2" style={{ color: '#424242' }}>PRODUCT DETAILS</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Product Name', value: 'Haldiram Bhujia' },
                  { label: 'Net Quantity', value: '200g' },
                  { label: 'MRP', value: '₹50.00 (incl. all taxes)' },
                  { label: 'Batch No.', value: 'B/2025/08/114' },
                  { label: 'Mfr. Date', value: 'Aug 2025' },
                  { label: 'Best Before', value: 'Aug 2026' },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-xs" style={{ color: '#757575' }}>{f.label}</span>
                    <span className="text-xs font-semibold" style={{ color: '#212121' }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Score */}
            <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: '#FFF3E0', border: '1px solid #FFE0B2' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#EF6C00' }}>
                <span className="text-white text-sm font-bold">85%</span>
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#E65100' }}>Partial Compliance</p>
                <p className="text-xs" style={{ color: '#EF6C00' }}>3 violations · 7 compliant items</p>
              </div>
            </div>

            {/* Violations */}
            <div>
              <p className="text-xs font-bold mb-2" style={{ color: '#C62828' }}>VIOLATIONS RECORDED</p>
              {[
                { rule: 'LMPC Rule 6(2)', detail: 'Font size: Net Qty numeral 3.2mm (min 4mm)', severity: 'High' },
                { rule: 'LMPC Rule 8', detail: 'Unit sale price not declared', severity: 'Medium' },
                { rule: 'LMPC Rule 10', detail: 'Importer address: city & pincode missing', severity: 'Low' },
              ].map((v, i) => (
                <div key={i} className="flex items-start gap-2 py-2 border-b last:border-b-0" style={{ borderColor: '#F0F0F0' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FFEBEE' }}>
                    <span className="text-xs font-bold" style={{ color: '#C62828', fontSize: 9 }}>{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold" style={{ color: '#C62828' }}>{v.rule}</p>
                    <p className="text-xs" style={{ color: '#424242' }}>{v.detail}</p>
                  </div>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{
                    background: v.severity === 'High' ? '#FFEBEE' : v.severity === 'Medium' ? '#FFF3E0' : '#F3E5F5',
                    color: v.severity === 'High' ? '#C62828' : v.severity === 'Medium' ? '#EF6C00' : '#6A1B9A',
                  }}>{v.severity}</span>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div className="rounded-xl p-3" style={{ background: '#F5F5F5' }}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs" style={{ color: '#9E9E9E' }}>Officer Signature</p>
                  <div className="mt-2 mb-1" style={{ width: 120, height: 1, background: '#424242' }} />
                  <p className="text-xs font-semibold" style={{ color: '#212121' }}>Rajesh Kumar</p>
                  <p className="text-xs" style={{ color: '#9E9E9E' }}>LMO/DL/2847</p>
                </div>
                {/* QR code placeholder */}
                <div className="flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden" style={{ width: 56, height: 56, background: '#212121', padding: 4 }}>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      {/* QR pattern */}
                      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                        const inTopLeft = r < 7 && c < 7;
                        const inTopRight = r < 7 && c > 34;
                        const inBottomLeft = r > 34 && c < 7;
                        if (inTopLeft || inTopRight || inBottomLeft) return null;
                        return Math.random() > 0.5 ? <rect key={`${r}-${c}`} x={r*7} y={c*7} width="6" height="6" fill="white" rx="0.5"/> : null;
                      }))}
                      <rect x="2" y="2" width="18" height="18" fill="none" stroke="white" strokeWidth="2" rx="2"/>
                      <rect x="5" y="5" width="12" height="12" fill="white" rx="1"/>
                      <rect x="28" y="2" width="18" height="18" fill="none" stroke="white" strokeWidth="2" rx="2"/>
                      <rect x="31" y="5" width="12" height="12" fill="white" rx="1"/>
                      <rect x="2" y="28" width="18" height="18" fill="none" stroke="white" strokeWidth="2" rx="2"/>
                      <rect x="5" y="31" width="12" height="12" fill="white" rx="1"/>
                    </svg>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#9E9E9E', fontSize: 8 }}>Scan to verify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-4 py-3 border-t" style={{ borderColor: '#E0E0E0', background: '#fff' }}>
        <div className="flex gap-2 mb-2">
          <button className="flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95" style={{ background: '#1A3A6B', color: 'white' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Share PDF
          </button>
          <button className="flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95" style={{ background: '#FFF3E0', color: '#EF6C00', border: '2px solid #EF6C00' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save Offline
          </button>
        </div>
        <button
          onClick={() => nav('my-inspections')}
          className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: '#2E7D32' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          Submit to Server
        </button>
      </div>
    </div>
  );
}
