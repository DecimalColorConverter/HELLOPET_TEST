import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Paw Print SVG Component
const PawIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor">
        <path d="m37.066 10.715c-0.35547-0.003906-0.72266 0.019531-1.0938 0.078125-13.457 2.0938-10.137 32.199 3.0273 30.812 13.035-1.375 9.1133-30.734-1.9336-30.891zm25.867 0c-11.047 0.15625-14.969 29.516-1.9336 30.891 13.164 1.3867 16.484-28.719 3.0273-30.812-0.37109-0.058594-0.73828-0.082031-1.0938-0.078125zm-45.055 21.598c-0.35547 0.011719-0.72266 0.050781-1.0898 0.11719-12.73 2.3555-5.9883 30.07 6.6211 27.633 11.844-2.2891 5.6094-28.125-5.5312-27.75zm64.242 0c-11.141-0.375-17.375 25.461-5.5312 27.75 12.609 2.4375 19.352-25.277 6.6211-27.633-0.36719-0.066407-0.73438-0.10547-1.0898-0.11719zm-32.121 12.188c-3.8633 0.21875-7.4883 0.75-13.453 9.7227-6.5117 9.8008-15.812 9.6875-16.109 21.637-0.28906 11.496 9.4922 14.383 13.09 14.441 5.3438 0.089844 11.219-3.0664 16.473-3.3008 5.2539 0.23438 11.129 3.3906 16.473 3.3008 3.5977-0.058593 13.379-2.9453 13.09-14.441-0.29688-11.949-9.5977-11.836-16.109-21.637-5.9648-8.9727-9.5898-9.5039-13.453-9.7227z" />
    </svg>
);

function QuizScreen({
    questions,
    currentQuestion,
    onAnswer,
    isDarkMode,
    onToggleTheme
}) {
    const [direction, setDirection] = useState(1);
    const [key, setKey] = useState(0);
    const progress = ((currentQuestion) / questions.length) * 100;
    const question = questions[currentQuestion];

    // Update key when question changes for animation
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [currentQuestion]);

    const handleAnswer = (weights) => {
        setDirection(1);
        onAnswer(weights);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col px-4 pb-8 pt-6 md:px-6 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-10">
                <div className={`relative w-full h-2.5 rounded-full overflow-visible ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <motion.div
                        className="h-full rounded-full relative"
                        style={{ backgroundColor: '#FFCE56' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {/* Paw icon at end of progress bar */}
                        <motion.div
                            className="absolute -right-3 -top-2 text-amber-500 will-change-transform"
                            key={currentQuestion}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.4 }}
                        >
                            <PawIcon className="w-6 h-6 drop-shadow-sm" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Question & Answers with slide animation */}
            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={key}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            duration: 0.35,
                            ease: [0.4, 0, 0.35, 1],
                        }}
                        className="w-full will-change-transform"
                    >
                        {/* Question - Clean text without container */}
                        <div className="text-center mb-10 px-2">
                            <p className={`text-xl md:text-2xl leading-relaxed font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                {question.question}
                            </p>
                        </div>

                        {/* Answer Options - Doda Style Yellow Glow Buttons */}
                        {/* Never change this*/}

                        <div className="space-y-6 w-full">
                            {question.answers.map((answer, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(answer.weights)}
                                    className="w-full py-5 px-6 rounded-full text-center font-medium btn-press flex justify-center items-center shadow-mobile hover:shadow-lg transition-all border border-yellow-300"
                                    style={{
                                        backgroundColor: '#FFCE56',
                                        color: '#1F2937', // Dark gray text
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 + index * 0.04, duration: 0.25 }}
                                    whileHover={{
                                        scale: 1.02,
                                        backgroundColor: '#FFD970',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="block leading-relaxed text-lg font-medium whitespace-pre-line">{answer.text}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Theme Toggle - Bottom Right, Smaller, No Background */}
            <motion.button
                onClick={onToggleTheme}
                className="fixed bottom-4 right-4 p-2 transition-colors duration-300 z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </motion.button>
        </motion.div>
    );
}

export default QuizScreen;
