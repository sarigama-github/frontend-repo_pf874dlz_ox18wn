import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-white tracking-tight"
      >
        Tee & Seele
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl"
      >
        Eine meditative, spielerische Reise zu deiner inneren Balance.
      </motion.p>
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 px-6 py-3 rounded-full bg-blue-500/90 text-white font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-500"
      >
        Reise beginnen
      </motion.button>
    </div>
  )
}
