import type { Palette } from '../types';

type PaletteCardProps = {
  palette: Palette;
  isSelected: boolean;
  onSelect: (paletteId: string) => void;
  onCopy: (palette: Palette) => void;
};

export function PaletteCard({ palette, isSelected, onSelect, onCopy }: PaletteCardProps) {
  return (
    <article
      className={`group min-w-[18rem] rounded-[1.65rem] border bg-white/76 p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:bg-white md:min-w-0 ${
        isSelected ? 'scale-[1.015] border-ink/35 ring-4 ring-ink/5' : 'border-ink/10'
      }`}
      style={{ boxShadow: isSelected ? `0 20px 54px ${palette.colors[2]}28` : undefined }}
    >
      <button type="button" onClick={() => onSelect(palette.id)} className="w-full text-left" aria-pressed={isSelected}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ink">{palette.name}</h3>
            <p className="mt-1 text-sm leading-5 text-ink/66">{palette.description}</p>
          </div>
          <span
            className={`mt-1 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] ${
              isSelected ? 'bg-ink text-white' : 'bg-ink/5 text-ink/55'
            }`}
          >
            {isSelected ? 'Active' : 'View'}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-5 overflow-hidden rounded-2xl border border-white/80 shadow-inner">
          {palette.colors.map((color) => (
            <span key={color} className="h-12" style={{ backgroundColor: color }} title={color} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {palette.mood.map((tag) => (
            <span key={tag} className="rounded-full bg-ivory px-2.5 py-1 text-xs font-semibold text-ink/70">
              {tag}
            </span>
          ))}
        </div>
      </button>
      <button
        type="button"
        onClick={() => onCopy(palette)}
        className="mt-4 w-full rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:scale-[1.01] hover:bg-ivory"
      >
        Copy hex
      </button>
    </article>
  );
}
