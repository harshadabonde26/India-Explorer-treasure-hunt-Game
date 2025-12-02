import { useState } from 'react';
import { X, Lightbulb, Trophy, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useGame, Fruit } from './GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { useSoundEffects } from './useSoundEffects';

type QuizModalProps = {
  fruit: Fruit;
  onClose: () => void;
};

export function QuizModal({ fruit, onClose }: QuizModalProps) {
  const { fruitProgress, updateFruitProgress, collectFruit, settings } = useGame();
  const { playSound } = useSoundEffects();
  const progress = fruitProgress[fruit.id];

  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(progress?.attempts || 0);
  const [eliminatedOption, setEliminatedOption] = useState<string | null>(null);
  const [hasWrongAnswer, setHasWrongAnswer] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) {
      setError('Please enter an answer!');
      return;
    }

    const userAnswer = answer.toLowerCase().trim();
    const correctAnswer = fruit.quiz.answer.toLowerCase();

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    updateFruitProgress(fruit.id, { attempts: newAttempts });

    if (userAnswer === correctAnswer) {
      // Correct answer!
      playSound('success');
      if (settings.vibration && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }

      collectFruit(fruit.id);
      playSound('collect');
      setShowSuccess(true);

      setTimeout(() => {
        playSound('achievement');
        onClose();
      }, 4000);
    } else {
      playSound('error');
      setError('Not quite right! Try again.');
      if (settings.vibration && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }

      // Auto-show hint after 3 attempts
      if (newAttempts >= 3 && !showHint) {
        playSound('hint');
        setShowHint(true);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    playSound('click');
    setAnswer(option);
    setTimeout(() => {
      const userAnswer = option.toLowerCase().trim();
      const correctAnswer = fruit.quiz.answer.toLowerCase();

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      updateFruitProgress(fruit.id, { attempts: newAttempts });

      if (userAnswer === correctAnswer) {
        playSound('success');
        if (settings.vibration && 'vibrate' in navigator) {
          navigator.vibrate(200);
        }

        collectFruit(fruit.id);
        playSound('collect');
        setShowSuccess(true);

        setTimeout(() => {
          playSound('achievement');
          onClose();
        }, 4000);
      } else {
        playSound('error');
        setError('Not quite right! One wrong option removed to help you!');
        setHasWrongAnswer(true);
        
        if (settings.vibration && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }

        // Eliminate one wrong option (not the one they just clicked and not the correct answer)
        if (!eliminatedOption && fruit.quiz.options) {
          const wrongOptions = fruit.quiz.options.filter(
            opt => opt.toLowerCase() !== correctAnswer && opt !== option
          );
          if (wrongOptions.length > 0) {
            const optionToEliminate = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            setEliminatedOption(optionToEliminate);
          }
        }

        // Reset answer after 1 second to allow re-selection
        setTimeout(() => {
          setAnswer('');
          setError('');
        }, 1000);

        // Auto-show hint after 3 attempts
        if (newAttempts >= 3 && !showHint) {
          playSound('hint');
          setShowHint(true);
        }
      }
    }, 100);
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-yellow-400"
        >
          <div className="text-center">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-9xl mb-4"
            >
              🎉
            </motion.div>

            <h2 className="text-green-600 mb-4">Correct!</h2>
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              {fruit.emoji}
            </motion.div>

            <h3 className="text-amber-900 mb-4">
              You collected {fruit.name}!
            </h3>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h4 className="text-blue-900">Fun Fact:</h4>
              </div>
              <p className="text-blue-800">{fruit.funFact}</p>
            </div>

            <div className="flex gap-2 justify-center mt-6">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div className="text-3xl">✨</div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-4 border-amber-300 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-4 right-4 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Fruit Display */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mb-4 inline-block"
          >
            {fruit.emoji}
          </motion.div>
          <h2 className="text-amber-900 mb-2">{fruit.name}</h2>
          <p className="text-amber-600">Answer the quiz to collect this fruit!</p>
        </div>

        {/* Quiz Question */}
        <div className="bg-amber-100 rounded-2xl p-6 mb-6 border-2 border-amber-300">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl">🧩</div>
            <div className="flex-1">
              <h3 className="text-amber-900 mb-2">
                {fruit.quiz.type === 'multiple-choice' && 'Multiple Choice'}
                {fruit.quiz.type === 'text-input' && 'Question'}
                {fruit.quiz.type === 'jumbled-word' && 'Jumbled Word'}
              </h3>
              <p className="text-amber-800">{fruit.quiz.question}</p>
              {fruit.quiz.type === 'jumbled-word' && fruit.quiz.jumbled && (
                <div className="mt-4 bg-amber-200 rounded-lg p-4 border-2 border-amber-400">
                  <p className="text-center text-amber-900 tracking-widest">
                    {fruit.quiz.jumbled}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Answer Input/Options */}
          {fruit.quiz.type === 'multiple-choice' && fruit.quiz.options ? (
            <div className="space-y-3">
              {eliminatedOption && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-50 border-2 border-orange-300 rounded-xl p-3 text-center"
                >
                  <p className="text-orange-800">
                    ✨ One wrong answer eliminated! Now you have 3 choices.
                  </p>
                </motion.div>
              )}
              <div className="grid grid-cols-1 gap-3">
                {fruit.quiz.options.map((option, index) => {
                  const isEliminated = option === eliminatedOption;
                  const isWrongAnswer = answer === option && error;
                  
                  if (isEliminated) {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0.3, scale: 0.95, x: 10 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <Button
                          disabled
                          className="w-full h-auto py-4 px-6 text-left justify-start bg-gray-200 border-2 border-gray-300 text-gray-400 line-through relative"
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                          <span className="absolute right-4 text-2xl">❌</span>
                        </Button>
                      </motion.div>
                    );
                  }
                  
                  return (
                    <Button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      disabled={!!answer}
                      className={`
                        h-auto py-4 px-6 text-left justify-start transition-all
                        ${isWrongAnswer
                          ? 'bg-red-100 border-2 border-red-400 text-red-800 hover:bg-red-100'
                          : 'bg-white hover:bg-amber-50 border-2 border-amber-300 text-amber-900 hover:scale-102'
                        }
                      `}
                    >
                      <span className="mr-3 text-amber-600">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Type your answer here..."
                className="h-12 border-2 border-amber-300 focus:border-amber-500 bg-white"
              />
              <Button
                onClick={handleSubmit}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white"
              >
                Submit Answer
              </Button>
            </div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 mt-3 text-center"
            >
              ❌ {error}
            </motion.p>
          )}
        </div>

        {/* Hint Section */}
        <div className="space-y-3">
          {attempts >= 3 || showHint ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300"
            >
              <div className="flex items-center gap-2 text-blue-800">
                <Lightbulb className="w-5 h-5" />
                <p>💡 Hint: {fruit.quiz.hint}</p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center">
              <Button
                onClick={() => {
                  playSound('hint');
                  setShowHint(true);
                  updateFruitProgress(fruit.id, { 
                    hintsUsed: (progress?.hintsUsed || 0) + 1 
                  });
                }}
                variant="outline"
                className="border-2 border-blue-400 text-blue-700 hover:bg-blue-50"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Need a Hint?
              </Button>
              {attempts > 0 && (
                <p className="text-amber-600 mt-2">
                  Attempts: {attempts} (Hint unlocks after 3 attempts)
                </p>
              )}
            </div>
          )}
        </div>

        {/* Attempt Counter */}
        {attempts > 0 && (
          <p className="text-center text-amber-700 mt-4">
            {attempts === 1 ? '1 attempt' : `${attempts} attempts`} • Keep trying!
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}