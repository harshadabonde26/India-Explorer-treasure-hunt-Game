import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { useSoundEffects } from './useSoundEffects';

type NameInputScreenProps = {
  onNameSubmit: (name: string) => void;
};

export function NameInputScreen({ onNameSubmit }: NameInputScreenProps) {
  const { playSound } = useSoundEffects();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      playSound('error');
      setError('Please enter your name!');
      return;
    }
    if (name.trim().length < 2) {
      playSound('error');
      setError('Name must be at least 2 characters!');
      return;
    }
    playSound('success');
    onNameSubmit(name.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 text-9xl"
        >
          🎮
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 30, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-20 text-8xl"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{ 
            rotate: [0, -360],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-9xl"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 right-10 text-8xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Welcome message */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="text-9xl mb-4">👋</div>
          <h1 className="text-white drop-shadow-lg mb-2">Welcome Explorer!</h1>
          <p className="text-white/90 drop-shadow">
            Let's start your fruit collection adventure
          </p>
        </motion.div>

        {/* Maya character */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="inline-block relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl"
            >
              👧
            </motion.div>
            <div className="absolute -top-2 -right-2 text-3xl text-[rgb(10,10,10)]">🎒</div>
          </div>
          <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <p className="text-purple-900">
              Hi! I'm Maya. What's your name?
            </p>
          </div>
        </motion.div>

        {/* Name input card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-300"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-purple-900">Enter Your Name</h2>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your name here..."
              className="h-14 border-4 border-purple-200 focus:border-purple-400 text-center bg-purple-50"
              maxLength={20}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl shadow-lg border-4 border-purple-400 transition-all hover:scale-105"
            >
              <span>Start Adventure</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Fun fact */}
          <div className="mt-6 pt-6 border-t-2 border-purple-100">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🎯</div>
                <p className="text-purple-900">Did you know?</p>
              </div>
              <p className="text-purple-700 text-sm">
                You'll explore 4 regions and collect 30 different fruits while learning amazing facts!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 space-y-2"
        >
          <div className="flex justify-center gap-3 text-4xl">
            <motion.div animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🍎
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>
              🥭
            </motion.div>
            <motion.div animate={{ rotate: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>
              🍊
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
              🍌
            </motion.div>
          </div>
          <p className="text-white drop-shadow">
            30 Fruits • 4 Regions • Endless Fun! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}