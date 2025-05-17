import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

const Celebration: React.FC = () => {
  const [width, setWidth] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth - 20)
    }

    handleWidthChange()
  }, [])

  useEffect(() => {
    setTimeout(() => setHide(true), 10000)
  }, [])

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {!hide && (
          <motion.div
            key="confetti"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: width,
              pointerEvents: 'none',
              zIndex: 9999
            }}
          >
            <ReactConfetti width={width} recycle={false} numberOfPieces={1000} />
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
export default Celebration
