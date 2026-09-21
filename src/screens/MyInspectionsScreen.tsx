import { useState } from 'react';
import type { Screen } from '../App';

const inspections = [
  { id: 1, name: 'Haldiram Bhujia 200g', date: '19 Sep, 11:42 AM', score: 85, synced: false, violations: 3 },
  { id: 2, name: 'Parle-G Biscuits 100g', date: '19 Sep, 10:32 AM', score: 92, synced: true, violations: 0 },
  { id: 3, name: 'Aashirvaad Atta 5kg', date: '19 Sep, 09:15 AM', score: 74, synced: true, violations: 2 },
  { id: 4, name: 'Maggi Noodles 70g', date: '18 Sep, 04:30 PM', score: 96, synced: true, violations: 0 },
  { id: 5, name: 'Amul Butter 500g', date: '18 Sep, 03:12 PM', score: 61, synced: true, violations: 4 },
  { id: 6, name: 'Unknown Product', date: '18 Sep, 02:05 PM', score: 78, synced: true, violations: 1 },
  { id: 7, name: 'Tata Salt 1kg', date: '17 Sep, 11:00 AM', score: 100, synced: true, violations: 0 },
];

type Filter = 'all' | 'today' | 'week' | 'violations';

export default function MyInspectionsScreen({ nav }: { nav: (s: Screen) => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const filtered = inspections.filter(i => {
    if (filter === 'today') return i.date.startsWith('19 Sep');
    if (filter === 'violations') return i.violations > 0;
    return true;
  }).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const scoreColor = (s: number) => s >= 90 ? '#2E7D32' : s >= 70 ? '#EF6C00' : '#C62828';

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('home')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">My Inspections</span>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
      </div>

      <div className="px-4 pt-3 pb-2 space-y-3" style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
        {/* Search */}
        <div className="flex items-center gap-2 px-3 h-10 rounded-xl" style={{ background: '#F5F5F5', border: '1.5px solid #E0E0E0' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search inspections..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#212121' }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {([
            { id: 'all' as Filter, label: 'All' },
            { id: 'today' as Filter, label: 'Today' },
            { id: 'week' as Filter, label: 'This Week' },
            { id: 'violations' as Filter, label: 'Violations Only' },
          ]).map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: filter === f.id ? '#1A3A6B' : '#F5F5F5',
                color: filter === f.id ? 'white' : '#757575',
                border: filter === f.id ? '1.5px solid #1A3A6B' : '1.5px solid #E0E0E0',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-2.5">
        <p className="text-xs font-semibold" style={{ color: '#9E9E9E' }}>{filtered.length} inspection{filtered.length !== 1 ? 's' : ''}</p>
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => nav('results-summary')}
            className="w-full rounded-2xl p-3 flex items-center gap-3 text-left transition-all active:scale-98"
            style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
          >
            {/* Thumbnail */}
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: '#1a2a1a' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#212121' }}>{item.name}</p>
              <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{item.date}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: item.synced ? '#E8F5E9' : '#FFF3E0',
                    color: item.synced ? '#2E7D32' : '#EF6C00',
                  }}
                >
                  {item.synced ? '✓ Synced' : '⏳ Pending'}
                </span>
                {item.violations > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FFEBEE', color: '#C62828' }}>
                    {item.violations} violation{item.violations !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-bold" style={{ color: scoreColor(item.score) }}>{item.score}%</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </button>
        ))}
        <div style={{ height: 64 }} />
      </div>

      {/* FAB */}
      <div
        className="absolute transition-all"
        style={{ bottom: 72, right: 20 }}
      >
        <button
          onClick={() => nav('capture')}
          className="flex items-center justify-center transition-all active:scale-95"
          style={{
            width: 56, height: 56,
            borderRadius: 16,
            background: '#1A3A6B',
            boxShadow: '0 6px 20px rgba(26,58,107,0.4)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around py-2 border-t" style={{ borderColor: '#E0E0E0', background: '#fff' }}>
        {[
          { label: 'Home', active: false, screen: 'home' as Screen, Icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { label: 'Inspections', active: true, screen: 'my-inspections' as Screen, Icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A3A6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
          { label: 'Reports', active: false, screen: 'report-preview' as Screen, Icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg> },
          { label: 'Profile', active: false, screen: 'profile' as Screen, Icon: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
        ].map((item) => (
          <button key={item.label} onClick={() => nav(item.screen)} className="flex flex-col items-center gap-0.5 px-3">
            <item.Icon />
            <span className="text-xs font-semibold" style={{ color: item.active ? '#1A3A6B' : '#9E9E9E' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
