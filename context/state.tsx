import {createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import { SnackbarData } from 'types/types'
import { useRouter } from 'next/router'
import {CookiesLifeTime} from 'types/constants'
import {CookiesType, LocalStorageKey, ModalType, SnackbarType} from 'types/enums'
import {IUser} from 'data/interfaces/IUser'
import {Subject} from 'rxjs'
import UserRepository from 'data/repositories/UserRepository'
import ReactModal from 'react-modal'
import Cookies from 'js-cookie'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {ILocation} from 'data/interfaces/ILocation'
import {ICart} from 'data/interfaces/ICart'
import CartRepository from 'data/repositories/CartRepository'
import UserAddressRepository from 'data/repositories/UserAddressRepository'
import { writeStorage, deleteFromStorage, useLocalStorage } from '@rehooks/local-storage'
import {useCookies} from 'react-cookie'
import CookiesUtils from 'utils/CookiesUtils'
import {IRegion} from 'data/interfaces/IRegion'

// import deleteAllCookies from 'utils/deleteCookie'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  modalNonSkippable: boolean
  modal: ModalType | null
  modalArguments: any
  loginState$: Subject<boolean>
  loginUserState$: Subject<IUser | null>
  cartState$: Subject<ICart | null>
  currentAddressState$: Subject<IUserAddress | null>
  region: IRegion | null
  updateRegion: (slug: string) => void
  bottomSheet: ModalType | null
  snackbar: SnackbarData | null
  user: IUser | null
  currentAddress: IUserAddress | null,
  addresses: IUserAddress[],
  setUserAddresses: Dispatch<SetStateAction<IUserAddress[]>>
  currentLocation: ILocation | null,
  initialLoaded: boolean
  setCurrentAddress: (address: IUserAddress) => void,
  showModal: (type: ModalType, args?: any) => void
  showBottomSheet: (type: ModalType, args?: any) => void
  hideModal: () => void
  hideBottomSheet: () => void
  setModalNonSkippable: (val: boolean) => void
  showSnackbar: (text: string, type: SnackbarType) => void
  updateUser: (newUser?: IUser) => void
  token: string | null
  setToken: (token: string) => Promise<void>
  logout: () => void
  isOverlayShown?: boolean
  showOverlay: () => void
  hideOverlay: () => void
  regionSlug: string
  deleteUser: () => void
}

const ModalsBottomSheet: ModalType[] = [

]

const loginState$ = new Subject<boolean>()
const loginUserState$ = new Subject<IUser | null>()
const cartState$ = new Subject<ICart | null>()
const currentAddressState$ = new Subject<IUserAddress | null>()


