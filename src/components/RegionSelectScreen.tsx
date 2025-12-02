import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useGame } from './GameContext';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';
import { useSoundEffects, BackgroundMusic } from './useSoundEffects';

type RegionSelectScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings') => void;
};

export function RegionSelectScreen({ onNavigate }: RegionSelectScreenProps) {
  const { regions, setCurrentRegion, getRegionProgress, getTotalProgress, selectedCharacter } = useGame();
  const { playSound } = useSoundEffects();
  const totalProgress = getTotalProgress();
  const characterEmoji = selectedCharacter?.emoji || '👧🏻';
  const characterName = selectedCharacter?.name || 'Maya';

  const handleRegionClick = (regionId: number) => {
    playSound('unlock');
    setCurrentRegion(regionId);
    onNavigate('exploration');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Music */}
      <BackgroundMusic track="adventure" volume={0.3} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-500 p-4 shadow-lg border-b-4 border-amber-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={() => {
                playSound('click');
                onNavigate('home');
              }}
              variant="ghost"
              className="text-white hover:bg-amber-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h2 className="text-white">Choose Your Region</h2>
            <div className="w-20" />
          </div>
          
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">Total Progress</span>
              <span className="text-white">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Maya Avatar */}
      <div className="text-center py-6">
        <div className="inline-block relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl"
          >
            {characterEmoji}
          </motion.div>
          <div className="absolute top-0 right-0 text-3xl">🎒</div>
        </div>
        <p className="text-amber-800 mt-2">Where shall we explore, {characterName}?</p>
      </div>

      {/* Regions Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((region, index) => {
            const progress = getRegionProgress(region.id);
            const totalFruits = region.fruits.length;
            
            return (
              <motion.button
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRegionClick(region.id)}
                className="group relative"
              >
                <div className={`
                  bg-gradient-to-br ${region.bgGradient}
                  rounded-3xl p-8 shadow-2xl border-4 border-white
                  transition-all duration-300
                  hover:scale-105 hover:shadow-3xl
                  text-left
                `}>
                  {/* Theme Icon */}
                  <div className="absolute -top-6 -right-6">
                    <div className="text-7xl drop-shadow-lg transform group-hover:rotate-12 transition-transform">
                      {region.theme}
                    </div>
                  </div>

                  {/* Region Info */}
                  <div className="mb-6">
                    <h3 className="text-white mb-2 drop-shadow-md">
                      {region.displayName}
                    </h3>
                    <p className="text-white/90 drop-shadow">
                      {region.description}
                    </p>
                  </div>

                  {/* Fruit Count */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-white">{totalFruits} Fruits to Collect</span>
                      </div>
                      <span className="text-white">{progress}%</span>
                    </div>
                    <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>

                  {/* Fruit Preview */}
                  <div className="flex gap-2 flex-wrap">
                    {region.fruits.slice(0, 7).map(fruit => (
                      <div
                        key={fruit.id}
                        className="text-3xl transform group-hover:scale-110 transition-transform"
                      >
                        {fruit.emoji}
                      </div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Fun Fact */}
        <div className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 border-4 border-purple-300 text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="text-purple-900 mb-2">Collect All 50 Fruits!</h3>
          <p className="text-purple-700">
            Explore 4 unique regions, solve educational quizzes, and learn fun facts about fruits from around the world!
          </p>
        </div>
      </div>
    </div>
  );
}