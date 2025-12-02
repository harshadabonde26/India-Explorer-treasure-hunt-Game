import { Compass, Map, Trophy, Settings, Sparkles, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useGame } from './GameContext';
import { useSoundEffects, BackgroundMusic } from './useSoundEffects';

type HomeScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings' | 'treasure') => void;
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { playerName, getTotalProgress, selectedCharacter } = useGame();
  const { playSound } = useSoundEffects();
  const totalProgress = getTotalProgress();
  const hasCompletedGame = totalProgress === 100;
  
  const characterEmoji = selectedCharacter?.emoji || '👧';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
      {/* Background Music */}
      <BackgroundMusic track="menu" volume={0.3} />
      
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 text-8xl"
        >
          🌴
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 text-6xl"
        >
          🏔️
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-7xl"
        >
          🏝️
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 right-10 text-8xl"
        >
          🏛️
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Character illustration */}
        <div className="mb-8 text-center">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block relative"
          >
            <div className="text-9xl">{characterEmoji}</div>
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-4xl"
            >
              🎒
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2"
          >
            <h1 className="text-6xl mb-2">Treasure Hunt</h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-amber-800 mb-1"
          >
            Fruit Explorer Adventure
          </motion.p>
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <Sparkles className="w-4 h-4" />
            <span>with {selectedCharacter?.name || 'Maya'}</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Story intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 mb-6 border-4 border-amber-300 shadow-lg"
        >
          <div className="text-center mb-4">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white mb-3">
              <span>👋 Welcome, {playerName}!</span>
            </div>
          </div>
          <p className="text-amber-900 text-center mb-4">
            Join {selectedCharacter?.name || 'Maya'} on an educational adventure! Explore 4 magical regions, 
            collect 50 unique fruits, and learn fascinating facts about each one! 🗺️✨
          </p>
          <div className="grid grid-cols-4 gap-2 text-4xl justify-items-center">
            <div title="Jungle">🌴</div>
            <div title="Desert">🏜️</div>
            <div title="Mountain">⛰️</div>
            <div title="Island">⚓</div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={() => {
              playSound('click');
              onNavigate('regionSelect');
            }}
            className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-xl shadow-lg border-4 border-emerald-400 transition-all hover:scale-105"
          >
            <Map className="w-6 h-6 mr-3" />
            <span>Start Adventure</span>
          </Button>

          <Button
            onClick={() => {
              playSound('click');
              onNavigate('progress');
            }}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 text-white rounded-xl shadow-lg border-4 border-purple-400 transition-all hover:scale-105"
          >
            <Trophy className="w-5 h-5 mr-3" />
            <span>Your Collection</span>
          </Button>

          <Button
            onClick={() => {
              playSound('click');
              onNavigate('settings');
            }}
            className="w-full h-14 bg-gradient-to-r from-slate-600 to-gray-500 hover:from-slate-700 hover:to-gray-600 text-white rounded-xl shadow-lg border-4 border-slate-400 transition-all hover:scale-105"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </Button>

          {hasCompletedGame && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.8 }}
            >
              <Button
                onClick={() => {
                  playSound('achievement');
                  onNavigate('treasure');
                }}
                className="w-full h-16 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-600 hover:via-amber-500 hover:to-yellow-600 text-amber-900 rounded-xl shadow-2xl border-4 border-yellow-300 transition-all hover:scale-105 animate-pulse"
              >
                <Crown className="w-6 h-6 mr-3" />
                <span>🏆 View Your Treasure! 🏆</span>
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-6 text-amber-700 space-y-1"
        >
          <p>🍎 50 Fruits to Discover 🥭</p>
          <p>🌍 4 Amazing Regions 🏆</p>
          <p>🎓 Educational & Fun! ✨</p>
        </motion.div>
      </div>
    </div>
  );
}