import { useState, useEffect } from 'react';
import { Trophy, Star, Sparkles, Award, Crown, Gift, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useGame } from './GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { useSoundEffects, BackgroundMusic } from './useSoundEffects';

type TreasureVictoryScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings') => void;
};

export function TreasureVictoryScreen({ onNavigate }: TreasureVictoryScreenProps) {
  const { playerName, selectedCharacter } = useGame();
  const [chestOpen, setChestOpen] = useState(false);
  const characterEmoji = selectedCharacter?.emoji || '👧🏻';
  const characterName = selectedCharacter?.name || 'Maya';
  const { playSound } = useSoundEffects();
  const [showTreasure, setShowTreasure] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [showJewelry, setShowJewelry] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<number[]>([]);

  useEffect(() => {
    // Celebration sequence
    playSound('achievement');
    
    // Show treasure chest
    setTimeout(() => {
      setShowTreasure(true);
      playSound('success');
    }, 500);

    // Open chest and show coins
    setTimeout(() => {
      setShowCoins(true);
      playSound('collect');
    }, 2000);

    // Show jewelry
    setTimeout(() => {
      setShowJewelry(true);
      playSound('collect');
    }, 3000);

    // Generate confetti
    setTimeout(() => {
      setConfettiPieces(Array.from({ length: 50 }, (_, i) => i));
    }, 1500);
  }, []);

  // Generate floating coins
  const floatingCoins = Array.from({ length: 20 }, (_, i) => i);
  const gems = ['💎', '💍', '👑', '📿', '⭐', '🌟'];
  const coinEmojis = ['🪙', '💰', '🏆'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-400 via-amber-300 to-orange-400 relative overflow-hidden">
      {/* Background Music */}
      <BackgroundMusic track="victory" volume={0.4} />

      {/* Confetti */}
      <AnimatePresence>
        {confettiPieces.map((i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -100, 
              x: Math.random() * window.innerWidth,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: Math.random() * 720 - 360,
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute z-10 text-3xl"
            style={{
              left: Math.random() * 100 + '%'
            }}
          >
            {['🎉', '🎊', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          {/* Victory Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-9xl mb-4"
            >
              🏆
            </motion.div>
            
            <h1 className="text-white drop-shadow-2xl mb-2">
              Congratulations, {playerName}!
            </h1>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <h2 className="text-white drop-shadow-lg">
                🎊 You Found The Ultimate Treasure!
              </h2>
            </motion.div>

            <p className="text-yellow-100 mt-4 text-xl">
              All 50 Magical Fruits Collected! 🍎🍊🍇
            </p>
          </motion.div>

          {/* Treasure Chest */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotateY: 0 }}
              animate={showTreasure ? { 
                scale: 1, 
                rotateY: 0 
              } : {}}
              transition={{ 
                type: "spring", 
                damping: 10,
                delay: 0.5 
              }}
              className="relative z-30"
            >
              <div className="bg-gradient-to-br from-amber-800 via-yellow-700 to-amber-900 rounded-3xl p-8 shadow-2xl border-8 border-yellow-500 relative overflow-hidden">
                {/* Treasure chest lid */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={showCoins ? { rotateX: -45, y: -20 } : {}}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-700 to-amber-800 border-b-4 border-yellow-600 rounded-t-2xl"
                  style={{ transformOrigin: 'bottom' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown className="w-12 h-12 text-yellow-300" />
                  </div>
                </motion.div>

                {/* Treasure contents */}
                <div className="pt-20 min-h-[400px] relative">
                  {/* Glow effect */}
                  <AnimatePresence>
                    {showCoins && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-yellow-300 via-amber-200 to-transparent blur-2xl"
                      />
                    )}
                  </AnimatePresence>

                  {/* Coins explosion */}
                  <AnimatePresence>
                    {showCoins && floatingCoins.map((i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{ 
                          x: (Math.random() - 0.5) * 400,
                          y: -100 - Math.random() * 200,
                          scale: [0, 1.5, 1],
                          opacity: [0, 1, 1],
                          rotate: Math.random() * 720
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: Math.random() * 0.5
                        }}
                        className="absolute left-1/2 top-1/2 text-6xl z-40"
                      >
                        {coinEmojis[Math.floor(Math.random() * coinEmojis.length)]}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Jewelry */}
                  <AnimatePresence>
                    {showJewelry && gems.map((gem, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          scale: 0,
                          rotate: 0,
                          y: 200
                        }}
                        animate={{ 
                          scale: [0, 1.3, 1],
                          rotate: [0, 360, 720],
                          y: 0
                        }}
                        transition={{ 
                          duration: 1,
                          delay: i * 0.1,
                          type: "spring"
                        }}
                        className="absolute text-7xl z-50"
                        style={{
                          left: `${15 + (i % 3) * 30}%`,
                          top: `${30 + Math.floor(i / 3) * 35}%`
                        }}
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          {gem}
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Pile of treasure at bottom */}
                  <AnimatePresence>
                    {showCoins && (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 text-6xl pb-4"
                      >
                        <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>🪙</motion.span>
                        <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>💰</motion.span>
                        <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🪙</motion.span>
                        <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>💎</motion.span>
                        <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}>🪙</motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sparkles around chest */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                    className="absolute text-4xl"
                    style={{
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${i < 4 ? -10 : 110}%`,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating achievement badges */}
            <div className="absolute -top-20 -left-20 z-20">
              <motion.div
                animate={{ 
                  rotate: 360,
                  y: [0, -20, 0]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity }
                }}
                className="text-8xl"
              >
                🌟
              </motion.div>
            </div>

            <div className="absolute -top-16 -right-16 z-20">
              <motion.div
                animate={{ 
                  rotate: -360,
                  y: [0, -15, 0]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  y: { duration: 2.5, repeat: Infinity }
                }}
                className="text-7xl"
              >
                ⭐
              </motion.div>
            </div>

            <div className="absolute -bottom-10 -left-16 z-20">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
                className="text-6xl"
              >
                💫
              </motion.div>
            </div>
          </div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-xl border-4 border-green-400">
              <div className="text-5xl mb-2">🍎</div>
              <div className="text-green-700">50 Fruits</div>
              <div className="text-green-600">Collected!</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-xl border-4 border-purple-400">
              <div className="text-5xl mb-2">🗺️</div>
              <div className="text-purple-700">4 Regions</div>
              <div className="text-purple-600">Explored!</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-xl border-4 border-yellow-400">
              <div className="text-5xl mb-2">🧠</div>
              <div className="text-amber-700">50 Quizzes</div>
              <div className="text-amber-600">Mastered!</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <Button
              onClick={() => {
                playSound('click');
                onNavigate('home');
              }}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-2xl border-4 border-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
            <Button
              onClick={() => {
                playSound('click');
                onNavigate('progress');
              }}
              size="lg"
              variant="outline"
              className="bg-white border-4 border-purple-400 text-purple-700 hover:bg-purple-50 shadow-2xl"
            >
              <Trophy className="w-5 h-5 mr-2" />
              View Collection
            </Button>
          </motion.div>

          {/* Master Explorer Title */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 4.5,
              type: "spring",
              damping: 10
            }}
            className="mt-8 text-center"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-full px-8 py-4 inline-block shadow-2xl border-4 border-white">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-amber-900" />
                <span className="text-amber-900">
                  🎖️ Master Fruit Explorer 🎖️
                </span>
                <Crown className="w-8 h-8 text-amber-900" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Sparkles */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            className="absolute text-3xl"
            style={{
              left: `${i * 5}%`,
              bottom: 0
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </div>
  );
}