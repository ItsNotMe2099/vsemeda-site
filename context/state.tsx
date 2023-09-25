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
import { writeStorage} from '@rehooks/local-storage'
import {useCookies} from 'react-cookie'
import CookiesUtils from 'utils/CookiesUtils'
import {IRegion} from 'data/interfaces/IRegion'

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
}


const ModalsBottomSheet: ModalType[] = [

]
const loginState$ = new Subject<boolean>()
const loginUserState$ = new Subject<IUser | null>()
const cartState$ = new Subject<ICart | null>()
const currentAddressState$ = new Subject<IUserAddress | null>()
const defaultValue: IState = {
  isLogged: false,
  isMobile: false,
  isDesktop: true,
  region: null,
  currentAddress: null,
  currentLocation: null,
  addresses: [],
  setUserAddresses: null,
  modalNonSkippable: false,
  modal: null,
  modalArguments: null,
  bottomSheet: null,
  snackbar: null,
  user: null,
  initialLoaded: false,
  updateRegion: () => null,
  setCurrentAddress: (address: IUserAddress) => null,
  loginState$: loginState$,
  loginUserState$: loginUserState$,
  cartState$: cartState$,
  currentAddressState$: currentAddressState$,
  setModalNonSkippable: (val) => null,
  showModal: (type) => null,
  showBottomSheet: (type) => null,
  hideModal: () => null,
  hideBottomSheet: () => null,
  showSnackbar: (text, type) => null,
  setToken: async (token) => null,
  token: null,
  logout: () => null,
  updateUser: () => null,
  isOverlayShown: false,
  showOverlay: () => null,
  hideOverlay: () => null,
  regionSlug: ''
}

const AppContext = createContext<IState>(defaultValue)

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
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [user, setUser] = useState<IUser | null>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>( null)
  const [currentAddress, setCurrentAddress] = useState<IUserAddress>(null)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false)
  
  const [cookies, setCookie, removeCookie] = useCookies([CookiesType.address])
  const addressLocal = CookiesUtils.decodeJson<IUserAddress>(cookies.address)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const userRef = useRef<IUser | null>(null)
  const regions: IRegion[] = []
  const [addresses, setUserAddresses] = useState<IUserAddress[]>([])

  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [region, setRegion] = useState<IRegion | null>(regions[0])
  const router = useRouter()
  const setInitialAddressFromLocal = () => {
    setCurrentAddress(addressLocal)

  }
  const setInitialAddressFromUser = (user: IUser) => {
    setCurrentAddress( user.currentAddressId  && user.currentAddressId === addressLocal?.id ? user.addresses.find(i => i.id === user.currentAddressId) ?? addressLocal ?? user.addresses[0] : addressLocal ?? user.addresses[0])
  }

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

  const hideModal = () => {
    if (bottomSheet) {
      hideBottomSheet()
      // return
    }
    setModal(null)
    setModalArguments(null)
  }

  const showBottomSheet = (type: ModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setBottomSheet(type)
  }

  const hideBottomSheet = () => {
    setBottomSheet(null)
  }



  const value: IState = {
    ...defaultValue,
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
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    hideModal,
    hideBottomSheet,
    updateUser,
    setToken: async (token: string) => {

      const newToken = token
      const oldToken = Cookies.get(CookiesType.accessToken) ?? null
      Cookies.set(CookiesType.accessToken, token, {
        expires: CookiesLifeTime.accessToken,
      })
      debugger


      setToken(newToken)
      if (!oldToken && newToken) {
        loginState$.next(true)
        const newUser = await updateUser()
        const syncAddressRes = await UserAddressRepository.sync(currentAddress?.id||newUser?.addresses[0]?.id, [addressLocal||newUser?.addresses[0]])
        const newCurrentAddress = newUser.addresses.find(i => i.id === syncAddressRes.newCurrentAddressId) ?? user.addresses[0]
        setCurrentAddress(newCurrentAddress)
        setUserAddresses(user.addresses)
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
    },

    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setIsLogged(false)
      setUser(null)

      loginState$.next(false)
    },
    setCurrentAddress: (address: IUserAddress) => {
      setCurrentAddress(address)
      writeStorage<string>(LocalStorageKey.currentAddressId, address.id)
      currentAddressState$.next(address)
    },
    isOverlayShown,
    showOverlay: () => {
      setIsOverlayShown(true)
    },
    hideOverlay: () => {
      setIsOverlayShown(false)
    },
    regionSlug: props.regionSlug
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
