import { ArrowLeft, Trophy, Gift, Star, Award, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useGame } from './GameContext';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { useSoundEffects } from './useSoundEffects';

type ProgressScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings') => void;
};

export function ProgressScreen({ onNavigate }: ProgressScreenProps) {
  const { regions, fruitProgress, getTotalProgress, getRegionProgress, playerName } = useGame();
  const { playSound } = useSoundEffects();

  const totalProgress = getTotalProgress();
  const collectedFruits = Object.values(fruitProgress).filter(f => f.collected);
  const totalFruits = 50;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-500 p-4 shadow-lg border-b-4 border-purple-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => {
                playSound('click');
                onNavigate('home');
              }}
              variant="ghost"
              className="text-white hover:bg-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h2 className="text-white">Your Collection</h2>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Maya's Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl border-4 border-purple-300"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="text-8xl">👧</div>
                <div className="absolute -top-2 -right-2 text-3xl">🎒</div>
              </div>
              <div className="flex-1">
                <h2 className="text-purple-900 mb-2">{playerName}'s Adventure Progress</h2>
                <p className="text-purple-700">Keep exploring to collect all the fruits!</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-purple-100 rounded-2xl p-6 border-2 border-purple-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-900">Overall Progress</span>
                <span className="text-purple-900">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-4" />
              <p className="text-center text-purple-700 mt-3">
                {collectedFruits.length} / {totalFruits} Fruits Collected
              </p>
            </div>
          </motion.div>

          {/* Regional Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-amber-600" />
              <h3 className="text-amber-900">Regional Progress</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regions.map((region) => {
                const progress = getRegionProgress(region.id);
                const collected = region.fruits.filter(f => fruitProgress[f.id]?.collected).length;
                const isComplete = collected === region.fruits.length;

                return (
                  <div
                    key={region.id}
                    className={`
                      relative rounded-2xl p-6 border-4
                      ${isComplete 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-400' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
                      }
                    `}
                  >
                    {isComplete && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3"
                      >
                        <div className="bg-yellow-400 rounded-full p-2 border-2 border-white shadow-lg">
                          <Trophy className="w-6 h-6 text-yellow-800" />
                        </div>
                      </motion.div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{region.theme}</div>
                      <div>
                        <h4 className={isComplete ? 'text-green-900' : 'text-gray-900'}>
                          {region.displayName}
                        </h4>
                        <p className={isComplete ? 'text-green-700' : 'text-gray-600'}>
                          {collected}/{region.fruits.length} Fruits
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-lg h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Fruit Collection Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-8 h-8 text-amber-600" />
              <h3 className="text-amber-900">Fruit Collection</h3>
            </div>

            {regions.map((region) => {
              const regionFruits = region.fruits;
              
              return (
                <div key={region.id} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{region.theme}</div>
                    <h4 className="text-amber-900">{region.displayName}</h4>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {regionFruits.map((fruit) => {
                      const isCollected = fruitProgress[fruit.id]?.collected;
                      const attempts = fruitProgress[fruit.id]?.attempts || 0;

                      return (
                        <motion.div
                          key={fruit.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`
                            relative p-4 rounded-xl border-4 transition-all text-center
                            ${isCollected
                              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-400'
                              : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 opacity-60'
                            }
                          `}
                        >
                          {isCollected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                              <Award className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="text-5xl mb-2">
                            {isCollected ? fruit.emoji : '❓'}
                          </div>
                          <p className={`text-xs ${isCollected ? 'text-green-900' : 'text-gray-500'}`}>
                            {isCollected ? fruit.name : 'Locked'}
                          </p>
                          {isCollected && attempts > 0 && (
                            <p className="text-xs text-green-700 mt-1">
                              {attempts} {attempts === 1 ? 'try' : 'tries'}
                            </p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Achievement Message */}
          {totalProgress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-pink-100 to-purple-200 rounded-3xl p-8 shadow-xl border-4 border-pink-400 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-purple-900 mb-3">Congratulations, Maya!</h2>
              <p className="text-purple-700 mb-4">
                You've completed all 4 regions and collected every fruit! 
                You are a master Treasure Hunter! 🏆✨
              </p>
              <div className="flex justify-center gap-3">
                <Trophy className="w-12 h-12 text-yellow-500" />
                <Star className="w-12 h-12 text-yellow-400" />
                <Sparkles className="w-12 h-12 text-pink-500" />
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
            </motion.div>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border-4 border-green-300 text-center shadow-lg"
            >
              <div className="text-5xl mb-3">🍎</div>
              <h4 className="text-green-900 mb-1">Fruits</h4>
              <p className="text-green-600">{collectedFruits.length}/50</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-6 border-4 border-yellow-300 text-center shadow-lg"
            >
              <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
              <h4 className="text-yellow-900 mb-1">Regions</h4>
              <p className="text-yellow-600">
                {regions.filter(r => getRegionProgress(r.id) === 100).length}/4
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-6 border-4 border-blue-300 text-center shadow-lg"
            >
              <Star className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h4 className="text-blue-900 mb-1">Quizzes</h4>
              <p className="text-blue-600">{collectedFruits.length} Passed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border-4 border-purple-300 text-center shadow-lg"
            >
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h4 className="text-purple-900 mb-1">Progress</h4>
              <p className="text-purple-600">{totalProgress}%</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}