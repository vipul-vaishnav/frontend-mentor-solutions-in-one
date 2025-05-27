import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeviceType } from '../../hooks/useDeviceType'
import { twMerge } from 'tailwind-merge'

type ModalProps = {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  closeOnBackdropClick?: boolean
  showCloseButton?: boolean
  modalClasses?: string
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const slideFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 }
}

const scaleCenter = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 }
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  closeOnBackdropClick = false,
  showCloseButton = false,
  modalClasses = ''
}) => {
  const device = useDeviceType()
  const isMobile = device === 'mobile'

  const modalVariants = isMobile ? slideFromBottom : scaleCenter

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center bg-black/50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => {
            if (closeOnBackdropClick && onClose) onClose()
          }}
        >
          <motion.div
            className={twMerge(
              `relative z-60 w-full sm:max-w-lg sm:mx-4 rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-lg`,
              modalClasses
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && onClose && (
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