const AppContext = createContext<Partial<IState>>({})

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
  regionSlug?: string
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [token, setTokenState] = useState<string | null>(props.token ?? null)
  const [user, setUser] = useState<IUser | null>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>( null)
  const [currentAddress, setCurrentAddressState] = useState<IUserAddress>(null)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false)
  
  const [cookies, setCookie, removeCookie] = useCookies([CookiesType.address])
  const addressLocal = CookiesUtils.decodeJson<IUserAddress>(cookies.address)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const userRef = useRef<IUser | null>(null)
  const regions: IRegion[] = []
  const addressesLocal = useLocalStorage<IUserAddress[]>(LocalStorageKey.addresses)
  const [addresses, setUserAddresses] = useState<IUserAddress[]>(addressesLocal[0]&&addressesLocal[0].length > 0?addressesLocal[0]:[])

  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [region, setRegion] = useState<IRegion | null>(regions[0])
  const router = useRouter()


  const setCurrentAddress = (address: IUserAddress) => {
    if(!address) {
      console.error('Error trying to set current address: address is not provided')
      return
    }
    if(addresses.length === 0) {
      setUserAddresses([address])
      writeStorage<string>(LocalStorageKey.addresses, JSON.stringify([address]))
    }
    
    setCurrentAddressState(address)

    if(userLoaded && isLogged) {
      UserRepository.updateUser({currentAddressId: Number(address.id)})
    }
    
    writeStorage<string>(LocalStorageKey.currentAddressId, address?.id)
    Cookies.set(CookiesType.address, CookiesUtils.encodeJson(address))
    currentAddressState$.next(address)
  }

  const setInitialAddressFromLocal = () => {
    setCurrentAddress(addressLocal)
  }

  const setInitialAddressFromUser = (user: IUser) => {
    setCurrentAddress( user.currentAddressId  && user.currentAddressId === Number(addressLocal?.id) ? user.addresses.find(i => Number(i.id) === user.currentAddressId) ?? addressLocal ?? user.addresses[0] : addressLocal ?? user.addresses[0])
  }

  const updateRegion = (slug: string) => {
    const region = regions.find(i => i.slug === slug)
    if (region) {
      setRegion(region)
    }
    router.push(`/${region?.slug}`)
  }

  const updateUser = async (newUser?: IUser): Promise<IUser> => {
    if (newUser) {
      setUser(newUser)
      setInitialAddressFromUser(newUser)
      return newUser
    } else {
      const data = await UserRepository.fetchCurrent()
      if (data) {
        setUser(data)
      }
      setUserLoaded(true)
      return data
    }
  }

  const setToken = async (token: string) => {
    const newToken = token
    const oldToken = Cookies.get(CookiesType.accessToken) ?? null
    Cookies.set(CookiesType.accessToken, token, {
      expires: CookiesLifeTime.accessToken,
    })
    setTokenState(newToken)

    if (!oldToken && newToken) {
      debugger
      loginState$.next(true)
      const newUser = await updateUser()
      const savedAddresses = addresses.length>0?addresses:currentAddress?[currentAddress]:[]

      const syncAddressRes = await UserAddressRepository.sync(currentAddress?.id/*||newUser?.addresses[0]?.id*/, [...savedAddresses, ...newUser?.addresses])
      const updatedUser = await updateUser()
      const newCurrentAddress = (updatedUser?.addresses&&updatedUser?.addresses?.find(i => syncAddressRes?.newCurrentAddressId?i.id === syncAddressRes?.newCurrentAddressId:i.id===updatedUser.currentAddressId.toString())) || (user?.addresses.length > 0 && user?.addresses[0]||currentAddress) || newUser.addresses[0]
      // const currentAddressToSave = updatedUser.addresses.find(a=> +a.id === +newUser.currentAddressId)||newCurrentAddress
      setCurrentAddress(newCurrentAddress)
      if(user?.addresses || addresses.length > 0||newUser.addresses.length > 0) {
        setUserAddresses(a=> {
          return [...newUser?.addresses, ...savedAddresses]
        })
      }
      if(newCurrentAddress) {
        const cart = await CartRepository.fetchCurrentCart(newCurrentAddress.location)
        cartState$.next(cart)
        currentAddressState$.next(newCurrentAddress)
      }
      loginUserState$.next(user)
    }

    if (oldToken && !newToken) {
      loginState$.next(false)
      loginUserState$.next(null)
    }
    setIsLogged(true)
  }

  const logout = () => {
    Cookies.remove(CookiesType.accessToken)
    Cookies.remove(CookiesType.sessionId)
    setUserAddresses([currentAddress])
    setIsLogged(false)
    setUser(null)
    loginState$.next(false)
  }
  

  const showBottomSheet = (type: ModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setBottomSheet(type)
  }

  const hideBottomSheet = () => {
    setBottomSheet(null)
  }

  const hideModal = () => {
    if (bottomSheet) {
      hideBottomSheet()
    }
    setModal(null)
    setModalArguments(null)
  }

  const showModal = (type: ModalType, args?: any) => {    
    if (props.isMobile && ModalsBottomSheet.includes(type)) {
      showBottomSheet(type, args)
      return
    }

    ReactModal.setAppElement('body')
    setModalArguments(args)
    setModal(type)
    if (bottomSheet) {
      hideBottomSheet()
    }
  }

  const showSnackbar = (text: string, type: SnackbarType) => {
    setSnackbar({ text, type })
    setTimeout(() => {
      setSnackbar(null)
    }, 2000)
  }

  const deleteUser = () => {
    UserRepository.deleteUser()
    .then(res=> {
      
      logout()
    })
    .catch(err=> {
      showSnackbar('Не удалось удалить пользователя', SnackbarType.error)
    })
  }

  useEffect(()=>{
    if(!isLogged) {
      writeStorage<string>(LocalStorageKey.addresses, JSON.stringify(addresses))
    }
    else {
      deleteFromStorage(LocalStorageKey.addresses)
    }
  }, [addresses, isLogged])

  useEffect(() => {
    userRef.current = user
    if(user) {
      setUserAddresses(user.addresses)
    }
  }, [user])

  useEffect(() => {
    if (props.token) {
      setIsLogged(true)
    } 
    // else {
    //   setIsLogged(false)
    // }
  }, [props.token])

  useEffect(() => {
    const promises = []
    if (props.token) {
      promises.push(
        updateUser().then((user) => {
            setInitialAddressFromUser(user)
        }).catch(() => {
          setIsLogged(false)
        }),
      )
    } else {
      setInitialAddressFromLocal()
      setUserLoaded(true)
    }
    Promise.all(promises).then((i) => setTimeout(() => { }, 1))
  }, [])


  const value: IState = {
    modalNonSkippable,
    setModalNonSkippable,
    loginState$: loginState$,
    loginUserState$: loginUserState$,
    cartState$: cartState$,
    currentAddressState$: currentAddressState$,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    region: region,
    updateRegion,
    modal,
    modalArguments,
    bottomSheet,
    snackbar,
    user,
    token,
    currentAddress,
    currentLocation: currentAddress?.location ?? currentLocation,
    addresses,
    setUserAddresses,
    initialLoaded: userLoaded,
    isLogged,
    showModal,
    showBottomSheet,
    showSnackbar,
    hideModal,
    hideBottomSheet,
    updateUser,
    setToken,
    logout,
    setCurrentAddress,
    isOverlayShown,
    showOverlay: () => {
      setIsOverlayShown(true)
    },
    hideOverlay: () => {
      setIsOverlayShown(false)
    },
    regionSlug: props.regionSlug,
    deleteUser
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

// const defaultValue: Partial<IState> = {
//   isLogged: false,
//   isMobile: false,
//   isDesktop: true,
//   region: null,
//   currentAddress: null,
//   currentLocation: null,
//   addresses: [],
//   setUserAddresses: null,
//   modalNonSkippable: false,
//   modal: null,
//   modalArguments: null,
//   bottomSheet: null,
//   snackbar: null,
//   user: null,
//   initialLoaded: false,
//   updateRegion: () => null,
//   setCurrentAddress: (address: IUserAddress) => null,
//   loginState$: loginState$,
//   loginUserState$: loginUserState$,
//   cartState$: cartState$,
//   currentAddressState$: currentAddressState$,
//   setModalNonSkippable: (val) => null,
//   showModal: (type) => null,
//   showBottomSheet: (type) => null,
//   hideModal: () => null,
//   hideBottomSheet: () => null,
//   showSnackbar: (text, type) => null,
//   setToken: async (token) => null,
//   token: null,
//   logout: () => null,
//   updateUser: () => null,
//   isOverlayShown: false,
//   showOverlay: () => null,
//   hideOverlay: () => null,
//   regionSlug: ''
// }
