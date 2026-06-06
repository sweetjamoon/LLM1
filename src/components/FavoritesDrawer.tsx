import type { FavoriteCombo, Palette, World } from '../types';

type FavoritesDrawerProps = {
  isOpen: boolean;
  favorites: FavoriteCombo[];
  palettes: Palette[];
  worlds: World[];
  onClose: () => void;
  onRestore: (favorite: FavoriteCombo) => void;
  onClear: () => void;
};

export function FavoritesDrawer({ isOpen, favorites, palettes, worlds, onClose, onRestore, onClear }: FavoritesDrawerProps) {
  const getDetails = (favorite: FavoriteCombo) => {
    const palette = palettes.find((item) => item.id === favorite.paletteId);
    const world = worlds.find((item) => item.id === favorite.worldId);
    const scene = world?.scenes.find((item) => item.id === favorite.sceneId);
    return { palette, world, scene };
  };

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className={`absolute inset-0 bg-ink/28 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-label="Close favorites drawer"
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-paper p-6 shadow-soft transition duration-300 sm:p-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Saved favorite combinations"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-moss">Favorites</p>
            <h2 className="font-display text-5xl text-ink">Saved worlds</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink">
            Close
          </button>
        </div>

        {favorites.length > 0 ? (
          <button type="button" onClick={onClear} className="mt-5 text-sm font-bold text-ink/62 underline underline-offset-4">
            Clear all favorites
          </button>
        ) : null}

        <div className="mt-6 space-y-4">
          {favorites.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-ink/18 bg-white/60 p-6 text-center">
              <p className="font-display text-3xl text-ink">No saved combinations yet.</p>
              <p className="mt-2 text-sm leading-6 text-ink/62">Favorite a palette, world, and scene to revisit that color universe.</p>
            </div>
          ) : (
            favorites.map((favorite) => {
              const { palette, world, scene } = getDetails(favorite);
              if (!palette || !world || !scene) return null;

              return (
                <button
                  key={`${favorite.paletteId}-${favorite.worldId}-${favorite.sceneId}-${favorite.timestamp}`}
                  type="button"
                  onClick={() => onRestore(favorite)}
                  className="w-full rounded-[1.6rem] border border-ink/10 bg-white/72 p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex gap-4">
                    <img src={scene.imageUrl} alt={scene.alt} className="h-20 w-24 rounded-2xl object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{palette.name}</p>
                      <h3 className="font-display text-2xl leading-none text-ink">{world.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-ink/60">{scene.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex overflow-hidden rounded-full">
                    {palette.colors.map((color) => (
                      <span key={color} className="h-6 flex-1" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
}
