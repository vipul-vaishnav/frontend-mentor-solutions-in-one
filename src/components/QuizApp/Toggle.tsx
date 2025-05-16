import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const Toggle = () => {
  const { theme, toggle: toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'sun-light' : 'sun-dark'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {!isDark ? (
            <img src={'/frontend-quiz-app/icon-sun-dark.svg'} alt="sun-dark" />
          ) : (
            <img src={'/frontend-quiz-app/icon-sun-light.svg'} alt="sun-light" />
          )}
        </motion.div>
      </AnimatePresence>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" onChange={toggleTheme} checked={isDark} />
        <div
          className={`w-11 h-6 rounded-full peer bg-[#c7c7c7] peer-checked:bg-[#A729F5] transition-colors duration-200`}
        ></div>
        <motion.div
          className="absolute left-[3px] top-1/2 w-4 h-4 bg-white rounded-full"
          animate={{ x: isDark ? 22 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ y: '-50%' }}
        />
      </label>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'moon-light' : 'moon-dark'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {!isDark ? (
            <img src={'/frontend-quiz-app/icon-moon-dark.svg'} alt="moon-dark" />
          ) : (
            <img src={'/frontend-quiz-app/icon-moon-light.svg'} alt="moon-light" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
export default Toggle
