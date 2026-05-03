export default function TopButton() {
  return (
    <div className="fixed bottom-[25px] left-[25px] z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 px-4 py-3 bg-ink-800 border border-ink-600 text-cream-300 rounded-full shadow-lg transition-all duration-300 hover:border-gold-400 hover:text-gold-400 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Navigate up"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-sm font-bold tracking-wider uppercase">Up</span>
      </button>
    </div>
  );
}
