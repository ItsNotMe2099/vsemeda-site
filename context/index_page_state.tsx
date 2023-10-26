import {createContext, MutableRefObject, ReactElement, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from 'context/state'
import UnitRepository from 'data/repositories/UnitRepository'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import {ICategory} from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import {IndexFilterFormData} from 'types/form_data/IndexFilterFormData'
// import UnitSlider from 'components/for_pages/Common/UnitSlider'
// import { IViewLayoutItem } from 'data/interfaces/IViewLayout'

interface IState {
  unitInitialIndex: IUnitIndex | null
  unitIndex: IUnitIndex | null,
  categories: ICategory[],
  isLoaded: boolean
  isLoading: boolean
  filter: IndexFilterFormData
  setFilter: (filter: IndexFilterFormData) => Promise<boolean>
  setFilterCategories: (categories: number[]) => void
  unitsSectionRef: MutableRefObject<HTMLDivElement>

}


const IndexPageContext = createContext<Partial<IState>>({})

interface Props {
  children: ReactElement | ReactElement[]
}

export function IndexPageWrapper(props: Props) {
  const appContext = useAppContext()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [unitIndex, setUnitIndex] = useState<IUnitIndex>(null)
  const [unitInitialIndex, setUnitInitialIndex] = useState<IUnitIndex>()
  const [filter, setFilterState] = useState<IndexFilterFormData>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const filterRef = useRef<IndexFilterFormData>({})
  const unitsSectionRef = useRef<HTMLDivElement>(null!)

  const fetchUnitIndex = async (refreshInit: boolean = false) => {
    await UnitRepository.fetchUnitIndex({ location: appContext.currentLocation, ...filterRef.current, ...filter, regionId: 7 })
    .then(i => {
      if(!unitInitialIndex ||refreshInit) {
        setUnitInitialIndex(i)
      }
      setUnitIndex(i)
    })
  }

  const fetchCategories = async () => {
    await MenuRepository.fetchCategories().then(i => setCategories(i))
  }

  const init = async () => {
    await Promise.all([fetchUnitIndex(true), fetchCategories()])
    setIsLoaded(true)
  }

  const setFilterCategories = async (categories: number[]) => {
    filterRef.current = {...filterRef.current, categories}
    setFilterState(state=> {return {...state, categories: [...categories]}})
    setIsLoading(true)
    setIsLoading(false)
  }

  const setFilter = async (filter: IndexFilterFormData): Promise<boolean> => {
    filterRef.current = filter
    setFilterState(filter)
    setIsLoading(true)
    await fetchUnitIndex()
    setIsLoading(false)
    return true
  }

  useEffect(() => {
    if(appContext.initialLoaded) {
      init()
    }
  }, [appContext.initialLoaded, appContext.currentLocation])

  useEffect(() => {
    if(appContext.currentLocation) {
      fetchUnitIndex()
    }
  }, [filter])

  const value: IState = {
    categories,
    unitIndex,
    unitInitialIndex,
    filter,
    isLoaded,
    isLoading,
    setFilter,
    setFilterCategories,
    unitsSectionRef

  }

  return (
    <IndexPageContext.Provider value={value}>
      {props.children}
    </IndexPageContext.Provider>
  )
}

export function useIndexPageContext() {
  return useContext(IndexPageContext)
}
