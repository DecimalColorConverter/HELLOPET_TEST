import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase';

// Paw Print SVG Component
const PawIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor">
        <path d="m37.066 10.715c-0.35547-0.003906-0.72266 0.019531-1.0938 0.078125-13.457 2.0938-10.137 32.199 3.0273 30.812 13.035-1.375 9.1133-30.734-1.9336-30.891zm25.867 0c-11.047 0.15625-14.969 29.516-1.9336 30.891 13.164 1.3867 16.484-28.719 3.0273-30.812-0.37109-0.058594-0.73828-0.082031-1.0938-0.078125zm-45.055 21.598c-0.35547 0.011719-0.72266 0.050781-1.0898 0.11719-12.73 2.3555-5.9883 30.07 6.6211 27.633 11.844-2.2891 5.6094-28.125-5.5312-27.75zm64.242 0c-11.141-0.375-17.375 25.461-5.5312 27.75 12.609 2.4375 19.352-25.277 6.6211-27.633-0.36719-0.066407-0.73438-0.10547-1.0898-0.11719zm-32.121 12.188c-3.8633 0.21875-7.4883 0.75-13.453 9.7227-6.5117 9.8008-15.812 9.6875-16.109 21.637-0.28906 11.496 9.4922 14.383 13.09 14.441 5.3438 0.089844 11.219-3.0664 16.473-3.3008 5.2539 0.23438 11.129 3.3906 16.473 3.3008 3.5977-0.058593 13.379-2.9453 13.09-14.441-0.29688-11.949-9.5977-11.836-16.109-21.637-5.9648-8.9727-9.5898-9.5039-13.453-9.7227z" />
    </svg>
);

// Yellow Bullet Point Component
const YellowBullet = () => (
    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
);

function ResultScreen({
    result,
    mbtiType,
    onRestart,
    isDarkMode,
    onToggleTheme
}) {
    const logAttempted = useRef(false);

    useEffect(() => {
        if (logAttempted.current) return;
        logAttempted.current = true;

        const logResult = async () => {
            try {
                if (supabase) {
                    const { error } = await supabase
                        .from('test_results')
                        .insert([
                            { animal: result.animal, timestamp: new Date().toISOString() }
                        ]);

                    if (error) {
                        console.error('Supabase error:', error);
                    }
                } else {
                    console.log('Supabase not initialized (missing env vars), skipping log.');
                }
            } catch (err) {
                console.error('Error logging result:', err);
            }
        };

        logResult();
    }, [result.animal]);


    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: '나의 동물 유형 테스트 결과',
                text: `나의 동물 유형은 ${result.animal}입니다!`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert(`나의 동물 유형은 ${result.animal}입니다!`);
        }
    };

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center px-8 py-12 md:px-10 z-0 relative overflow-y-auto overflow-x-hidden scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center w-full max-w-md mt-6 will-change-transform"
            >
                {/* A. Header Section */}
                {/* Animal Image - Centered */}
                <motion.div
                    variants={imageVariants}
                    className="w-full aspect-[1000/523] mb-6 flex items-center justify-center relative"
                >
                    {result.img ? (
                        <div className="w-full h-full rounded-3xl overflow-hidden">
                            <img
                                src={result.img}
                                alt={result.animal}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <motion.span
                                className="text-8xl block mb-2"
                                animate={{ rotate: [0, -5, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            >
                                🐾
                            </motion.span>
                            <p className="text-gray-800 font-bold opacity-50 text-sm">이미지 준비중</p>
                        </div>
                    )}
                </motion.div>

                {/* Animal Name */}
                <motion.h1
                    variants={itemVariants}
                    className={`text-2xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    {result.animal}
                </motion.h1>

                {/* Hashtags (Upper Divider Context: mb-6) */}
                <motion.p
                    variants={itemVariants}
                    className={`text-sm mb-6 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    {result.hashtags.join(' ')}
                </motion.p>

                {/* Upper Divider (mb-8) */}
                <motion.div
                    variants={itemVariants}
                    className="w-8 h-1.5 rounded-full mx-auto mb-8 transition-colors duration-300"
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#fff3d4' }}
                />

                {/* B. Bullet Point Sections */}
                {/* Section 1: Traits */}
                <motion.div
                    variants={itemVariants}
                    className="w-full mb-8"
                >
                    <h2
                        className={`text-xl font-bold mb-4 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                        당신은 어떤 펫이냐면...
                    </h2>
                    <ul className="space-y-3">
                        {result.description.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <YellowBullet />
                                <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Section 2: Likes */}
                {result.likes && (
                    <motion.div
                        variants={itemVariants}
                        className="w-full mb-8"
                    >
                        <h2
                            className={`text-xl font-bold mb-4 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                        >
                            이런 게 좋아요!
                        </h2>
                        <ul className="space-y-3">
                            {result.likes.list.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <YellowBullet />
                                    <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Section 3: Dislikes */}
                {result.dislikes && (
                    <motion.div
                        variants={itemVariants}
                        className="w-full mb-8"
                    >
                        <h2
                            className={`text-xl font-bold mb-4 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                        >
                            이런 게 싫어요!
                        </h2>
                        <ul className="space-y-3">
                            {result.dislikes.list.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <YellowBullet />
                                    <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* C. Match Section (Footer) */}
                {result.match && (
                    <motion.div
                        variants={itemVariants}
                        className="w-full"
                    >
                        {/* Best Match */}
                        <div className="mb-6">
                            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                <span>❤️</span>
                                <span>환상의 짝꿍: {result.match.best.name}</span>
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {result.match.best.desc}
                            </p>
                        </div>

                        {/* Worst Match (Lower Divider Context: mb-6) */}
                        <div className="mb-6">
                            <h3 className={`font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                <span>💔</span>
                                <span>환장의 짝꿍: {result.match.worst.name}</span>
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {result.match.worst.desc}
                            </p>
                        </div>

                        {/* Lower Divider (mb-8) - Matches Upper Divider perfectly */}
                        <div
                            className="w-8 h-1.5 rounded-full mx-auto mb-8 transition-colors duration-300"
                            style={{ backgroundColor: isDarkMode ? '#374151' : '#fff3d4' }}
                        />
                    </motion.div>
                )}

                {/* Action Buttons - Fully Rounded */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col w-full gap-4 mb-8"
                >
                    <motion.button
                        onClick={handleShare}
                        className={`w-full py-4 rounded-full font-bold text-lg shadow-mobile btn-press flex items-center justify-center gap-2 transition-colors ${isDarkMode
                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        공유하기
                    </motion.button>

                    <motion.button
                        onClick={onRestart}
                        className="w-full py-4 rounded-full font-bold text-lg shadow-lg btn-press flex items-center justify-center gap-2 transition-colors"
                        style={{
                            backgroundColor: '#FFCE56',
                            color: '#1F2937'
                        }}
                        whileHover={{ backgroundColor: '#FFD970' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <PawIcon className="w-6 h-6" />
                        다시하기
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Footer Signature */}
            <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Made by 여뉴
            </p>

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

export default ResultScreen;