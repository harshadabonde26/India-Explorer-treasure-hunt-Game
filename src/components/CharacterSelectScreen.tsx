import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useGame } from './GameContext';
import { useSoundEffects, BackgroundMusic } from './useSoundEffects';
import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

type Character = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
};

const characters: Character[] = [
  {
    id: 'maya',
    name: 'Maya',
    emoji: '👧🏻',
    description: 'Brave explorer from North India with a backpack full of tools!',
    color: 'from-pink-400 to-purple-400'
  },
  {
    id: 'arjun',
    name: 'Arjun',
    emoji: '👦🏽',
    description: 'Smart adventurer from Punjab who loves solving puzzles!',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'priya',
    name: 'Priya',
    emoji: '👧🏾',
    description: 'Quick thinker from South India who finds treasure everywhere!',
    color: 'from-green-400 to-emerald-400'
  },
  {
    id: 'rohan',
    name: 'Rohan',
    emoji: '👦🏽',
    description: 'Clever explorer from Maharashtra who never gives up!',
    color: 'from-amber-400 to-orange-400'
  }
];

type CharacterSelectScreenProps = {
  onCharacterSelect: (character: Character) => void;
  onBack: () => void;
};

export function CharacterSelectScreen({ onCharacterSelect, onBack }: CharacterSelectScreenProps) {
  const { playSound } = useSoundEffects();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
    playSound('click');
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      playSound('success');
      onCharacterSelect(selectedCharacter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100">
      <BackgroundMusic track="menu" volume={0.3} />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 shadow-lg border-b-4 border-purple-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => {
                playSound('click');
                onBack();
              }}
              variant="ghost"
              className="text-white hover:bg-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h2 className="text-white">Choose Your Explorer!</h2>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-purple-800 mb-2">Who Will Find The Treasure?</h1>
            <p className="text-purple-600">Pick your favorite explorer to start the adventure!</p>
          </motion.div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleSelect(character)}
                  className={`w-full p-6 rounded-3xl border-4 transition-all transform hover:scale-105 ${
                    selectedCharacter?.id === character.id
                      ? 'border-yellow-400 bg-gradient-to-br ' + character.color + ' shadow-2xl scale-105'
                      : 'border-purple-300 bg-white hover:border-purple-400 shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    {/* Character Icon */}
                    <motion.div
                      animate={
                        selectedCharacter?.id === character.id
                          ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                      className="text-8xl mb-4 relative inline-block"
                    >
                      {character.emoji}
                      {selectedCharacter?.id === character.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 border-4 border-white shadow-lg"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Character Info */}
                    <h3 className={`mb-2 ${
                      selectedCharacter?.id === character.id ? 'text-white' : 'text-purple-800'
                    }`}>
                      {character.name}
                    </h3>
                    <p className={`text-sm ${
                      selectedCharacter?.id === character.id ? 'text-white' : 'text-purple-600'
                    }`}>
                      {character.description}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Confirm Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedCharacter ? 1 : 0.5 }}
            className="text-center"
          >
            <Button
              onClick={handleConfirm}
              disabled={!selectedCharacter}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Adventure with {selectedCharacter?.name || '...'}! 🚀
            </Button>
          </motion.div>

          {/* Preview Section */}
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-3xl p-6 border-4 border-purple-300 shadow-xl"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedCharacter.emoji}🎒</div>
                <h3 className="text-purple-800 mb-2">
                  Get Ready, {selectedCharacter.name}!
                </h3>
                <p className="text-purple-600">
                  Your mission: Collect 50 magical fruits across 4 amazing regions!
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="bg-green-100 rounded-full px-4 py-2 border-2 border-green-300">
                    <span className="text-green-700">🌴 Jungle Village</span>
                  </div>
                  <div className="bg-yellow-100 rounded-full px-4 py-2 border-2 border-yellow-300">
                    <span className="text-yellow-700">🏜️ Desert Ruins</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-center gap-4">
                  <div className="bg-blue-100 rounded-full px-4 py-2 border-2 border-blue-300">
                    <span className="text-blue-700">⛰️ Snowy Mountain</span>
                  </div>
                  <div className="bg-cyan-100 rounded-full px-4 py-2 border-2 border-cyan-300">
                    <span className="text-cyan-700">🏝️ Island Harbor</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}