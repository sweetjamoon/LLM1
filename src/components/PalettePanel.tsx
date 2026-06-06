import type { Palette } from '../types';
import { PaletteCard } from './PaletteCard';

type PalettePanelProps = {
  palettes: Palette[];
  selectedPaletteId: string;
  onSelect: (paletteId: string) => void;
  onCopy: (palette: Palette) => void;
};

export function PalettePanel({ palettes, selectedPaletteId, onSelect, onCopy }: PalettePanelProps) {
  return (
    <aside className="min-w-0">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-moss">Palettes</p>
          <h2 className="font-display text-3xl text-ink">Mood library</h2>
        </div>
        <span className="text-sm font-medium text-ink/50">{palettes.length}</span>
      </div>
      <div className="scrollbar-studio no-scrollbar flex gap-4 overflow-x-auto pb-4 md:max-h-[calc(100vh-11rem)] md:flex-col md:overflow-y-auto md:pr-2">
        {palettes.map((palette) => (
          <PaletteCard
            key={palette.id}
            palette={palette}
            isSelected={palette.id === selectedPaletteId}
            onSelect={onSelect}
            onCopy={onCopy}
          />
        ))}
      </div>
    </aside>
  );
}
