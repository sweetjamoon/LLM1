import type { CSSProperties } from 'react';
import type { Palette, World } from '../types';
import { SceneControls } from './SceneControls';

type HeroCanvasProps = {
  palette: Palette;
  world: World;
  selectedSceneIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectScene: (index: number) => void;
  onCopyPalette: () => void;
  onCopyPrompt: () => void;
  onFavorite: () => void;
};

function getPaletteOverlay(colors: string[]): CSSProperties {
  return {
    background: `
      linear-gradient(135deg, ${colors[1]}80, ${colors[3]}68),
      radial-gradient(circle at 18% 16%, ${colors[0]}88, transparent 34%),
      radial-gradient(circle at 78% 72%, ${colors[2]}72, transparent 42%),
      radial-gradient(circle at 55% 36%, ${colors[4]}30, transparent 48%)
    `,
  };
}

export function HeroCanvas({
  palette,
  world,
  selectedSceneIndex,
  onPrevious,
  onNext,
  onSelectScene,
  onCopyPalette,
  onCopyPrompt,
  onFavorite,
}: HeroCanvasProps) {
  const scene = world.scenes[selectedSceneIndex];

  return (
    <section className="min-w-0" aria-label="Dynamic hero canvas">
      <div className="mb-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-moss">Palette experience</p>
        <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-wide text-ink sm:text-6xl lg:text-7xl">
          Walk through a color mood.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/64">
          Choose a palette and an image world, then navigate static scenes with a layered color treatment. Built as a v0
          canvas that can later host video, parallax, or cinemagraph scenes.
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-ink shadow-soft sm:rounded-[2.8rem]"
        style={{ boxShadow: `0 30px 90px ${palette.colors[4]}22` }}
      >
        <div className="aspect-[4/5] min-h-[34rem] sm:aspect-[16/10] lg:aspect-[16/11] xl:aspect-[16/10]">
          {/* Future motion support: render video/parallax/cinemagraph layers here based on scene.motionType and scene.videoUrl. */}
          <img
            key={scene.id}
            src={scene.imageUrl}
            alt={scene.alt}
            className="h-full w-full object-cover opacity-95 transition duration-500 ease-out"
            style={{ filter: 'saturate(1.07) contrast(0.97)' }}
          />
          <div className="absolute inset-0 mix-blend-soft-light" style={getPaletteOverlay(palette.colors)} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.30),transparent_28%),linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.34)_100%)]" />
        </div>

        <div className="absolute left-4 right-4 top-4 sm:left-6 sm:right-auto sm:top-6 sm:w-[24rem]">
          <div className="rounded-[1.7rem] border border-white/58 bg-white/68 p-4 text-ink shadow-lg backdrop-blur-2xl sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink/52">{world.name}</p>
                <h2 className="mt-1 font-display text-4xl leading-none text-ink">{scene.title}</h2>
              </div>
              <span className="rounded-full bg-ink/90 px-3 py-1.5 text-xs font-bold text-white">
                Scene {selectedSceneIndex + 1} / {world.scenes.length}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink/68">Palette: {palette.name}</p>
            <div className="mt-3 flex overflow-hidden rounded-full border border-white/80">
              {palette.colors.map((color) => (
                <span key={color} className="h-7 flex-1" style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <SceneControls
            scenes={world.scenes}
            selectedSceneIndex={selectedSceneIndex}
            onPrevious={onPrevious}
            onNext={onNext}
            onSelectScene={onSelectScene}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onCopyPalette}
          className="rounded-full border border-ink/10 bg-white/78 px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white"
        >
          Copy Palette
        </button>
        <button
          type="button"
          onClick={onCopyPrompt}
          className="rounded-full border border-ink/10 bg-white/78 px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white"
        >
          Copy Prompt
        </button>
        <button
          type="button"
          onClick={onFavorite}
          className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.01]"
        >
          Favorite Combo
        </button>
      </div>
    </section>
  );
}
