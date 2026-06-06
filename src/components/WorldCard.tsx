import type { World } from '../types';

type WorldCardProps = {
  world: World;
  isSelected: boolean;
  onSelect: (worldId: string) => void;
};

export function WorldCard({ world, isSelected, onSelect }: WorldCardProps) {
  return (
    <article
      className={`group min-w-[17rem] overflow-hidden rounded-[1.65rem] border bg-white/78 shadow-card transition duration-300 hover:-translate-y-1 hover:bg-white md:min-w-0 ${
        isSelected ? 'scale-[1.015] border-ink/35 ring-4 ring-ink/5' : 'border-ink/10'
      }`}
    >
      <button type="button" onClick={() => onSelect(world.id)} className="w-full text-left" aria-pressed={isSelected}>
        <div className="relative h-28 overflow-hidden">
          <img
            src={world.thumbnailUrl}
            alt={`${world.name} thumbnail`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/42 to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/82 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur-md">
            {world.scenes.length} scenes
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl text-ink">{world.name}</h3>
              <p className="mt-1 text-sm font-medium leading-5 text-ink/62">{world.style}</p>
            </div>
            <span className={`mt-1 h-3 w-3 rounded-full ${isSelected ? 'bg-ink' : 'bg-ink/16'}`} aria-hidden="true" />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {world.mood.map((tag) => (
              <span key={tag} className="rounded-full bg-ivory px-2.5 py-1 text-xs font-semibold text-ink/70">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>
    </article>
  );
}
