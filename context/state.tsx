import {createContext, useContext, useState} from 'react'
import { IRegion } from 'types/types'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  currentRegion: IRegion
}

const defaultValue: IState = {
  isMobile: false,
  isDesktop: true,
  currentRegion: null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile?: boolean
}

export function AppWrapper(props: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [region, setRegion] = useState<IRegion>()

  const value: IState = {
    ...defaultValue,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    currentRegion: null
  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
