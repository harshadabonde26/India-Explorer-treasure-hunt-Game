import { useEffect, useRef } from 'react';
import { useGame } from './GameContext';

// Sound effect types
export type SoundEffect = 
  | 'click'
  | 'success'
  | 'error'
  | 'collect'
  | 'complete'
  | 'unlock'
  | 'walk'
  | 'quiz_open'
  | 'hint'
  | 'achievement';

// Hook for managing sound effects
export function useSoundEffects() {
  const { settings } = useGame();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API context
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
    if (!settings.soundEffects || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.value = volume;

    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  const playSound = (effect: SoundEffect) => {
    if (!settings.soundEffects) return;

    switch (effect) {
      case 'click':
        // Short, pleasant click
        playTone(800, 0.1, 'sine', 0.2);
        break;

      case 'success':
        // Happy ascending tones
        playTone(523.25, 0.1, 'sine', 0.3);
        setTimeout(() => playTone(659.25, 0.1, 'sine', 0.3), 100);
        setTimeout(() => playTone(783.99, 0.2, 'sine', 0.3), 200);
        break;

      case 'error':
        // Descending disappointed tone
        playTone(400, 0.15, 'square', 0.2);
        setTimeout(() => playTone(300, 0.2, 'square', 0.2), 150);
        break;

      case 'collect':
        // Coin-like collection sound
        playTone(987.77, 0.1, 'sine', 0.3);
        setTimeout(() => playTone(1318.51, 0.15, 'sine', 0.3), 80);
        break;

      case 'complete':
        // Triumphant fanfare
        playTone(523.25, 0.15, 'sine', 0.3);
        setTimeout(() => playTone(659.25, 0.15, 'sine', 0.3), 150);
        setTimeout(() => playTone(783.99, 0.15, 'sine', 0.3), 300);
        setTimeout(() => playTone(1046.50, 0.3, 'sine', 0.3), 450);
        break;

      case 'unlock':
        // Magical unlock sound
        playTone(659.25, 0.1, 'triangle', 0.25);
        setTimeout(() => playTone(783.99, 0.1, 'triangle', 0.25), 80);
        setTimeout(() => playTone(987.77, 0.2, 'triangle', 0.25), 160);
        break;

      case 'walk':
        // Short footstep
        playTone(200, 0.05, 'square', 0.15);
        break;

      case 'quiz_open':
        // Quiz modal opening sound
        playTone(440, 0.1, 'sine', 0.2);
        setTimeout(() => playTone(554.37, 0.15, 'sine', 0.2), 100);
        break;

      case 'hint':
        // Helper/hint sound
        playTone(880, 0.1, 'triangle', 0.2);
        setTimeout(() => playTone(1108.73, 0.1, 'triangle', 0.2), 100);
        break;

      case 'achievement':
        // Big achievement fanfare
        playTone(523.25, 0.12, 'sine', 0.3);
        setTimeout(() => playTone(659.25, 0.12, 'sine', 0.3), 120);
        setTimeout(() => playTone(783.99, 0.12, 'sine', 0.3), 240);
        setTimeout(() => playTone(1046.50, 0.12, 'sine', 0.3), 360);
        setTimeout(() => playTone(1318.51, 0.3, 'sine', 0.3), 480);
        break;

      default:
        break;
    }
  };

  return { playSound };
}

// Background music component
export function BackgroundMusic({ 
  track = 'adventure',
  volume = 0.3 
}: { 
  track?: 'adventure' | 'menu' | 'exploration' | 'victory';
  volume?: number;
}) {
  const { settings } = useGame();
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isPlayingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    // Stop any existing music first
    stopMusic();
    
    if (!settings.soundEffects || !audioContextRef.current) {
      return;
    }

    // Small delay to ensure clean start
    const startTimeout = setTimeout(() => {
      if (settings.soundEffects) {
        playBackgroundMusic(track, volume);
      }
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      stopMusic();
    };
  }, [settings.soundEffects, track, volume]);

  const stopMusic = () => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Stop all oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
    isPlayingRef.current = false;
  };

  const playBackgroundMusic = (track: string, vol: number) => {
    if (!audioContextRef.current || isPlayingRef.current) return;
    
    const ctx = audioContextRef.current;
    const gainNode = ctx.createGain();
    gainNode.gain.value = vol * 0.5; // Reduced volume for background
    gainNode.connect(ctx.destination);

    // Simple ambient background music using multiple tones
    const melodyNotes = getMelodyForTrack(track);
    let noteIndex = 0;
    
    const playNote = () => {
      if (!settings.soundEffects || !isPlayingRef.current) {
        stopMusic();
        return;
      }

      const note = melodyNotes[noteIndex % melodyNotes.length];
      const oscillator = ctx.createOscillator();
      const noteGain = ctx.createGain();

      oscillator.connect(noteGain);
      noteGain.connect(gainNode);

      oscillator.frequency.value = note.frequency;
      // Alternate between sine and triangle for more cartoonish sound
      oscillator.type = noteIndex % 3 === 0 ? 'triangle' : 'sine';
      
      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      // Bouncy attack
      noteGain.gain.linearRampToValueAtTime(vol * 0.35, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.01, now + note.duration);

      oscillator.start(now);
      oscillator.stop(now + note.duration);

      oscillatorsRef.current.push(oscillator);
      
      // Clean up old oscillators
      if (oscillatorsRef.current.length > 5) {
        oscillatorsRef.current.shift();
      }
      
      noteIndex++;

      timeoutRef.current = setTimeout(playNote, note.duration * 1000);
    };

    isPlayingRef.current = true;
    playNote();
  };

  return null;
}

