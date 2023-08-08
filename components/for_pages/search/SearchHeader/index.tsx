import useThrottleFn from '@react-cmpt/use-throttle/lib/useThrottleFn'
import classNames from 'classnames'
import CloseCircleSvg from 'components/svg/CloseCircle'
import LoupeSvg from 'components/svg/LoupeSvg'
import { useAppContext } from 'context/state'
import { ISearchBrandsRequest } from 'data/interfaces/ISearchBrandsRequest'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  onChange?: (data: ISearchBrandsRequest)=> void
  isSticky?: boolean 
  distanceFromTop?: number
  inputValue?: string
}

export default function SearchHeader(props: Props) {

  const appState = useAppContext()

  const router = useRouter()

  const [inputValue, changeInputValue] = useState<string>(props.inputValue||'')

  //TODO: вынести дебаунс наверх
  const withThrottle = useThrottleFn((data)=> {    
    props.onChange(data)
  }, 300)

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    changeInputValue(value)
  }

  const exitHandler = () => {
    router.back()
  }

  useEffect(()=>{
    const data: ISearchBrandsRequest = {
      location:  appState.currentLocation,
      search: inputValue
    }
    withThrottle.callback(data)
  }, [inputValue])
   
  return  (
    <div className={classNames(styles.searchHeader, props.distanceFromTop < 0 && styles.searchHeader_active)}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchSvgWrapper}>
          <LoupeSvg color={colors.white} className={styles.svgLoupe}/>
        </div>
        <input className={styles.input} type="text" name="searchText" placeholder='Поиск' onChange={changeInputHandler} value={inputValue}/>
        {inputValue.length > 0 && 
          <div className={styles.crossSvgWrapper} onClick={()=> {changeInputValue('')}}>
            <CloseCircleSvg  />
          </div>
        }
      </div>
      <p className={styles.exit} onClick={exitHandler}>Отмена</p>
    </div>
  )
    
}