import {createContext, ReactElement, useContext, useEffect} from 'react'
import {useAppContext} from 'context/state'
import {ICart} from 'data/interfaces/ICart'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {DeepPartial} from 'types/types'
import UserAddressRepository from 'data/repositories/UserAddressRepository'
import {CookiesType, LocalStorageKey, SnackbarType} from 'types/enums'
import {writeStorage} from '@rehooks/local-storage'
import {v4 as uuidv4} from 'uuid'
import {useCookies} from 'react-cookie'
import CookiesUtils from 'utils/CookiesUtils'

interface IState {
  initialLoaded: boolean;
  create: (data: DeepPartial<IUserAddress>) => void
  refreshAddresses: ()=> Promise<boolean>
  update: (id: string, data: DeepPartial<IUserAddress>)  => Promise<boolean>
  deleteAddress: (id: string) => Promise<IUserAddress>
  setCurrentAddress: (address: IUserAddress) => void,
}


const defaultValue: IState = {
  initialLoaded: false,
  create: (data: DeepPartial<IUserAddress>) => null,
  refreshAddresses: ()=>null,
  update: (id: string, data: DeepPartial<IUserAddress>) => null,
  deleteAddress: (id: string)  => null,
  setCurrentAddress: (address: IUserAddress) => null,
}

const AddressContext = createContext<IState>(defaultValue)

interface Props {
  children: ReactElement | ReactElement[]
}
export function AddressWrapper(props: Props) {
  const appContext = useAppContext()
  const [cookies, setCookie, removeCookie] = useCookies([CookiesType.address])

  const setCurrentAddress = (address: IUserAddress) => {
    appContext.setCurrentAddress(address)
    writeStorage<string>(LocalStorageKey.currentAddressId, address.id)
  }

  const createReq = async (data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    const address = await UserAddressRepository.create(data)
    return address
  }

  const refreshAddresses = async ():Promise<boolean> => {
    const res = await UserAddressRepository.getUserAddresses()
    appContext.setUserAddresses(res)
    return true
  }

  const updateReq = async (id: string, data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    return UserAddressRepository.update(id, data)
  }

  const deleteReq = async (id: string): Promise<ICart> => {
    return  UserAddressRepository.delete(id)
  }

  const createLoc = async (data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    data.id = uuidv4()
    setCookie(CookiesType.address, CookiesUtils.encodeJson(data))
    return data as IUserAddress
  }

  const updateLoc = async (id: string, data: DeepPartial<IUserAddress>): Promise<IUserAddress> => {
    setCookie(CookiesType.address, CookiesUtils.encodeJson(data))
    return data as IUserAddress
  }

  const deleteLoc = async (id: string): Promise<any> => {
    removeCookie(CookiesType.address)
  }

  const create = async (data: DeepPartial<IUserAddress>) => {
    if(appContext.isLogged){
      const address = await createReq(data)
      appContext.setUserAddresses(state=> [address, ...state])
      appContext.setCurrentAddress(address)
    }
    else{
      const address = await createLoc(data)
      appContext.setUserAddresses(state=> [...state, address])
      appContext.setCurrentAddress(address)
    }
  }

  const update = async (id: string, data: DeepPartial<IUserAddress>): Promise<boolean> => {
    
    if(appContext.isLogged){
      const address = await updateReq(id, data)
      if(id === appContext.currentAddress?.id){
        appContext.setCurrentAddress(address)
      }
      return true
    }else{
      const address = await updateLoc(id, data)
      appContext.setUserAddresses(state=> {
        const withoutEditedAddress = state.filter(el=> el.id !== id)||[]
        return [address, ...withoutEditedAddress]
      })
      
      if(id === appContext.currentAddress?.id){
        appContext.setCurrentAddress(address)
      }
      return true
    }
  }

  const deleteAddress = (id: string)  => {
    if(appContext.isLogged){
      deleteReq(id).then(res=> {
        appContext.showSnackbar('Адрес успешно удален', SnackbarType.success)
        appContext.hideModal()
        refreshAddresses()
      })
    }else{
      appContext.addresses.length>0&&appContext.setUserAddresses(a=> {return a.filter(f=> f.id !== id)})
      appContext.showSnackbar('Адрес успешно удален', SnackbarType.success)
      appContext.hideModal()
      return deleteLoc(id)
    }
  }


  useEffect( () => {
    const subscription = appContext.loginState$.subscribe((logged) => {
      if (!logged && appContext.currentAddress) {
        createLoc(appContext.currentAddress)
      }
      else {
        removeCookie(CookiesType.address)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [appContext.currentAddress])
  

  const value: IState = {
    ...defaultValue,
    refreshAddresses,
    create,
    update,
    deleteAddress,
    setCurrentAddress,
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
