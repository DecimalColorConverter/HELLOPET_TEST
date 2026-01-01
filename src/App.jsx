import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import questions from './data/questions';
import results from './data/results';
import './index.css';

function App() {
  // Screen state: 'start', 'quiz', 'loading', 'result'
  const [screen, setScreen] = useState('start');

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // MBTI scoring state - 8 traits
  const [scores, setScores] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  });

  // Calculated MBTI result
  const [mbtiType, setMbtiType] = useState('');

  // Initialize GA4
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;
    if (gaId) {
      ReactGA.initialize(gaId);
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (import.meta.env.VITE_GA_ID) {
      ReactGA.send({ hitType: "pageview", page: `/${screen}` });
    }
  }, [screen]);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Start the quiz
  const handleStart = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  // Handle answer selection - accumulate weighted scores
  const handleAnswer = (weights) => {
    // Update scores based on weights
    const newScores = { ...scores };
    Object.entries(weights).forEach(([trait, value]) => {
      newScores[trait] += value;
    });
    setScores(newScores);

    // Move to next question or show loading then result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Show loading screen, then calculate and show result
      setScreen('loading');

      // Calculate MBTI after a delay for loading animation
      setTimeout(() => {
        calculateAndShowResult(newScores);
      }, 2000);
    }
  };

  // Calculate MBTI type and show result
  const calculateAndShowResult = (finalScores) => {
    // Helper function: choose winner with tie-breaking
    const getWinner = (a, b) => {
      if (finalScores[a] > finalScores[b]) return a;
      if (finalScores[b] > finalScores[a]) return b;
      // Tie-breaker: random selection
      return Math.random() < 0.5 ? a : b;
    };

    // Construct 4-letter MBTI type
    const type =
      getWinner('E', 'I') +
      getWinner('S', 'N') +
      getWinner('T', 'F') +
      getWinner('J', 'P');

    setMbtiType(type);
    setScreen('result');
  };

  // Restart the quiz
  const handleRestart = () => {
    setScreen('start');
    setCurrentQuestion(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setMbtiType('');
  };

  // Get result data for current MBTI type
  const getResult = () => {
    return results[mbtiType] || results['INTJ']; // Fallback to INTJ
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <StartScreen
            key="start"
            onStart={handleStart}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            key="quiz"
            questions={questions}
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        )}

        {screen === 'loading' && (
          <LoadingScreen
            key="loading"
            isDarkMode={isDarkMode}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            key="result"
            result={getResult()}
            mbtiType={mbtiType}
            onRestart={handleRestart}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
