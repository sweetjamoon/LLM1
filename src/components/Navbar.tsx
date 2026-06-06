type NavbarProps = {
  onSurprise: () => void;
  onFavorites: () => void;
  favoriteCount: number;
};

export function Navbar({ onSurprise, onFavorites, favoriteCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-end gap-3">
          <a href="#top" className="font-display text-3xl tracking-wide text-ink sm:text-4xl" aria-label="Color Studio home">
            Color Studio
          </a>
          <span className="hidden pb-1 text-xs font-semibold uppercase tracking-[0.28em] text-moss sm:inline">
            Palette Worlds
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSurprise}
            className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white"
          >
            Surprise Me
          </button>
          <button
            type="button"
            onClick={onFavorites}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Favorites{favoriteCount > 0 ? ` · ${favoriteCount}` : ''}
          </button>
        </div>
      </nav>
    </header>
  );
}
