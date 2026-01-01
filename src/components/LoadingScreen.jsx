import { motion } from 'framer-motion';

function LoadingScreen({ isDarkMode }) {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Bouncing dots (위로 이동) */}
            <div className="flex space-x-3 mb-8">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: '#FFCE56' }}
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Loading text (아래로 이동) */}
            <motion.p
                className={`text-xl md:text-2xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                로딩중...
            </motion.p>
        </motion.div>
    );
}

export default LoadingScreen;