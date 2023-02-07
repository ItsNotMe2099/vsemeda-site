import {createContext, ReactElement, useContext, useEffect, useState} from 'react'
import {useAppContext} from 'context/state'
import UnitRepository from 'data/repositories/UnitRepository'
import {IMenuCategory} from 'data/interfaces/IMenu'
import {IUnit} from 'data/interfaces/IUnit'

interface IState {
  unit: IUnit | null,
  menu: IMenuCategory[],
  activeCategoryId: string | null

}


const defaultValue: IState = {
  unit: null,
  menu: [],
  activeCategoryId: null
}

const UnitContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
  id: string
  initialUnit: IUnit
}

export function UnitWrapper(props: Props) {
  const appContext = useAppContext()
  const [menu, setMenu] = useState<IMenuCategory[]>([])
  const [unit, setUnit] = useState<IUnit>(props.initialUnit)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const init = async () => {
    console.log('appContext.currentLocation', appContext.currentLocation)
    const [unit, menu] = await Promise.all([
      UnitRepository.fetchById(props.id, appContext.currentLocation),
      UnitRepository.fetchMenuById(props.id, appContext.currentLocation)
    ])
    setUnit(unit)
    setMenu(menu)
  }
  useEffect(() => {
    init()
  }, [props.id])
  const value: IState = {
    ...defaultValue,
      unit,
      menu,
     activeCategoryId
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
