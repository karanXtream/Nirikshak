import type { Screen } from '../App';

export default function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const menuItems: { label: string; screen: Screen | null; badge: string | null; iconPath: string }[] = [
    {
      label: 'Inspection History',
      screen: 'my-inspections',
      badge: null,
      iconPath: 'clipboard',
    },
    { label: 'Downloaded Rules', screen: null, badge: '8', iconPath: 'file-text' },
    { label: 'App Settings', screen: null, badge: null, iconPath: 'settings' },
    { label: 'Language', screen: null, badge: 'EN', iconPath: 'globe' },
    { label: 'Help & Support', screen: null, badge: null, iconPath: 'help-circle' },
    { label: 'About Nirikshak', screen: null, badge: 'v2.4', iconPath: 'info' },
  ];

  const renderIcon = (type: string, color: string) => {
    switch (type) {
      case 'clipboard': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>;
      case 'file-text': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
      case 'settings': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
      case 'globe': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
      case 'help-circle': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
      default: return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1A3A6B' }}>
        <button onClick={() => nav('home')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="text-white text-base font-bold">Profile</span>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Profile header */}
        <div className="px-5 py-6 flex items-center gap-4" style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1A3A6B, #2A4F8F)' }}
            >
              <span className="text-white text-3xl font-bold">R</span>
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: '#2E7D32', border: '2px solid white' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#212121' }}>Rajesh Kumar</h2>
            <p className="text-sm font-semibold" style={{ color: '#1A3A6B' }}>LMO/DL/2847</p>
            <p className="text-xs mt-0.5" style={{ color: '#757575' }}>Delhi (North) Jurisdiction</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: '#2E7D32' }} />
              <span className="text-xs font-semibold" style={{ color: '#2E7D32' }}>Active · Grade II Officer</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex" style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
          {[
            { label: 'Total Inspections', value: '142' },
            { label: 'This Month', value: '23' },
            { label: 'Avg Score', value: '88%' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 py-3 flex flex-col items-center" style={{ borderRight: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
              <span className="text-lg font-bold" style={{ color: '#1A3A6B' }}>{stat.value}</span>
              <span className="text-xs" style={{ color: '#9E9E9E' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => item.screen && nav(item.screen)}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b last:border-b-0 transition-all"
              style={{ borderColor: '#F0F0F0' }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#EEF2FA' }}>
                {renderIcon(item.iconPath, '#1A3A6B')}
              </div>
              <span className="flex-1 text-sm font-semibold text-left" style={{ color: '#212121' }}>{item.label}</span>
              {item.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#EEF2FA', color: '#1A3A6B' }}>
                  {item.badge}
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="mx-4 mt-3 mb-4 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <button
            onClick={() => nav('login')}
            className="w-full flex items-center gap-3 px-4 py-3.5 transition-all"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FFEBEE' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <span className="flex-1 text-sm font-bold text-left" style={{ color: '#C62828' }}>Logout</span>
          </button>
        </div>

        <div className="text-center pb-8">
          <p className="text-xs" style={{ color: '#BDBDBD' }}>Nirikshak v2.4.1 · © 2026 MCA</p>
        </div>
      </div>
    </div>
  );
}
