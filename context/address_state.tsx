import {createContext, ReactElement, useContext} from 'react'
import {useAppContext} from 'context/state'
import {ICart} from 'data/interfaces/ICart'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {DeepPartial} from 'types/types'
import UserAddressRepository from 'data/repositories/UserAddressRepository'
import {LocalStorageKey} from 'types/enums'
import { writeStorage } from '@rehooks/local-storage'
import { v4 as uuidv4 } from 'uuid'
interface IState {
  currentAddress?: IUserAddress;
  addresses: IUserAddress[];
  initialLoaded: boolean;
  create: (data: DeepPartial<IUserAddress>) => void
  update: (id: string, data: DeepPartial<IUserAddress>)  => void
  delete: (id: string) => Promise<IUserAddress>
  setCurrentAddress: (address: IUserAddress) => void,
}


const defaultValue: IState = {
  currentAddress: null,
  addresses: [],
  initialLoaded: false,
  create: (data: DeepPartial<IUserAddress>) => null,
  update: (id: string, data: DeepPartial<IUserAddress>) => null,
  delete: (id: string)  => null,
  setCurrentAddress: (address: IUserAddress) => null,
}

const AddressContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}
export function AddressWrapper(props: Props) {
  const appContext = useAppContext()

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
     writeStorage<IUserAddress[]>(LocalStorageKey.addresses, [data as IUserAddress, ...appContext.addresses])
  }
  const updateLoc = async (id: string, data: DeepPartial<IUserAddress>): Promise<any> => {
    writeStorage<IUserAddress[]>(LocalStorageKey.addresses, appContext.addresses.map(i => i.id === id ? {...i, ...data as IUserAddress} : i))
  }
  const deleteLoc = async (id: string): Promise<any> => {
    writeStorage<IUserAddress[]>(LocalStorageKey.addresses, appContext.addresses.filter(i => i.id !== id))

  }


  const value: IState = {
    ...defaultValue,
    addresses: appContext.addresses,
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
    setCurrentAddress: (address: IUserAddress) => {
      appContext.setCurrentAddress(address)
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
