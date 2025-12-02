import { useState, useEffect } from 'react';
import { ArrowLeft, Info, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { useGame, Fruit } from './GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { QuizModal } from './QuizModal';
import { Progress } from './ui/progress';
import { useSoundEffects, BackgroundMusic } from './useSoundEffects';

type ExplorationScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings') => void;
};

export function ExplorationScreen({ onNavigate }: ExplorationScreenProps) {
  const { regions, currentRegion, selectedFruit, setSelectedFruit, fruitProgress, getRegionProgress, selectedCharacter } = useGame();
  const { playSound } = useSoundEffects();
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 80 });
  const [characterMoving, setCharacterMoving] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const region = regions.find(r => r.id === currentRegion);
  const characterEmoji = selectedCharacter?.emoji || '👧🏻';
  const characterName = selectedCharacter?.name || 'Maya';

  if (!region) {
    return null;
  }

  const handleFruitClick = (fruit: Fruit) => {
    if (fruitProgress[fruit.id]?.collected) {
      return; // Already collected
    }

    playSound('click');
    setSelectedFruit(fruit);
    setCharacterMoving(true);

    // Play walking sounds while moving
    const walkInterval = setInterval(() => {
      playSound('walk');
    }, 200);

    // Animate character moving to fruit
    setTimeout(() => {
      setCharacterPosition(fruit.position);
      setTimeout(() => {
        clearInterval(walkInterval);
        setCharacterMoving(false);
        playSound('quiz_open');
        setShowQuiz(true);
      }, 800);
    }, 100);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
    setSelectedFruit(null);
  };

  const progress = getRegionProgress(region.id);
  const collectedCount = region.fruits.filter(f => fruitProgress[f.id]?.collected).length;

  // Play complete sound when region is finished
  useEffect(() => {
    if (collectedCount === region.fruits.length && collectedCount > 0) {
      playSound('complete');
    }
  }, [collectedCount, region.fruits.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Music */}
      <BackgroundMusic track="exploration" volume={0.25} />
      
      {/* Header */}
      <div className={`bg-gradient-to-r ${region.bgGradient} p-4 shadow-lg border-b-4 border-white/50`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={() => {
                playSound('click');
                onNavigate('regionSelect');
              }}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Regions
            </Button>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                <span className="text-4xl">{region.theme}</span>
                <h2 className="text-white">{region.displayName}</h2>
              </div>
            </div>
            <div className="w-24" />
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">Region Progress</span>
              <span className="text-white">{collectedCount}/{region.fruits.length} Fruits</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className={`flex-1 relative overflow-hidden bg-gradient-to-br ${region.bgGradient}`}>
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-20">
          {region.name === 'jungle' && (
            <>
              <div className="absolute top-0 left-10 text-8xl">🌴</div>
              <div className="absolute top-20 right-10 text-7xl">🌺</div>
              <div className="absolute bottom-10 left-1/4 text-6xl">🦜</div>
              <div className="absolute top-1/3 right-1/4 text-9xl">🍃</div>
            </>
          )}
          {region.name === 'desert' && (
            <>
              <div className="absolute top-10 left-20 text-8xl">🏛️</div>
              <div className="absolute top-1/3 right-20 text-7xl">🌵</div>
              <div className="absolute bottom-20 left-1/3 text-6xl">🐪</div>
              <div className="absolute top-20 right-1/3 text-9xl">☀️</div>
            </>
          )}
          {region.name === 'mountain' && (
            <>
              <div className="absolute top-5 left-10 text-8xl">🏔️</div>
              <div className="absolute top-1/4 right-10 text-7xl">❄️</div>
              <div className="absolute bottom-10 left-20 text-6xl">🌲</div>
              <div className="absolute top-1/2 right-1/4 text-9xl">☁️</div>
            </>
          )}
          {region.name === 'island' && (
            <>
              <div className="absolute top-10 left-10 text-8xl">🏝️</div>
              <div className="absolute top-1/4 right-20 text-7xl">⛵</div>
              <div className="absolute bottom-10 left-1/3 text-6xl">🐚</div>
              <div className="absolute top-1/3 right-10 text-9xl">🌊</div>
            </>
          )}
        </div>

        {/* Fruits */}
        {region.fruits.map((fruit, index) => {
          const isCollected = fruitProgress[fruit.id]?.collected;
          const isSelected = selectedFruit?.id === fruit.id;

          return (
            <motion.button
              key={fruit.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isCollected ? 0 : 1, 
                opacity: isCollected ? 0 : 1,
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleFruitClick(fruit)}
              disabled={isCollected || characterMoving}
              className={`
                absolute z-10
                transform -translate-x-1/2 -translate-y-1/2
                ${!isCollected && !characterMoving ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                transition-all duration-300
              `}
              style={{
                left: `${fruit.position.x}%`,
                top: `${fruit.position.y}%`,
              }}
            >
              {!isCollected && (
                <div className="relative">
                  {/* Sparkle effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 -m-4"
                  >
                    <div className="text-yellow-300 text-4xl">✨</div>
                  </motion.div>

                  {/* Fruit */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    className="relative"
                  >
                    <div className={`
                      text-6xl drop-shadow-2xl
                      ${isSelected ? 'ring-4 ring-white rounded-full' : ''}
                    `}>
                      {fruit.emoji}
                    </div>
                  </motion.div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 -m-8 bg-yellow-200 rounded-full blur-xl opacity-50 animate-pulse" />
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Character */}
        <motion.div
          animate={{
            left: `${characterPosition.x}%`,
            top: `${characterPosition.y}%`,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <motion.div
              animate={characterMoving ? { 
                rotateY: [0, 10, -10, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: characterMoving ? Infinity : 0 }}
              className="text-7xl drop-shadow-2xl"
            >
              {characterEmoji}
            </motion.div>
            <div className="absolute -top-2 -right-2 text-3xl">🎒</div>
            
            {/* Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm" />
          </div>
        </motion.div>

        {/* Instructions */}
        {collectedCount === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-amber-300 max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <Info className="w-6 h-6 text-amber-600" />
                <h3 className="text-amber-900">How to Play</h3>
              </div>
              <p className="text-amber-700">
                Click on the sparkling fruits and {characterName} will walk to them! 
                Answer the quiz correctly to collect each fruit. ✨
              </p>
            </div>
          </motion.div>
        )}

        {/* Completion Message */}
        {collectedCount === region.fruits.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 text-center">
              <div className="text-8xl mb-4">🏆</div>
              <h2 className="text-amber-900 mb-3">Region Complete!</h2>
              <p className="text-amber-700 mb-6">
                You collected all {region.fruits.length} fruits in {region.displayName}!
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => onNavigate('regionSelect')}
                  className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white"
                >
                  Choose New Region
                </Button>
                <Button
                  onClick={() => onNavigate('progress')}
                  variant="outline"
                  className="border-2 border-purple-400 text-purple-700"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && selectedFruit && (
          <QuizModal
            fruit={selectedFruit}
            onClose={handleQuizClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}