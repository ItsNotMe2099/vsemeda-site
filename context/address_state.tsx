import {createContext, ReactElement, useContext, useState} from 'react'
import {useAppContext} from 'context/state'
import {ICart} from 'data/interfaces/ICart'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {DeepPartial} from 'types/types'
import UserAddressRepository from 'data/repositories/UserAddressRepository'
import {useLocalStorage} from '@rehooks/local-storage'
import {LocalStorageKey} from 'types/enums'
import { writeStorage } from '@rehooks/local-storage'
import { v4 as uuidv4 } from 'uuid'
interface IState {
  addresses: IUserAddress[];
  initialLoaded: boolean;
  create: (data: DeepPartial<IUserAddress>) => void
  update: (id: string, data: DeepPartial<IUserAddress>)  => void
  delete: (id: string) => Promise<IUserAddress>
}


const defaultValue: IState = {
  addresses: [],
  initialLoaded: false,
  create: (data: DeepPartial<IUserAddress>) => null,
  update: (id: string, data: DeepPartial<IUserAddress>) => null,
  delete: (id: string)  => null,
}

const AddressContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}
type QuantityMap = {[key: string]: number}
type BoolMap = {[key: string]: boolean}
type DebounceMap = {[key: string]: () => void}
export function AddressWrapper(props: Props) {
  const appContext = useAppContext()
  const [addressLocal] = useLocalStorage<IUserAddress[]>(LocalStorageKey.addresses, [])
  const [addresses, setAddresses] = useState<IUserAddress[]>([])
  const [initialLoaded, setInitialLoaded] = useState(true)

  const fetch = async (): Promise<IUserAddress[]> => {
    if(appContext.isLogged){

    }else{

    }
    return []
  }
  const createReq = async (data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    return UserAddressRepository.create(data)
  }
  const updateReq = async (id: string, data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    return UserAddressRepository.update(id, data)
  }
  const deleteReq = async (id: string): Promise<ICart> => {
    return  UserAddressRepository.delete(id)
  }

  const createLoc = async (data: DeepPartial<IUserAddress>) => {
     data.id = uuidv4()
     writeStorage<IUserAddress[]>(LocalStorageKey.addresses, [data as IUserAddress, ...addresses])
  }
  const updateLoc = async (id: string, data: DeepPartial<IUserAddress>): Promise<any> => {
    writeStorage<IUserAddress[]>(LocalStorageKey.addresses, addresses.map(i => i.id === id ? {...i, data} : i))
  }
  const deleteLoc = async (id: string): Promise<any> => {
    writeStorage<IUserAddress[]>(LocalStorageKey.addresses, addresses.filter(i => i.id !== id))

  }

  const value: IState = {
    ...defaultValue,
    initialLoaded,
    addresses: appContext.user?.addresses ?? addressLocal,
    create: (data: DeepPartial<IUserAddress>) => {
      if(appContext.isLogged){
        return createReq(data)
      }else{
        return createLoc(data)
      }
    },
    update: (id: string, data: DeepPartial<IUserAddress>) => {
      if(appContext.isLogged){
        return updateReq(id, data)
      }else{
        return updateLoc(id, data)
      }
    },
    delete: (id: string)  => {
      if(appContext.isLogged){
        return deleteReq(id)
      }else{
        return deleteLoc(id)
      }
    },
  }

  return (
    <AddressContext.Provider value={value}>
      {props.children}
    </AddressContext.Provider>
  )
}

export function useAddressContext() {
  return useContext(AddressContext)
}
