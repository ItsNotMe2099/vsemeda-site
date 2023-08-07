import {createContext, ReactElement, useContext, useEffect, useState} from 'react'
import {useAppContext} from 'context/state'
import UnitRepository from 'data/repositories/UnitRepository'
import {IMenuCategory} from 'data/interfaces/IMenu'
import {IUnit} from 'data/interfaces/IUnit'

import * as Scroll from 'react-scroll'
import {useRouter} from 'next/router'
import {RequestError} from 'types/types'
import {SnackbarType} from 'types/enums'

interface IState {
  unit: IUnit | null,
  menu: IMenuCategory[],
  activeCategoryId: string | null
  setActiveCategory: (id: string)=> void
  scrollToCategory: (category: IMenuCategory) => void
  scrollToCategoryFired: boolean
  isAvailable: boolean
}


const defaultValue: IState = {
  unit: null,
  menu: [],
  activeCategoryId: null,
  setActiveCategory: (id: string) => null,
  scrollToCategory: (category: IMenuCategory) => null,
  scrollToCategoryFired: false,
  isAvailable: true,
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
  const [isAvailable, setIsAvailable] = useState(false)
  const [scrollToCategoryFired, setScrollFired] = useState<boolean>(false)

  /*
    Получаем unit
    Не получили unit находим ближайший чтобы получить меню

    Нет координат есть placeSlug
    Запрашиваем fetchBySlug - всегда вернется
    Нет Координа нет placeSlug
    запрашиваем fetchByBrandSlug
    Есть координаты есть placeSlug
    запрашиваем fetchBySlug
    если 404 то fetchBySlug
    Есь Координаты нет placeSlug
   */
  const fetchUnit = (): Promise<IUnit> => {

    try{

    }catch (err) {
      if (err instanceof RequestError) {
        if(err.code === 404){
          return UnitRepository.fetchByBrandSlug(props.brandSlug, {...(appContext.currentLocation ?? {}),  regionId: 7})
        }else {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    }
  }
  const fetchUnitByBrand = () => {

  }
  const setActiveCategory = (id: string) => {
    setActiveCategoryId(id)
  }

  const scrollToCategory = (category: IMenuCategory) => {
    setScrollFired(true)
    setActiveCategoryId(category.id)
    const target = document.getElementById(`category-${category.id}`)
    const offsetTop = target.getBoundingClientRect().top
    Scroll.animateScroll.scrollTo(offsetTop + document.documentElement.scrollTop - 100, {behavior: 'smooth'})
    setTimeout(()=> {
      setScrollFired(false)

    }, 2000)
  }

  const init = async () => {
    const [unit, menu] = router.query.place ? await Promise.all([
        UnitRepository.fetchBySlug(router.query.place as string, appContext.currentLocation),
        UnitRepository.fetchMenuBySlug(router.query.place as string, appContext.currentLocation)
      ]) : await Promise.all([
        UnitRepository.fetchByBrandSlug(props.brandSlug, {...(appContext.currentLocation ?? {}),  regionId: 7}),
        UnitRepository.fetchMenuByBrandSlug(props.brandSlug, {...(appContext.currentLocation ?? {})})])

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
    setActiveCategory,
    scrollToCategory,
    scrollToCategoryFired
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
