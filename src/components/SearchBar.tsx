import { useState, useMemo, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';

export interface SearchItem {
  type: 'Series' | 'Book';
  title: string;
  subtitle?: string;
  url: string;
}

interface SearchBarProps {
  searchData: SearchItem[];
}

export default function SearchBar({ searchData }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'subtitle'],
    threshold: 0.3,
    ignoreLocation: true,
  }), [searchData]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 5).map(result => result.item);
  }, [query, fuse]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mb-12">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-cream-500 dark:text-cream-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-4 bg-cream-50 dark:bg-ink-800 border border-cream-300 dark:border-ink-700 text-cream-900 dark:text-cream-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 dark:focus:ring-gold-400/40 dark:focus:border-gold-400 transition-all placeholder-cream-500 dark:placeholder-cream-500 text-base font-body"
          placeholder="Search by series or book title..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.trim() && (
        <div className="absolute z-50 w-full mt-2 bg-cream-50 dark:bg-ink-800 border border-cream-300 dark:border-ink-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ boxShadow: '0 8px 40px rgba(9,15,30,0.5), 0 0 0 1px rgba(201,168,76,0.06)' }}
        >
          {results.length > 0 ? (
            <ul className="divide-y divide-cream-200 dark:divide-ink-700">
              {results.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    className="flex items-center justify-between px-6 py-4 hover:bg-cream-100 dark:hover:bg-ink-700 transition-colors group gap-4"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-cream-500 dark:text-cream-500 mb-0.5">
                        {item.type}
                      </div>
                      <div className="text-base font-bold font-display text-cream-900 dark:text-cream-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs text-cream-500 dark:text-cream-500 mt-0.5 truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-cream-400 dark:text-cream-600 group-hover:text-gold-400 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-8 text-center text-cream-500 dark:text-cream-500">
              No archives found for "<span className="font-semibold text-cream-900 dark:text-cream-200">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
