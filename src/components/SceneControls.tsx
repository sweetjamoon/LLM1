import type { Scene } from '../types';

type SceneControlsProps = {
  scenes: Scene[];
  selectedSceneIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectScene: (index: number) => void;
};

export function SceneControls({ scenes, selectedSceneIndex, onPrevious, onNext, onSelectScene }: SceneControlsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/55 bg-white/62 p-3 shadow-lg backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
          aria-label="Previous scene"
        >
          Previous
        </button>
        <span className="min-w-16 text-center text-sm font-bold text-ink/72">
          {selectedSceneIndex + 1} / {scenes.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
          aria-label="Next scene"
        >
          Next
        </button>
      </div>
      <div className="flex items-center justify-center gap-2" aria-label="Scene selector">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => onSelectScene(index)}
            className={`h-10 w-12 overflow-hidden rounded-full border transition hover:scale-105 ${
              index === selectedSceneIndex ? 'border-ink p-0.5' : 'border-white/70 opacity-72'
            }`}
            aria-label={`Go to scene ${index + 1}: ${scene.title}`}
            aria-current={index === selectedSceneIndex ? 'true' : undefined}
          >
            <img src={scene.imageUrl} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
