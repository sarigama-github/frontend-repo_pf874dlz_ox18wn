import { useMemo } from 'react'
import { motion } from 'framer-motion'

const lines = [
  'Willkommen, Reisende*r. Ich begleite dich.',
  'Folge dem Licht und atme ruhig ein und aus.',
  'Berühre die Wolken der Schwere – und lass sie ziehen.',
]

export default function Guide({ step = 0, onTap }) {
  const text = useMemo(() => lines[Math.min(step, lines.length - 1)], [step])
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[600px] bg-slate-800/70 border border-blue-500/20 rounded-2xl p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-200">✨</div>
        <div className="flex-1">
          <p className="text-blue-50/95 text-sm md:text-base">{text}</p>
          {onTap && (
            <button onClick={onTap} className="mt-2 text-xs text-blue-300 hover:text-blue-200">Weiter</button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
