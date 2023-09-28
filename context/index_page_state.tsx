import {createContext, ReactElement, useContext, useEffect, useRef, useState} from 'react'
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
}


const defaultValue: IState = {
  unitIndex: null,
  unitInitialIndex: null,
  categories: [],
  isLoaded: false,
  isLoading: false,
  filter: {},
  setFilter: () => null,
  setFilterCategories: () => null
}

const IndexPageContext = createContext<IState>(defaultValue)

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
    // await fetchUnitIndex()
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [appContext.currentLocation])

  useEffect(() => {
    // console.log(filter)
    // filterRef.current = filter
    fetchUnitIndex()
  }, [filter])

  const value: IState = {
    ...defaultValue,
    categories,
    unitIndex,
    unitInitialIndex,
    filter,
    isLoaded,
    isLoading,
    setFilter: async (filter: IndexFilterFormData): Promise<boolean> => {
      filterRef.current = filter
      setFilterState(filter)
      setIsLoading(true)
      await fetchUnitIndex()
      setIsLoading(false)
      return true
    },
    setFilterCategories
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
