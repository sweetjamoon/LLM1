import type { World } from '../types';
import { WorldCard } from './WorldCard';

type WorldPanelProps = {
  worlds: World[];
  selectedWorldId: string;
  onSelect: (worldId: string) => void;
};

export function WorldPanel({ worlds, selectedWorldId, onSelect }: WorldPanelProps) {
  return (
    <aside className="min-w-0">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-moss">Image worlds</p>
          <h2 className="font-display text-3xl text-ink">Scene atlas</h2>
        </div>
        <span className="text-sm font-medium text-ink/50">{worlds.length}</span>
      </div>
      <div className="scrollbar-studio no-scrollbar flex gap-4 overflow-x-auto pb-4 md:max-h-[calc(100vh-11rem)] md:flex-col md:overflow-y-auto md:pr-2">
        {worlds.map((world) => (
          <WorldCard key={world.id} world={world} isSelected={world.id === selectedWorldId} onSelect={onSelect} />
        ))}
      </div>
    </aside>
  );
}
