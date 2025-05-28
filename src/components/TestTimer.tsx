import React, { useEffect, useRef, useState } from 'react'
import styles from './TestTimer.module.css'

const TestTimer: React.FC = () => {
  const totalTimerMinutes = 1
  const [timerMinutes, setTimerMinutes] = useState(totalTimerMinutes)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerStatus, setTimerStatus] = useState<'paused' | 'running' | 'finished'>('paused')
  const progressRef = useRef<HTMLDivElement>(null)
  const hasPlayed = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getButtonText = () => {
    let text = ''
    switch (timerStatus) {
      case 'finished':
        text = 'Re Start'
        break
      case 'paused':
        text = 'Start'
        break
      case 'running':
        text = 'Pause'
        break
      default:
        text = 'Start'
        break
    }
    return text
  }

  const handleTimerButtonClick = () => {
    if (timerStatus === 'running') {
      setTimerStatus('paused')
    } else if (timerStatus === 'paused') {
      setTimerStatus('running')
    } else {
      setTimerMinutes(totalTimerMinutes)
      setTimerSeconds(0)
      setTimerStatus('running')

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      hasPlayed.current = false
    }
  }

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

      return () => clearInterval(interval)
    }
  }, [timerMinutes, timerSeconds, timerStatus])

  useEffect(() => {
    const totalSeconds = totalTimerMinutes * 60
    const remainingSeconds = timerMinutes * 60 + timerSeconds
    const percent = ((remainingSeconds / totalSeconds) * 100).toFixed(2)

    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress', percent)
    }
  }, [timerMinutes, timerSeconds, totalTimerMinutes])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/timesup.mp3')
      audioRef.current.loop = true
    }

    const audio = audioRef.current

    if (timerStatus === 'finished' && !hasPlayed.current) {
      audio.play()
      hasPlayed.current = true
    }

    if (timerStatus !== 'finished') {
      audio.pause()
      audio.currentTime = 0 // reset to start
      hasPlayed.current = false
    }
  }, [timerStatus])

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timer}>
        <div>
          <div ref={progressRef} className={styles.progress}></div>
          <h6 className={styles.timerMinutesAndSeconds}>
            {timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}
          </h6>

          <button onClick={handleTimerButtonClick} className={styles.timerControls}>
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  )
}
export default TestTimer
