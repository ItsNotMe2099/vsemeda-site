import {createContext, ReactElement, useContext, useEffect, useState} from 'react'
import {useAppContext} from 'context/state'
import UnitRepository from 'data/repositories/UnitRepository'
import {IMenuCategory} from 'data/interfaces/IMenu'
import {IUnit} from 'data/interfaces/IUnit'

import * as Scroll from 'react-scroll'
import {useRouter} from 'next/router'

interface IState {
  unit: IUnit | null,
  menu: IMenuCategory[],
  activeCategoryId: string | null
  scrollToCategory: (category: IMenuCategory) => void

}


const defaultValue: IState = {
  unit: null,
  menu: [],
  activeCategoryId: null,
  scrollToCategory: (category: IMenuCategory) => null,
}

const UnitContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
  initialUnit: IUnit
  brandSlug: string
}

export function UnitWrapper(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [menu, setMenu] = useState<IMenuCategory[]>([])
  const [unit, setUnit] = useState<IUnit>(props.initialUnit)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const init = async () => {
    const [unit, menu] = router.query.place ? await Promise.all([
        UnitRepository.fetchBySlug(router.query.place as string, appContext.currentLocation),
        UnitRepository.fetchMenuBySlug(router.query.place as string, appContext.currentLocation)
      ]) : await Promise.all([
        UnitRepository.fetchByBrandSlug(props.brandSlug, appContext.currentLocation),
        UnitRepository.fetchMenuByBrandSlug(props.brandSlug, appContext.currentLocation)])

    setUnit(unit)
    setMenu(menu)
  }
  useEffect(() => {
     init()
  }, [props.brandSlug, router.query.place, appContext.currentLocation])

  const value: IState = {
    ...defaultValue,
    unit,
    menu,
    activeCategoryId,
    scrollToCategory: (category: IMenuCategory) => {
      const target = document.getElementById(`category-${category.id}`)
      const offsetTop = target.getBoundingClientRect().top
      Scroll.animateScroll.scrollTo(offsetTop + document.documentElement.scrollTop - 100, {behavior: 'smooth'})
    }
  }

  return (
    <UnitContext.Provider value={value}>
      {props.children}
    </UnitContext.Provider>
  )
}

export function useUnitContext() {
  return useContext(UnitContext)
}
