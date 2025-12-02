import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GAME_REGIONS } from './gameData';

export type QuizType = 'multiple-choice' | 'text-input' | 'jumbled-word';

export type Fruit = {
  id: string;
  name: string;
  emoji: string;
  region: string;
  position: { x: number; y: number };
  quiz: {
    type: QuizType;
    question: string;
    answer: string;
    options?: string[]; // for multiple choice
    jumbled?: string; // for jumbled word
    hint: string;
  };
  funFact: string;
};

export type Region = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  theme: string;
  color: string;
  bgGradient: string;
  fruits: Fruit[];
};

export type FruitProgress = {
  fruitId: string;
  collected: boolean;
  attempts: number;
  hintsUsed: number;
};

export type Character = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
};

type GameContextType = {
  regions: Region[];
  currentRegion: number | null;
  setCurrentRegion: (region: number | null) => void;
  selectedFruit: Fruit | null;
  setSelectedFruit: (fruit: Fruit | null) => void;
  fruitProgress: { [key: string]: FruitProgress };
  updateFruitProgress: (fruitId: string, updates: Partial<FruitProgress>) => void;
  collectFruit: (fruitId: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
  settings: {
    soundEffects: boolean;
    vibration: boolean;
    darkMode: boolean;
  };
  updateSettings: (settings: Partial<GameContextType['settings']>) => void;
  resetProgress: () => void;
  getTotalProgress: () => number;
  getRegionProgress: (regionId: number) => number;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<number | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  
  const [fruitProgress, setFruitProgress] = useState<{ [key: string]: FruitProgress }>(() => {
    const saved = localStorage.getItem('treasureHuntFruitProgress');
    if (saved) {
      return JSON.parse(saved);
    }
    const initial: { [key: string]: FruitProgress } = {};
    GAME_REGIONS.forEach(region => {
      region.fruits.forEach(fruit => {
        initial[fruit.id] = {
          fruitId: fruit.id,
          collected: false,
          attempts: 0,
          hintsUsed: 0,
        };
      });
    });
    return initial;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gameSettings');
    return saved ? JSON.parse(saved) : {
      soundEffects: true,
      vibration: true,
      darkMode: false,
    };
  });

  const [playerName, setPlayerName] = useState(() => {
    const saved = localStorage.getItem('playerName');
    return saved ? saved : 'Player';
  });

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    localStorage.setItem('treasureHuntFruitProgress', JSON.stringify(fruitProgress));
  }, [fruitProgress]);

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('playerName', playerName);
  }, [playerName]);

  const updateFruitProgress = (fruitId: string, updates: Partial<FruitProgress>) => {
    setFruitProgress(prev => ({
      ...prev,
      [fruitId]: { ...prev[fruitId], ...updates }
    }));
  };

  const collectFruit = (fruitId: string) => {
    updateFruitProgress(fruitId, { collected: true });
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetProgress = () => {
    const initial: { [key: string]: FruitProgress } = {};
    GAME_REGIONS.forEach(region => {
      region.fruits.forEach(fruit => {
        initial[fruit.id] = {
          fruitId: fruit.id,
          collected: false,
          attempts: 0,
          hintsUsed: 0,
        };
      });
    });
    setFruitProgress(initial);
    localStorage.removeItem('treasureHuntFruitProgress');
  };

  const getTotalProgress = () => {
    const totalFruits = 50;
    const collected = Object.values(fruitProgress).filter(f => f.collected).length;
    return Math.round((collected / totalFruits) * 100);
  };

  const getRegionProgress = (regionId: number) => {
    const region = GAME_REGIONS.find(r => r.id === regionId);
    if (!region) return 0;
    const collected = region.fruits.filter(f => fruitProgress[f.id]?.collected).length;
    return Math.round((collected / region.fruits.length) * 100);
  };

  return (
    <GameContext.Provider
      value={{
        regions: GAME_REGIONS,
        currentRegion,
        setCurrentRegion,
        selectedFruit,
        setSelectedFruit,
        fruitProgress,
        updateFruitProgress,
        collectFruit,
        playerName,
        setPlayerName,
        selectedCharacter,
        setSelectedCharacter,
        settings,
        updateSettings,
        resetProgress,
        getTotalProgress,
        getRegionProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

export { GAME_REGIONS };