import { createContext, useContext, useEffect, useState } from 'react'
import { IRegion, SnackbarData } from 'types/types'
import { useRouter } from 'next/router'
import { CookiesLifeTime } from 'types/constants'
import { CookiesType, ModalType, SnackbarType } from 'types/enums'
import { IUser } from 'data/interfaces/IUser'
import { Subject } from 'rxjs'
import UserRepository from 'data/repositories/UserRepository'
import ReactModal from 'react-modal'
import Cookies from 'js-cookie'
import { IUserAddress } from 'data/interfaces/IUserAddress'
import { ILocation } from 'data/interfaces/ILocation'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  modalNonSkippable: boolean
  modal: ModalType | null
  modalArguments: any
  loginState$: Subject<boolean>
  region: IRegion | null
  updateRegion: (slug: string) => void
  bottomSheet: ModalType | null
  snackbar: SnackbarData | null
  user: IUser | null
  currentAddress: IUserAddress | null,
  currentLocation: ILocation | null,
  initialLoaded: boolean
  serCurrentAddress: (address: IUserAddress) => void,
  showModal: (type: ModalType, args?: any) => void
  showBottomSheet: (type: ModalType, args?: any) => void
  hideModal: () => void
  hideBottomSheet: () => void
  setModalNonSkippable: (val: boolean) => void
  showSnackbar: (text: string, type: SnackbarType) => void
  updateTokenFromCookies: () => void
  updateUser: (newUser?: IUser) => void
  token: string | null
  setToken: (token: string) => void
  logout: () => void
  isOverlayShown?: boolean
  showOverlay: () => void
  hideOverlay: () => void
}


const ModalsBottomSheet: ModalType[] = [

]
const loginState$ = new Subject<boolean>()

const defaultValue: IState = {
  isLogged: false,
  isMobile: false,
  isDesktop: true,
  region: null,
  currentAddress: null,
  currentLocation: null,
  modalNonSkippable: false,
  modal: null,
  modalArguments: null,
  bottomSheet: null,
  snackbar: null,
  user: null,
  initialLoaded: false,
  updateRegion: () => null,
  serCurrentAddress: (address: IUserAddress) => null,
  loginState$: loginState$,
  setModalNonSkippable: (val) => null,
  showModal: (type) => null,
  showBottomSheet: (type) => null,
  hideModal: () => null,
  hideBottomSheet: () => null,
  showSnackbar: (text, type) => null,
  setToken: (token) => null,
  token: null,
  logout: () => null,
  updateTokenFromCookies: () => null,
  updateUser: () => null,
  isOverlayShown: false,
  showOverlay: () => null,
  hideOverlay: () => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [auth, setAuth] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [user, setUser] = useState<IUser | null>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>({ lat: 55.85644835024383, lng: 37.00685434662651 })
  const [currentAddress, setCurrentAddress] = useState<IUserAddress>(null)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false)
  const regions: IRegion[] = [
    {
      id: 2,
      name: 'Санкт-Петербург',
      default_address: 'Невский 18',
      slug: 'sankt-peterburg',
      is_default: true,
      latitude: 59.936557,
      longtitude: 30.318249
    },
    {
      id: 1,
      name: 'Москва',
      default_address: 'Большая садовая улица, 94',
      slug: 'moskva',
      is_default: false,
      latitude: 47.222066,
      longtitude: 39.718112
    }
  ]
  //temp
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [region, setRegion] = useState<IRegion | null>(regions[0])
  const router = useRouter()
  useEffect(() => {
    const promises = []

    if (props.token) {
      promises.push(
        updateUser().then((user) => {
          setCurrentAddress(user.addresses.find(i => i.id === user.currentAddressId))
        }).catch(() => {
          setAuth(false)
        }),
      )
    } else {
      setUserLoaded(true)
    }

    Promise.all(promises).then((i) => setTimeout(() => { }, 1))

    if (!auth) return
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
      return
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
    initialLoaded: userLoaded,
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
    serCurrentAddress: (address: IUserAddress) => {
      setCurrentAddress(address)
    },
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, {
        expires: CookiesLifeTime.accessToken,
      })
      setAuth(true)
      loginState$.next(true)
    },
    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setAuth(false)
      setUser(null)

      loginState$.next(false)
    },
    updateTokenFromCookies: () => {
      const oldToken = token
      const newToken = Cookies.get(CookiesType.accessToken) ?? null
      setToken(newToken)
      if (!oldToken && newToken) {
        loginState$.next(true)
        updateUser()
      }
      if (oldToken && !newToken) {
        loginState$.next(false)
      }
    },
    isOverlayShown,
    showOverlay: () => {
      setIsOverlayShown(true)
    },
    hideOverlay: () => {
      setIsOverlayShown(false)
    }
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
