import styles from './index.module.scss'
import { useState, useEffect } from 'react'
import TimerSvg from 'components/svg/TimerSvg'


interface Props {
  seconds: number
  key: number
}

export default function Timer({ seconds }: Props) {

  const [countdown, setCountdown] = useState<number>(seconds)

  useEffect(() => {
    if (countdown <= 0) {
      return
    }

    const timer = setInterval(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  return (
    <div className={styles.root}>
      <TimerSvg className={styles.timer}/>
      <div className={styles.seconds}>
        {countdown}c.
      </div>
    </div>
  )
}