// Helper function to get melody patterns
function getMelodyForTrack(track: string) {
  const melodies = {
    menu: [
      { frequency: 523.25, duration: 0.25 }, // C5
      { frequency: 659.25, duration: 0.25 }, // E5
      { frequency: 523.25, duration: 0.25 }, // C5
      { frequency: 659.25, duration: 0.25 }, // E5
      { frequency: 783.99, duration: 0.3 }, // G5
      { frequency: 659.25, duration: 0.2 }, // E5
      { frequency: 523.25, duration: 0.4 }, // C5
      { frequency: 392.00, duration: 0.25 }, // G4
      { frequency: 440.00, duration: 0.25 }, // A4
      { frequency: 493.88, duration: 0.5 }, // B4
    ],
    adventure: [
      { frequency: 523.25, duration: 0.2 }, // C5
      { frequency: 587.33, duration: 0.2 }, // D5
      { frequency: 659.25, duration: 0.2 }, // E5
      { frequency: 783.99, duration: 0.3 }, // G5
      { frequency: 659.25, duration: 0.2 }, // E5
      { frequency: 523.25, duration: 0.3 }, // C5
      { frequency: 587.33, duration: 0.2 }, // D5
      { frequency: 523.25, duration: 0.2 }, // C5
      { frequency: 440.00, duration: 0.3 }, // A4
      { frequency: 493.88, duration: 0.2 }, // B4
      { frequency: 523.25, duration: 0.4 }, // C5
    ],
    exploration: [
      { frequency: 659.25, duration: 0.25 }, // E5
      { frequency: 698.46, duration: 0.15 }, // F5
      { frequency: 783.99, duration: 0.25 }, // G5
      { frequency: 659.25, duration: 0.15 }, // E5
      { frequency: 587.33, duration: 0.25 }, // D5
      { frequency: 659.25, duration: 0.25 }, // E5
      { frequency: 523.25, duration: 0.3 }, // C5
      { frequency: 587.33, duration: 0.2 }, // D5
      { frequency: 523.25, duration: 0.2 }, // C5
      { frequency: 440.00, duration: 0.4 }, // A4
    ],
    victory: [
      { frequency: 523.25, duration: 0.15 }, // C5
      { frequency: 523.25, duration: 0.15 }, // C5
      { frequency: 659.25, duration: 0.2 }, // E5
      { frequency: 783.99, duration: 0.2 }, // G5
      { frequency: 1046.50, duration: 0.25 }, // C6
      { frequency: 783.99, duration: 0.15 }, // G5
      { frequency: 1046.50, duration: 0.3 }, // C6
      { frequency: 1174.66, duration: 0.2 }, // D6
      { frequency: 1318.51, duration: 0.2 }, // E6
      { frequency: 1567.98, duration: 0.35 }, // G6
      { frequency: 1318.51, duration: 0.15 }, // E6
      { frequency: 1174.66, duration: 0.15 }, // D6
      { frequency: 1046.50, duration: 0.4 }, // C6
      { frequency: 1174.66, duration: 0.2 }, // D6
      { frequency: 1318.51, duration: 0.5 }, // E6
    ],
  };

  return melodies[track as keyof typeof melodies] || melodies.adventure;
}