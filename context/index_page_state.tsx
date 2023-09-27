import {createContext, ReactElement, useContext, useEffect, useRef, useState} from 'react'
import {useAppContext} from 'context/state'
import UnitRepository from 'data/repositories/UnitRepository'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import {ICategory} from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import {IndexFilterFormData} from 'types/form_data/IndexFilterFormData'

interface IState {
  unitIndex: IUnitIndex | null,
  categories: ICategory[],
  isLoaded: boolean
  isLoading: boolean
  filter: IndexFilterFormData
  setFilter: (filter: IndexFilterFormData) => void
  setFilterCategories: (categories: number[]) => void
}


const defaultValue: IState = {
  unitIndex: null,
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
  const [unitIndex, setUnitIndex] = useState<IUnitIndex>()
  const [filter, setFilterState] = useState<IndexFilterFormData>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const filterRef = useRef<IndexFilterFormData>({})
  const fetchUnitIndex = async () => {
    await UnitRepository.fetchUnitIndex({ location: appContext.currentLocation, ...filterRef.current, regionId: 7 }).then(i => setUnitIndex(i))
  }
  const fetchCategories = async () => {
    await MenuRepository.fetchCategories().then(i => setCategories(i))
  }
  const init = async () => {
    await Promise.all([fetchUnitIndex(), fetchCategories()])
    setIsLoaded(true)
  }
  const setFilterCategories = async (categories: number[]) => {
    filterRef.current = {...filterRef.current, categories}
    // setFilterState(filterRef.current)

    setIsLoading(true)
    await fetchUnitIndex()
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [appContext.currentLocation])

  useEffect(() => {
    console.log(filter)
    filterRef.current = filter
  }, [filter])

  const value: IState = {
    ...defaultValue,
    categories,
    unitIndex,
    filter,
    isLoaded,
    isLoading,
    setFilter: async (filter: IndexFilterFormData) => {
      filterRef.current = filter
      setFilterState(filter)
      setIsLoading(true)
      await fetchUnitIndex()
      setIsLoading(false)
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
