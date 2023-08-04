import classNames from 'classnames'
import CloseCircleSvg from 'components/svg/CloseCircle'
import LoupeSvg from 'components/svg/LoupeSvg'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  onChange?: ()=> void
  isSticky?: boolean 
  distanceFromTop?: number
  inputValue?: string
}

export default function SearchHeader(props: Props) {

  const router = useRouter()

    const [inputValue, changeInputValue] = useState<string>(props.inputValue||'')

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeInputValue(e.target.value)
    }

    const exitHandler = () => {
      router.back()
    }
   
  return  (
    <div className={classNames(styles.searchHeader, props.distanceFromTop < 0 && styles.searchHeader_active)}>
        <div className={styles.inputWrapper}>
            <div className={styles.searchSvgWrapper}>
                <LoupeSvg color={colors.white} className={styles.svgLoupe}/>
            </div>
            <input className={styles.input} type="text" name="searchText" placeholder='Поиск' onChange={changeInputHandler} value={inputValue}/>
            <div className={styles.crossSvgWrapper} onClick={()=> {changeInputValue('')}}>
              <CloseCircleSvg  />
            </div>
        </div>
        <p className={styles.exit} onClick={exitHandler}>Отмена</p>
    </div>
  )
    
}