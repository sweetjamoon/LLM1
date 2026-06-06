import { useEffect, useMemo, useState } from 'react';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HeroCanvas } from './components/HeroCanvas';
import { Navbar } from './components/Navbar';
import { PalettePanel } from './components/PalettePanel';
import { Toast } from './components/Toast';
import { WorldPanel } from './components/WorldPanel';
import { palettes } from './data/palettes';
import { worlds } from './data/worlds';
import type { FavoriteCombo, Palette } from './types';

const FAVORITES_KEY = 'color-studio:favorites';

function readFavorites(): FavoriteCombo[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? (JSON.parse(stored) as FavoriteCombo[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: FavoriteCombo[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

async function copyText(value: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function paletteCopyText(palette: Palette) {
  return `${palette.name}: ${palette.colors.join(', ')}`;
}

function App() {
  const [selectedPaletteId, setSelectedPaletteId] = useState(palettes[0].id);
  const [selectedWorldId, setSelectedWorldId] = useState(worlds[0].id);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [favorites, setFavorites] = useState<FavoriteCombo[]>(() => readFavorites());
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const selectedPalette = useMemo(
    () => palettes.find((palette) => palette.id === selectedPaletteId) ?? palettes[0],
    [selectedPaletteId],
  );
  const selectedWorld = useMemo(() => worlds.find((world) => world.id === selectedWorldId) ?? worlds[0], [selectedWorldId]);
  const selectedScene = selectedWorld.scenes[selectedSceneIndex] ?? selectedWorld.scenes[0];

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const goToPreviousScene = () => {
    setSelectedSceneIndex((current) => (current === 0 ? selectedWorld.scenes.length - 1 : current - 1));
  };

  const goToNextScene = () => {
    setSelectedSceneIndex((current) => (current + 1) % selectedWorld.scenes.length);
  };

  const handleWorldSelect = (worldId: string) => {
    setSelectedWorldId(worldId);
    setSelectedSceneIndex(0);
  };

  const handleCopyPalette = async (palette = selectedPalette) => {
    await copyText(paletteCopyText(palette));
    showToast('Palette copied');
  };

  const handleCopyPrompt = async () => {
    await copyText(
      `Apply the ${selectedPalette.name} palette (${selectedPalette.colors.join(', ')}) to a ${selectedWorld.name} scene titled ${selectedScene.title}. Make it soft, atmospheric, cohesive, and mood-rich.`,
    );
    showToast('Prompt copied');
  };

  const handleFavorite = () => {
    const nextFavorites = [
      {
        paletteId: selectedPalette.id,
        worldId: selectedWorld.id,
        sceneId: selectedScene.id,
        timestamp: Date.now(),
      },
      ...favorites,
    ].slice(0, 24);
    setFavorites(nextFavorites);
    writeFavorites(nextFavorites);
    showToast('Combination saved');
  };

  const handleSurprise = () => {
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    const world = worlds[Math.floor(Math.random() * worlds.length)];
    const sceneIndex = Math.floor(Math.random() * world.scenes.length);
    setSelectedPaletteId(palette.id);
    setSelectedWorldId(world.id);
    setSelectedSceneIndex(sceneIndex);
    showToast('New color universe loaded');
  };

  const handleRestoreFavorite = (favorite: FavoriteCombo) => {
    const world = worlds.find((item) => item.id === favorite.worldId);
    const sceneIndex = world?.scenes.findIndex((scene) => scene.id === favorite.sceneId) ?? -1;

    setSelectedPaletteId(favorite.paletteId);
    setSelectedWorldId(favorite.worldId);
    setSelectedSceneIndex(sceneIndex >= 0 ? sceneIndex : 0);
    setIsFavoritesOpen(false);
    showToast('Favorite restored');
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    writeFavorites([]);
    showToast('Favorites cleared');
  };

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timeoutId = window.setTimeout(() => setToastMessage(''), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousScene();
      }
      if (event.key === 'ArrowRight') {
        goToNextScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWorld.scenes.length]);

  return (
    <div id="top" className="min-h-screen text-ink">
      <Navbar onSurprise={handleSurprise} onFavorites={() => setIsFavoritesOpen(true)} favoriteCount={favorites.length} />

      <main className="mx-auto grid max-w-[1800px] gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:grid-cols-[21rem_minmax(0,1fr)_21rem] xl:gap-8">
        <div className="order-2 xl:order-1">
          <PalettePanel
            palettes={palettes}
            selectedPaletteId={selectedPalette.id}
            onSelect={setSelectedPaletteId}
            onCopy={handleCopyPalette}
          />
        </div>

        <div className="order-1 xl:order-2">
          <HeroCanvas
            palette={selectedPalette}
            world={selectedWorld}
            selectedSceneIndex={selectedSceneIndex}
            onPrevious={goToPreviousScene}
            onNext={goToNextScene}
            onSelectScene={setSelectedSceneIndex}
            onCopyPalette={() => handleCopyPalette()}
            onCopyPrompt={handleCopyPrompt}
            onFavorite={handleFavorite}
          />
        </div>

        <div className="order-3">
          <WorldPanel worlds={worlds} selectedWorldId={selectedWorld.id} onSelect={handleWorldSelect} />
        </div>
      </main>

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={favorites}
        palettes={palettes}
        worlds={worlds}
        onClose={() => setIsFavoritesOpen(false)}
        onRestore={handleRestoreFavorite}
        onClear={handleClearFavorites}
      />
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
