import { useState, useEffect } from 'react';

type Theme = 'dark' | 'sepia' | 'light';

const THEMES: { value: Theme; label: string; icon: string }[] = [
  { value: 'dark',  label: 'Dark',  icon: '🌙' },
  { value: 'sepia', label: 'Sepia', icon: '📜' },
  { value: 'light', label: 'Light', icon: '☀️' },
];

export default function ReaderControls() {
  const [isOpen, setIsOpen] = useState(false);

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fontSize');
      return saved ? parseInt(saved, 10) : 18;
    }
    return 18;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'sepia' || saved === 'light') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());

    document.documentElement.classList.remove('dark', 'sepia');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else if (theme === 'sepia') document.documentElement.classList.add('sepia');
    localStorage.setItem('theme', theme);
  }, [fontSize, theme]);

  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col items-end gap-[12px]" style={{ fontSize: '16px' }}>
      {isOpen && (
        <div
          className="border rounded-[10px] shadow-2xl p-[18px] flex flex-col gap-[16px] min-w-[220px] animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{
            background: '#101828',
            borderColor: '#1f2e47',
            boxShadow: '0 8px 40px rgba(9,15,30,0.7), 0 0 0 1px rgba(201,168,76,0.08)',
          }}
        >
          {/* Text Size */}
          <div>
            <div className="text-[11px] leading-none font-bold uppercase tracking-[0.15em] mb-[10px]" style={{ color: '#9a8c77' }}>
              Text Size
            </div>
            <div className="flex items-center justify-between rounded-[6px] p-[4px]" style={{ background: '#090f1e' }}>
              <button
                onClick={() => setFontSize(s => Math.max(14, s - 2))}
                className="w-[34px] h-[34px] flex items-center justify-center rounded-[4px] transition-colors"
                style={{ color: '#c8baa2' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1f2e47')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="text-[13px]">A</span>
              </button>
              <span className="text-[13px] font-bold" style={{ color: '#c8baa2' }}>{fontSize}px</span>
              <button
                onClick={() => setFontSize(s => Math.min(26, s + 2))}
                className="w-[34px] h-[34px] flex items-center justify-center rounded-[4px] transition-colors"
                style={{ color: '#c8baa2' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1f2e47')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span className="text-[18px] font-bold">A</span>
              </button>
            </div>
          </div>

          <hr style={{ borderColor: '#1f2e47' }} />

          {/* Theme — three-way segmented control */}
          <div>
            <div className="text-[11px] leading-none font-bold uppercase tracking-[0.15em] mb-[10px]" style={{ color: '#9a8c77' }}>
              Theme
            </div>
            <div className="flex rounded-[6px] overflow-hidden border" style={{ borderColor: '#1f2e47' }}>
              {THEMES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className="flex-1 py-[8px] flex flex-col items-center gap-[3px] transition-colors text-[11px] font-bold"
                  style={{
                    background: theme === t.value ? '#c9a84c' : '#090f1e',
                    color:      theme === t.value ? '#090f1e' : '#9a8c77',
                  }}
                  title={t.label}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[54px] h-[54px] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none"
        style={{
          background: isOpen ? '#b09220' : '#c9a84c',
          color: '#090f1e',
          boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
        }}
        aria-label="Toggle Reader Controls"
      >
        {isOpen ? (
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        )}
      </button>
    </div>
  );
}
