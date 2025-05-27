import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

type Theme = 'red' | 'purple' | 'teal'

type TimerProps = {
  theme: Theme
}

type ProgressCircleProps = {
  keyTrigger: number
  theme: Theme
}

const strokeColors: Record<Theme, string> = {
  red: '#f87070',
  purple: '#d881f8',
  teal: '#70f3f8'
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ keyTrigger, theme }) => {
  const getDeviceType = (): 'small' | 'large' => {
    const width = window.innerWidth
    if (width <= 640) return 'small'
    return 'large'
  }

  const [deviceType, setDeviceType] = useState<'small' | 'large'>(getDeviceType())

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const radius = deviceType === 'large' ? 200 : 130
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius

  return (
    <svg
      key={keyTrigger}
      width={radius * 2}
      height={radius * 2}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-90"
    >
      <circle cx={radius} cy={radius} r={normalizedRadius} fill="transparent" stroke={'#161932'} strokeWidth={stroke} />
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke={strokeColors[theme]}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 60, ease: 'linear' }}
      />
    </svg>
  )
}

const Timer: React.FC<TimerProps> = (props) => {
  const { theme } = props
  const timerMinutes = 25
  const timerSeconds = 0

  const getColor = () => {
    let color = ''
    switch (theme) {
      case 'red':
        color = 'hover:text-pomored'
        break
      case 'purple':
        color = 'hover:text-pomopurple'
        break
      case 'teal':
        color = 'hover:text-pomoteal'
        break
      default:
        color = 'hover:text-pomored'
        break
    }

    return color
  }
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #0e112a, #2e325a)',
        boxShadow: '-5rem -5rem 10rem 0 #272c5a, 5rem 5rem 10rem 0 #121530'
      }}
      className="sm:w-[480px] mx-auto xs:max-w-xs sm:max-w-full aspect-square rounded-full flex items-center justify-center"
    >
      <div className="sm:w-[420px] relative w-[272px] aspect-square rounded-full bg-[#161932] flex items-center justify-center">
        <div className="text-center">
          <ProgressCircle keyTrigger={timerMinutes} theme={theme} />
          <h1 className="mb-8 font-bold text-7xl sm:text-[116px]">
            {timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}
          </h1>

          <button
            className={twMerge(
              'sm:font-bold font-semibold sm:text-3xl uppercase text-xl transition-all duration-300 tracking-[9px] z-[9999] relative',
              getColor()
            )}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}
export default Timer
