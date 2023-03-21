import styles from './index.module.scss'
import { ChangeEventHandler, useState } from 'react'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import LoupeSvg from 'components/svg/LoupeSvg'

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClick?: () => void
  style?: 'normal' | 'outlined' | 'transparent'
  autoFocus?: boolean
  isLoading?: boolean
  initialValue?: string
  placeholder?: string
}

export default function FieldSearch({ initialValue, placeholder, onChange, style, autoFocus, isLoading, onClick }: Props) {
  const [value, setValue] = useState(initialValue)
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
    onChange(e)
  }
  return (
    <div className={classNames({ [styles.root]: true }, styles[style])} onClick={onClick}>
      <input type="text" placeholder={placeholder ?? 'Поиск по заведению'} className={styles.input} value={value} autoFocus={autoFocus}
        onChange={handleChange}
      />
      <Button styleType='icon' spinner={isLoading} className={styles.btn} onClick={onClick}>
        <LoupeSvg color='#BDBDBD' />
      </Button>
    </div>
  )
}

