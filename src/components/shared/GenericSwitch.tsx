import React from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type GenericSwitchProps = {
  value: boolean
  onChange: (value: boolean) => void
  switchBallClasses?: string
  switchClasses?: string
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
}

const GenericSwitch: React.FC<GenericSwitchProps> = (props) => {
  const {
    onChange,
    value,
    switchBallClasses = '',
    switchClasses = '',
    leftAdornment = null,
    rightAdornment = null
  } = props

  return (
    <div className="flex items-center gap-5 max-w-max">
      {leftAdornment}
      <label
        htmlFor="switch"
        className={twMerge(
          `relative cursor-pointer border bg-[#A729F5] border-[#A729F5] transition-all duration-200 rounded-full w-11 h-6 $`,
          switchClasses
        )}
      >
        <motion.div
          animate={{ x: value ? 20.5 : 0 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          className={twMerge(` bg-white w-4 h-4 rounded-full left-[3px] absolute top-[3px]`, switchBallClasses)}
        />
        <input
          type="checkbox"
          name="theme-switch"
          id="switch"
          checked={value}
          onChange={() => onChange(!value)}
          hidden
        />
      </label>
      {rightAdornment}
    </div>
  )
}
export default GenericSwitch
