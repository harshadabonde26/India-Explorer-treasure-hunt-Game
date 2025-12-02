import { ArrowLeft, Volume2, VolumeX, Smartphone, Moon, Sun, RotateCcw, HelpCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useGame } from './GameContext';
import { motion } from 'motion/react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

type SettingsScreenProps = {
  onNavigate: (screen: 'home' | 'regionSelect' | 'exploration' | 'progress' | 'settings') => void;
};

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const { settings, updateSettings, resetProgress } = useGame();

  const handleReset = () => {
    resetProgress();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-500 p-4 shadow-lg border-b-4 border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => onNavigate('home')}
              variant="ghost"
              className="text-white hover:bg-slate-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h2 className="text-white">Settings</h2>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-4 border-amber-200"
          >
            <h3 className="text-amber-900 mb-6">Game Settings</h3>

            {/* Sound Effects */}
            <div className="flex items-center justify-between py-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                {settings.soundEffects ? (
                  <Volume2 className="w-6 h-6 text-amber-600" />
                ) : (
                  <VolumeX className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="text-amber-900">Sound Effects</p>
                  <p className="text-amber-600 text-xs">Play sounds for correct/incorrect answers</p>
                </div>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => updateSettings({ soundEffects: checked })}
              />
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between py-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <Smartphone className={`w-6 h-6 ${settings.vibration ? 'text-amber-600' : 'text-gray-400'}`} />
                <div>
                  <p className="text-amber-900">Vibration</p>
                  <p className="text-amber-600 text-xs">Haptic feedback for game events</p>
                </div>
              </div>
              <Switch
                checked={settings.vibration}
                onCheckedChange={(checked) => updateSettings({ vibration: checked })}
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <Moon className="w-6 h-6 text-amber-600" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-600" />
                )}
                <div>
                  <p className="text-amber-900">Dark Mode</p>
                  <p className="text-amber-600 text-xs">Coming soon!</p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSettings({ darkMode: checked })}
                disabled
              />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-4 border-amber-200 space-y-3"
          >
            <h3 className="text-amber-900 mb-4">Actions</h3>

            {/* Reset Progress */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 border-2 border-red-300 text-red-700 hover:bg-red-50"
                >
                  <RotateCcw className="w-5 h-5 mr-3" />
                  Reset Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your progress and collected fruits. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Yes, reset everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* How to Play */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  How to Play
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>How to Play</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3 text-left">
                    <div>
                      <p className="text-amber-900 mb-2">🗺️ <strong>Choose a Region</strong></p>
                      <p>Select from 4 unique regions: Jungle Village, Desert Ruins, Snowy Mountain, or Island Harbor.</p>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-2">🍎 <strong>Click on Fruits</strong></p>
                      <p>Maya will walk to the sparkling fruit you click on!</p>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-2">🎯 <strong>Solve Quizzes</strong></p>
                      <p>Answer multiple choice, text input, or jumbled word questions correctly to collect fruits.</p>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-2">💡 <strong>Use Hints</strong></p>
                      <p>Get stuck? Hints unlock after 3 attempts, or click the hint button anytime!</p>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-2">✨ <strong>Learn Fun Facts</strong></p>
                      <p>After collecting each fruit, discover interesting facts about it!</p>
                    </div>
                    <div>
                      <p className="text-amber-900 mb-2">🏆 <strong>Complete All Regions</strong></p>
                      <p>Collect all 30 fruits across 4 regions to become a master explorer!</p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Got it!</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* About */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Info className="w-5 h-5 mr-3" />
                  About
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About Treasure Hunt: Fruit Explorer</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-3 text-left">
                    <div className="text-center my-4">
                      <div className="text-7xl mb-2">👧</div>
                      <p className="text-amber-900">Maya the Explorer</p>
                    </div>
                    <p>
                      Join Maya on an interactive educational adventure! Click on fruits, solve engaging quizzes, 
                      and learn fascinating facts about fruits from different regions around the world.
                    </p>
                    <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
                      <p className="text-amber-900 mb-2"><strong>Game Features:</strong></p>
                      <ul className="list-disc list-inside text-amber-800 space-y-1">
                        <li>30 unique fruits with educational quizzes</li>
                        <li>4 beautifully themed regions to explore</li>
                        <li>Interactive click-and-collect gameplay</li>
                        <li>Multiple quiz types: multiple choice, text input, jumbled words</li>
                        <li>Hint system for learning</li>
                        <li>Fun facts revealed after each collection</li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <p className="text-amber-700 mb-2">
                        🌴 Jungle • 🏜️ Desert • ⛰️ Mountain • ⚓ Island
                      </p>
                      <p className="text-amber-600">
                        Version 1.0.0 | Made with ❤️
                      </p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>

          {/* Character Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg border-4 border-amber-300 text-center"
          >
            <div className="relative inline-block mb-4">
              <div className="text-8xl">👧</div>
              <div className="absolute -top-2 -right-2 text-4xl">🎒</div>
            </div>
            <h3 className="text-amber-900 mb-2">Meet Maya</h3>
            <p className="text-amber-700">
              A curious young explorer with a passion for adventure and learning! 
              With her trusty backpack and warm smile, Maya travels across diverse regions, 
              discovering fruits and sharing fascinating facts along the way! 🗺️✨
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
