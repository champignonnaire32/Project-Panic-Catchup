import { useState, useEffect } from 'react';

export default function ReaderControls() {
  const [isOpen, setIsOpen] = useState(false);

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fontSize');
      return saved ? parseInt(saved, 10) : 18;
    }
    return 18;
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [fontSize, isDark]);

  return (
    <div className="fixed bottom-[24px] right-[24px] z-50 flex flex-col items-end gap-[12px]" style={{ fontSize: '16px' }}>
      {/* The Expandable Menu */}
      {isOpen && (
        <div
          className="border rounded-[10px] shadow-2xl p-[18px] flex flex-col gap-[16px] min-w-[210px] animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{
            background: '#101828',
            borderColor: '#1f2e47',
            boxShadow: '0 8px 40px rgba(9,15,30,0.7), 0 0 0 1px rgba(201,168,76,0.08)',
          }}
        >
          {/* Text Size Controls */}
          <div>
            <div
              className="text-[11px] leading-none font-bold uppercase tracking-[0.15em] mb-[10px]"
              style={{ color: '#9a8c77' }}
            >
              Text Size
            </div>
            <div
              className="flex items-center justify-between rounded-[6px] p-[4px]"
              style={{ background: '#090f1e' }}
            >
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

          {/* Theme Toggle */}
          <div>
            <div
              className="text-[11px] leading-none font-bold uppercase tracking-[0.15em] mb-[10px]"
              style={{ color: '#9a8c77' }}
            >
              Theme
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-full py-[9px] px-[12px] rounded-[6px] transition-colors flex items-center justify-between text-[13px] font-medium"
              style={{ background: '#090f1e', color: '#c8baa2' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1f2e47')}
              onMouseLeave={e => (e.currentTarget.style.background = '#090f1e')}
            >
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              {isDark ? (
                <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* The Floating Action Button — gold accent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[54px] h-[54px] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none"
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
