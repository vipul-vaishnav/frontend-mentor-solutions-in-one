import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import type { TIMERS } from '../../lib/pomodoro.constants'

type Theme = 'red' | 'purple' | 'teal'

type ProgressCircleProps = {
  keyTrigger: number
  theme: Theme
  timerStatus: 'running' | 'paused' | 'finished'
  durationInSeconds: number
}

const strokeColors: Record<Theme, string> = {
  red: '#f87070',
  purple: '#d881f8',
  teal: '#70f3f8'
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ keyTrigger, theme, timerStatus, durationInSeconds }) => {
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

  const controls = useAnimation()
  const progress = useMotionValue(circumference)

  useEffect(() => {
    if (timerStatus === 'running') {
      controls.start({
        strokeDashoffset: 0,
        transition: {
          duration: durationInSeconds,
          ease: 'linear'
        }
      })
    } else if (timerStatus === 'paused') {
      controls.stop()
    } else if (timerStatus === 'finished') {
      controls.set({ strokeDashoffset: 0 })
    }
  }, [timerStatus, durationInSeconds, controls])

  // Reset on timer restart (keyTrigger)
  useEffect(() => {
    controls.set({ strokeDashoffset: circumference })
  }, [keyTrigger, circumference, controls])

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-90"
    >
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke={strokeColors[theme]}
        strokeWidth={stroke}
        strokeLinecap="square"
      />
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#161932"
        strokeWidth={stroke + 1}
        strokeDasharray={circumference}
        animate={controls}
        style={{ strokeDashoffset: progress }}
      />
    </svg>
  )
}

// =============================================================================

type TimerProps = {
  theme: Theme
  mode: (typeof TIMERS)[number]['NAME']
  timerStatus: 'running' | 'paused' | 'finished'
  setTimerStatus: React.Dispatch<React.SetStateAction<'running' | 'paused' | 'finished'>>
  timers: {
    pomodoro: number
    'short break': number
    'long break': number
  }
}

const Timer: React.FC<TimerProps> = (props) => {
  const { theme, setTimerStatus, timerStatus, mode, timers } = props
  const [timerMinutes, setTimerMinutes] = useState(timers[mode])
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    setTimerMinutes(timers[mode])
    setTimerSeconds(0)
  }, [mode, timers])

  useEffect(() => {
    if (timerStatus === 'running') {
      if (timerMinutes === 0 && timerSeconds === 0) {
        setTimerStatus('finished')
      }

      const interval = setInterval(() => {
        if (timerSeconds === 0) {
          setTimerMinutes((prev) => prev - 1)
        }

        setTimerSeconds((prev) => (prev === 0 ? 59 : prev - 1))
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [setTimerStatus, timerMinutes, timerSeconds, timerStatus])

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
          <ProgressCircle
            keyTrigger={timerMinutes}
            theme={theme}
            timerStatus={timerStatus}
            durationInSeconds={timers[mode] * 60}
          />
          <h1 className="mb-8 font-bold text-7xl sm:text-[116px]">
            {timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}
          </h1>

          <button
            onClick={() => {
              if (timerStatus === 'running') {
                setTimerStatus('paused')
              } else if (timerStatus === 'paused') {
                setTimerStatus('running')
              } else {
                console.log('Re Starting')
              }
            }}
            className={twMerge(
              'sm:font-bold font-semibold sm:text-3xl uppercase text-xl transition-all duration-300 tracking-[9px] z-[999] relative',
              getColor()
            )}
          >
            {timerStatus === 'paused' ? 'Start' : timerStatus === 'finished' ? 'Re Start' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Timer
