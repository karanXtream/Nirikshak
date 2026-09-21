import type { Screen } from '../App';

function HomeIcon({ color }: { color: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function FileIcon({ color }: { color: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function GridIcon({ color }: { color: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>;
}
function UserIcon({ color }: { color: string }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

function NavBar({ active, nav }: { active: string; nav: (s: Screen) => void }) {
  const items = [
    { id: 'home', label: 'Home', screen: 'home' as Screen, Icon: HomeIcon },
    { id: 'inspections', label: 'Inspections', screen: 'my-inspections' as Screen, Icon: FileIcon },
    { id: 'reports', label: 'Reports', screen: 'report-preview' as Screen, Icon: GridIcon },
    { id: 'profile', label: 'Profile', screen: 'profile' as Screen, Icon: UserIcon },
  ];
  return (
    <div className="flex flex-shrink-0 items-center justify-around border-t py-2" style={{ borderColor: '#E0E0E0', background: '#fff', paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
      {items.map(item => {
        const color = active === item.id ? '#1A3A6B' : '#9E9E9E';
        return (
          <button key={item.id} onClick={() => nav(item.screen)} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <item.Icon color={color} />
            <span className="text-xs font-semibold" style={{ color }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function HomeScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3" style={{ background: '#1A3A6B' }}>
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 52 52" fill="none">
            <circle cx="30" cy="20" r="10" fill="none" stroke="white" strokeWidth="3"/>
            <line x1="37" y1="27" x2="44" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <rect x="5" y="16" width="20" height="24" rx="2" fill="white" fillOpacity="0.7"/>
          </svg>
          <span className="text-white text-lg font-bold tracking-wide">Nirikshak</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#EF6C00', fontSize: 9 }}>2</div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </div>

      {/* Welcome */}
      <div className="px-5 py-4" style={{ background: '#1A3A6B' }}>
        <p className="text-white text-sm font-medium" style={{ opacity: 0.8 }}>Good Morning,</p>
        <h2 className="text-white text-xl font-bold">Officer Rajesh Kumar</h2>
        <p className="text-white text-xs font-medium mt-0.5" style={{ opacity: 0.6 }}>ID: LMO/DL/2847 · Delhi (North)</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
        {/* Main CTA */}
        <button
          onClick={() => nav('capture')}
          className="w-full rounded-2xl flex flex-col items-center justify-center py-6 gap-3 transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #1A3A6B 0%, #2A4F8F 100%)',
            boxShadow: '0 8px 24px rgba(26,58,107,0.4)',
          }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div className="text-center">
            <div className="text-white text-xl font-bold tracking-wide">START NEW INSPECTION</div>
            <div className="text-white text-xs font-medium mt-0.5" style={{ opacity: 0.75 }}>Capture · Analyze · Report</div>
          </div>
        </button>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {([
            { label: 'My Inspections', screen: 'my-inspections', color: '#1A3A6B' },
            { label: 'Reports', screen: 'report-preview', color: '#2E7D32' },
            { label: 'Settings', screen: 'profile', color: '#555' },
          ] as { label: string; screen: Screen; color: string }[]).map((item, idx) => {
            const icons = [
              <svg key="i" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
              <svg key="r" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>,
              <svg key="s" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
            ];
            return (
              <button
                key={item.label}
                onClick={() => nav(item.screen)}
                className="rounded-xl flex flex-col items-center justify-center py-4 gap-2 transition-all active:scale-95"
                style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${item.color}18` }}>
                  {icons[idx]}
                </div>
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: '#424242' }}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold" style={{ color: '#212121' }}>Today's Summary</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#EEF2FA', color: '#1A3A6B' }}>19 Sep 2026</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Today's Inspections", value: '5', color: '#1A3A6B', bg: '#EEF2FA' },
              { label: 'Pending Sync', value: '2', color: '#EF6C00', bg: '#FFF3E0' },
              { label: 'Violations', value: '3', color: '#C62828', bg: '#FFEBEE' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl p-3 flex flex-col items-center gap-1" style={{ background: stat.bg }}>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs font-semibold text-center leading-tight" style={{ color: stat.color }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold" style={{ color: '#212121' }}>Recent Inspections</h3>
            <button onClick={() => nav('my-inspections')} className="text-xs font-semibold" style={{ color: '#1A3A6B' }}>See All</button>
          </div>
          {[
            { name: 'Parle-G Biscuits 100g', time: '10:32 AM', score: 92, status: 'Synced', color: '#2E7D32' },
            { name: 'Aashirvaad Atta 5kg', time: '09:15 AM', score: 74, status: 'Synced', color: '#EF6C00' },
            { name: 'Haldiram Bhujia 200g', time: '08:40 AM', score: 61, status: 'Pending', color: '#C62828' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-t first:border-t-0" style={{ borderColor: '#F0F0F0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F5F5F5' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: '#212121' }}>{item.name}</p>
                <p className="text-xs" style={{ color: '#9E9E9E' }}>{item.time}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}%</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                  background: item.status === 'Synced' ? '#E8F5E9' : '#FFF3E0',
                  color: item.status === 'Synced' ? '#2E7D32' : '#EF6C00',
                }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
      </div>

      <NavBar active="home" nav={nav} />
    </div>
  );
}
