export type Palette = {
  id: string;
  name: string;
  colors: string[];
  mood: string[];
  description: string;
};

export type MotionType = 'static' | 'video' | 'parallax' | 'cinemagraph';

export type Scene = {
  id: string;
  title: string;
  imageUrl: string;
  alt: string;
  motionType: MotionType;
  videoUrl?: string;
};

export type World = {
  id: string;
  name: string;
  style: string;
  mood: string[];
  thumbnailUrl: string;
  scenes: Scene[];
};

export type FavoriteCombo = {
  paletteId: string;
  worldId: string;
  sceneId: string;
  timestamp: number;
};
