import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { RegionSelectScreen } from './components/RegionSelectScreen';
import { ExplorationScreen } from './components/ExplorationScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NameInputScreen } from './components/NameInputScreen';
import { CharacterSelectScreen } from './components/CharacterSelectScreen';
import { TreasureVictoryScreen } from './components/TreasureVictoryScreen';
import { GameProvider, useGame, Character } from './components/GameContext';

type Screen = 'nameInput' | 'characterSelect' | 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings' | 'treasure';

function AppContent() {
  const { playerName, setPlayerName, getTotalProgress, fruitProgress, selectedCharacter, setSelectedCharacter } = useGame();
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    playerName && playerName !== 'Player' ? (selectedCharacter ? 'home' : 'characterSelect') : 'nameInput'
  );
  const [hasShownTreasure, setHasShownTreasure] = useState(false);

  // Check if all 50 fruits are collected
  useEffect(() => {
    const totalProgress = getTotalProgress();
    const allCollected = totalProgress === 100;
    
    if (allCollected && !hasShownTreasure && currentScreen !== 'treasure' && currentScreen !== 'nameInput' && currentScreen !== 'characterSelect') {
      setHasShownTreasure(true);
      setCurrentScreen('treasure');
    }
  }, [fruitProgress, getTotalProgress, hasShownTreasure, currentScreen]);

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setCurrentScreen('characterSelect');
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100">
      {currentScreen === 'nameInput' && (
        <NameInputScreen onNameSubmit={handleNameSubmit} />
      )}
      {currentScreen === 'characterSelect' && (
        <CharacterSelectScreen 
          onCharacterSelect={handleCharacterSelect}
          onBack={() => setCurrentScreen('nameInput')}
        />
      )}
      {currentScreen === 'home' && (
        <HomeScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'regionSelect' && (
        <RegionSelectScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'exploration' && (
        <ExplorationScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'progress' && (
        <ProgressScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'treasure' && (
        <TreasureVictoryScreen onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}