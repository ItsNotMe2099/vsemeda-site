import { createContext, useContext, useState } from 'react'
import { IRegion } from 'types/types'
import { useRouter } from 'next/router'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  region: IRegion
  updateRegion: (slug: string) => void
}

const defaultValue: IState = {
  isMobile: false,
  isDesktop: true,
  region: null,
  updateRegion: () => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile?: boolean
}

export function AppWrapper(props: Props) {
  //temp
  const regions = [
    {
      id: 2,
      name: 'Санкт-Петербург',
      default_address: 'Невский 18',
      slug: 'sankt-peterburg',
      is_default: true,
      latitude: 59.936557,
      longtitude: 30.318249
    },
    {
      id: 1,
      name: 'Москва',
      default_address: 'Большая садовая улица, 94',
      slug: 'moskva',
      is_default: false,
      latitude: 47.222066,
      longtitude: 39.718112
    }
  ]
  //temp
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [region, setRegion] = useState<IRegion>(regions[0])
  const router = useRouter()

  const updateRegion = (slug: string) => {
    const region = regions.find(i => i.slug === slug)
    setRegion(region)
    router.push(`/${region.slug}`)
  }

  const value: IState = {
    ...defaultValue,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    region: region,
    updateRegion
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
