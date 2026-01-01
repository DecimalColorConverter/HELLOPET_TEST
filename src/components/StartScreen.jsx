import { motion } from 'framer-motion';

function StartScreen({ onStart, isDarkMode, onToggleTheme }) {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Content */}
            <div className="flex flex-col items-center z-10 w-full max-w-md">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    className="text-center will-change-transform w-full"
                >
                    <span className="text-6xl mb-6 block drop-shadow-sm filter"></span>

                    <h1 className={`text-5xl md:text-6xl font-extrabold leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        나는 <br /> 어떤 <span style={{ color: '#FFCE56' }}>펫</span>일까?
                    </h1>

                    <p className={`text-lg md:text-xl font-medium my-5 ${isDarkMode ? 'text-white/90' : 'text-gray-600'}`}>
                        헬로펫으로 알아보는 나의 성격
                    </p>
                </motion.div>

                {/* Start Button */}
                <motion.button
                    onClick={onStart}
                    className="w-full py-5 text-xl font-bold rounded-full shadow-lg hover:shadow-xl btn-press flex items-center justify-center gap-3 transition-shadow duration-300"
                    style={{
                        backgroundColor: '#FFCE56',
                        color: '#1F2937'
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span>시작하기</span>
                    <svg
                        className="w-7 h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-5 -10 110 135"
                        fill="currentColor"
                    >
                        <path d="m37.066 10.715c-0.35547-0.003906-0.72266 0.019531-1.0938 0.078125-13.457 2.0938-10.137 32.199 3.0273 30.812 13.035-1.375 9.1133-30.734-1.9336-30.891zm25.867 0c-11.047 0.15625-14.969 29.516-1.9336 30.891 13.164 1.3867 16.484-28.719 3.0273-30.812-0.37109-0.058594-0.73828-0.082031-1.0938-0.078125zm-45.055 21.598c-0.35547 0.011719-0.72266 0.050781-1.0898 0.11719-12.73 2.3555-5.9883 30.07 6.6211 27.633 11.844-2.2891 5.6094-28.125-5.5312-27.75zm64.242 0c-11.141-0.375-17.375 25.461-5.5312 27.75 12.609 2.4375 19.352-25.277 6.6211-27.633-0.36719-0.066407-0.73438-0.10547-1.0898-0.11719zm-32.121 12.188c-3.8633 0.21875-7.4883 0.75-13.453 9.7227-6.5117 9.8008-15.812 9.6875-16.109 21.637-0.28906 11.496 9.4922 14.383 13.09 14.441 5.3438 0.089844 11.219-3.0664 16.473-3.3008 5.2539 0.23438 11.129 3.3906 16.473 3.3008 3.5977-0.058593 13.379-2.9453 13.09-14.441-0.29688-11.949-9.5977-11.836-16.109-21.637-5.9648-8.9727-9.5898-9.5039-13.453-9.7227z" />
                    </svg>
                </motion.button>
            </div>

            {/* Footer Signature */}
            <p className={`absolute bottom-6 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Made by 여뉴
            </p>

            {/* Theme Toggle - Bottom Right, Smaller, No Background */}
            <motion.button
                onClick={onToggleTheme}
                className="fixed bottom-4 right-4 p-2 transition-colors duration-300 z-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Theme"
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

export default StartScreen;