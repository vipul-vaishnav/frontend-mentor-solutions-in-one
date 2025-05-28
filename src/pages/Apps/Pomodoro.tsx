import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { TIMERS } from '../../lib/pomodoro.constants'

import Modal from '../../components/shared/Modal'
import Timer from '../../components/Pomodoro/Timer'
// import TestTimer from '../../components/TestTimer'

type Theme = 'red' | 'purple' | 'teal'

const Pomodoro: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('red')
  const [timers, setTimers] = useState({
    pomodoro: TIMERS[0].MINUTES as number,
    'short break': TIMERS[1].MINUTES as number,
    'long break': TIMERS[2].MINUTES as number
  })
  const [mode, setMode] = useState<(typeof TIMERS)[number]['NAME']>('pomodoro')
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState({
    pomodoro: timers.pomodoro,
    'short break': timers['short break'],
    'long break': timers['long break'],
    color: theme
  })
  const [timerStatus, setTimerStatus] = useState<'running' | 'paused' | 'finished'>('paused')
  const [showToast, setShowToast] = useState(false)

  const changeTheme = (newTheme: Theme) => setTheme(newTheme)
  const changeMode = (newMode: (typeof TIMERS)[number]['NAME']) => setMode(newMode)
  const getBgColor = () => {
    let bgColor = ''
    switch (theme) {
      case 'red':
        bgColor = 'bg-pomored'
        break
      case 'purple':
        bgColor = 'bg-pomopurple'
        break
      case 'teal':
        bgColor = 'bg-pomoteal'
        break
      default:
        bgColor = 'bg-pomored'
        break
    }

    return bgColor
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onApplySettings = () => {
    if (timerStatus === 'running') {
      changeTheme(settings.color)
      return handleClose()
    }

    changeTheme(settings.color)
    setTimers({
      pomodoro: settings.pomodoro,
      'short break': settings['short break'],
      'long break': settings['long break']
    })
    handleClose()
  }

  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 3000)
    }
  }, [showToast])

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {showToast && (
          <motion.div
            className="bg-white max-w-md w-full mx-auto text-[#1e213f] font-bold p-6 text-lg drop-shadow-2xl shadow-white rounded-lg text-center fixed bottom-1/4 translate-y-1/2 left-1/2 -translate-x-1/2 z-[99999]"
            initial={{ opacity: 0, scale: 0.25, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.25, y: 100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>A timer is running. Pause it to change mode</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal open={open} onClose={handleClose} closeOnBackdropClick>
        <div className="p-4 w-full">
          <div className="flex items-center justify-between pb-8 border-b border-[#dbdfed]">
            <h6 className="text-3xl font-bold text-[]">Settings</h6>
            <button
              onClick={handleClose}
              className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
            >
              <img src={'/pomodoro/icon-close.svg'} alt="close icon" />
            </button>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-semibold uppercase tracking-widest">Time (minutes)</p>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <p className="text-xs font-semibold mb-3 text-gray-500">pomodoro</p>
                  <div className="w-full h-14 bg-[#eff1fa] rounded-xl flex items-center justify-between px-4 py-4">
                    <p className="font-semibold ">{settings.pomodoro}</p>
                    <div className="flex flex-col items-center h-full justify-between">
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() => setSettings((prev) => ({ ...prev, pomodoro: Math.min(prev.pomodoro + 1, 60) }))}
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-up.svg'} alt="increase time" />
                      </button>
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() => setSettings((prev) => ({ ...prev, pomodoro: Math.max(prev.pomodoro - 1, 1) }))}
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-down.svg'} alt="decrease time" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-3 text-gray-500">short break</p>
                  <div className="w-full h-14 bg-[#eff1fa] rounded-xl flex items-center justify-between px-4 py-4">
                    <p className="font-semibold ">{settings['short break']}</p>
                    <div className="flex flex-col items-center h-full justify-between">
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, 'short break': Math.min(prev['short break'] + 1, 60) }))
                        }
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-up.svg'} alt="increase time" />
                      </button>
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, 'short break': Math.max(prev['short break'] - 1, 1) }))
                        }
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-down.svg'} alt="decrease time" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-3 text-gray-500">long break</p>
                  <div className="w-full h-14 bg-[#eff1fa] rounded-xl flex items-center justify-between px-4 py-4">
                    <p className="font-semibold ">{settings['long break']}</p>
                    <div className="flex flex-col items-center h-full justify-between">
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, 'long break': Math.min(prev['long break'] + 1, 60) }))
                        }
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-up.svg'} alt="increase time" />
                      </button>
                      <button
                        disabled={timerStatus === 'running'}
                        onClick={() =>
                          setSettings((prev) => ({ ...prev, 'long break': Math.max(prev['long break'] - 1, 1) }))
                        }
                        className="hover:scale-110 transition-all duration-300 active:scale-95 hover:opacity-100 opacity-50 active:opacity-50"
                      >
                        <img src={'/pomodoro/icon-arrow-down.svg'} alt="decrease time" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {timerStatus === 'running' && (
              <p className="text-red-500 font-medium text-xs">
                A {mode} timer is running. You cannot change its value.
              </p>
            )}
            <div className="flex items-center justify-between">
              <p className="font-semibold uppercase tracking-widest">Color</p>

              <div className="flex items-center gap-3">
                {['red', 'purple', 'teal'].map((color) => (
                  <button
                    onClick={() => setSettings({ ...settings, color: color as Theme })}
                    key={color}
                    className="p-1 border border-transparent transition-all duration-300 rounded-full hover:border-[#d7e0ff]"
                  >
                    <div
                      className={twMerge(
                        'w-9 h-9 rounded-full flex items-center justify-center',
                        color === 'red' ? 'bg-pomored' : color === 'purple' ? 'bg-pomopurple' : 'bg-pomoteal'
                      )}
                    >
                      <AnimatePresence>
                        {settings.color === color && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.25 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.25 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onApplySettings}
            className={twMerge(
              'sm:absolute w-38 block mx-auto sm:mt-0 mt-4 sm:top-full sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 p-3.5 rounded-full font-semibold text-white hover:brightness-125 transition-all duration-300 active:scale-95',
              getBgColor()
            )}
          >
            Apply
          </button>
        </div>
      </Modal>
      <main className="min-h-dvh w-full max-w-screen bg-[#1e213f] text-white py-14 px-6">
        <div className="max-w-max mx-auto">
          <img src={'/pomodoro/logo.svg'} alt="pomodoro logo" />
        </div>

        <div className="sm:w-md sm:max-w-full max-w-sm w-full mx-auto my-12 bg-[#161932] rounded-full flex items-center justify-between p-2 relative">
          {TIMERS.map((timer, idx) => {
            const isActive = timer.NAME === mode

            return (
              <button
                onClick={() => {
                  if (timerStatus === 'running') {
                    setShowToast(true)
                  } else {
                    changeMode(timer.NAME)
                  }
                }}
                key={idx}
                className={`relative w-full text-center transition-all duration-300 rounded-full py-3.5 sm:px-4 px-3 font-semibold text-xs sm:text-sm z-10 ${
                  isActive ? 'text-[#161932]' : 'text-[#eff1fa]/50 hover:text-[#d7e0ff]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="highlight"
                    className={`absolute inset-0 ${getBgColor()} rounded-full z-[-1]`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                {timer.NAME}
              </button>
            )
          })}
        </div>

        <div className="mx-auto max-w-full w-full">
          <Timer theme={theme} setTimerStatus={setTimerStatus} timerStatus={timerStatus} mode={mode} timers={timers} />
        </div>

        <button onClick={() => setOpen(true)} className="block mx-auto mt-12">
          <img src={'/pomodoro/icon-settings.svg'} alt="settings icon" className="w-6 h-6" />
        </button>
      </main>
      {/* <div className="bg-[#212529] text-[#e9ecef] grid place-items-center w-full py-6 px-5 min-h-dvh">
        <TestTimer />
      </div> */}
    </React.Fragment>
  )
}
export default Pomodoro
