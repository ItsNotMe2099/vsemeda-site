import { createContext, useContext, useState } from 'react'
import { useAppContext } from 'context/state'
import { CookiesType, SnackbarType } from 'types/enums'
import { RequestError, SnackbarData } from 'types/types'
import useInterval from 'use-interval'
import Cookies from 'js-cookie'
import UserRepository from 'data/repositories/UserRepository'
import { useRouter } from 'next/router'
import { ILoginResponse } from 'data/interfaces/ILoginResponse'
import { LoginFormData } from 'types/form_data/LoginFormData'

interface IOtpError {
  show: boolean
  text?: string
}

interface IState {
  signUpSpinner: boolean
  againSpinner: boolean
  confirmSpinner: boolean
  codeRes: ILoginResponse | null
  LoginFormData: LoginFormData | null
  remainSec: number
  setLoginFormData: (value: LoginFormData) => void
  signUp: (values: LoginFormData) => void
  sendCodeAgain: () => void
  confirmCode: (code: string) => Promise<boolean>
  setSending: (value: boolean) => void
  setSendingAgain: (value: boolean) => void
  logOut: () => void
  clear: () => void
  setRedirect: (val: string) => void
  otpError: IOtpError
  showOtpError: (show: boolean, text?: string) => void
}

const defaultValue: IState = {
  signUpSpinner: false,
  confirmSpinner: false,
  againSpinner: false,
  confirmCode: async (code: string) => false,
  setSending: (value: boolean) => null,
  codeRes: null,
  LoginFormData: null,
  setLoginFormData: (values) => null,
  signUp: (values) => null,
  remainSec: 0,
  sendCodeAgain: () => null,
  setSendingAgain: (value) => null,
  logOut: () => null,
  clear: () => null,
  setRedirect: (val) => null,
  otpError: null,
  showOtpError: (show, text) => null
}

const AuthContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AuthWrapper(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [signUpSpinner, setSignUpSpinner] = useState(false)
  const [confirmSpinner, setConfirmSpinner] = useState(false)
  const [againSpinner, setAgainSpinner] = useState(false)
  const [LoginFormData, setLoginFormData] = useState<LoginFormData | null>(null)
  const [codeRes, setCodeRes] = useState<ILoginResponse | null>(null)
  const [remainSec, setRemainSec] = useState(0)
  const [redirect, setRedirect] = useState<string>('')
  const [otpError, setOtpError] = useState<IOtpError>(null)


  useInterval(() => {
    if (remainSec > 0) {
      setRemainSec(remainSec - 1)
    }
  }, 1000)

  // Sign up step 1
  const signUp = async (values: LoginFormData) => {
    setSignUpSpinner(true)
    setLoginFormData(values)
    const isOk = await sendCodeToPhone(values.phone)
    setSignUpSpinner(false)
    if (isOk) {
      // appContext.showModal(ModalType.signUpCode)
    }
  }

  const showOtpError = (show: boolean, text: string) => {
    setOtpError({ show, text })
  }

  // Sign up step 2
  const confirmCode = async (code: string): Promise<boolean> => {
    setConfirmSpinner(true)
    let accessToken: string = ''

    try {
      accessToken = await UserRepository.phoneConfirmation(LoginFormData!.phone, code)
    } catch (err) {
      if (err instanceof RequestError) {
        showOtpError(true, err.message)
      }
      setConfirmSpinner(false)
      return false
    }

    if (!accessToken) {
      appContext.showSnackbar('Token error', SnackbarType.error)
      setConfirmSpinner(false)
      return false
    }

    Cookies.set(CookiesType.accessToken, accessToken, { expires: 365 })



    appContext.setModalNonSkippable(false)
    appContext.hideModal()
    appContext.hideBottomSheet()
    appContext.updateTokenFromCookies()
    setConfirmSpinner(false)
    if (redirect) {
      await router.push(redirect)
    }
    return true
  }

  const sendCodeToPhone = async (phone: string): Promise<boolean> => {
    let data: ILoginResponse

    try {
      data = await UserRepository.login(phone)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      return false
    }

    setCodeRes(data)
    setRemainSec(data.codeCanRetryIn ?? 0)
    return true
  }

  const sendCodeAgain = async () => {
    setAgainSpinner(true)
    if (LoginFormData?.phone) {
      await sendCodeToPhone(LoginFormData?.phone)
    }
    setAgainSpinner(false)
  }

  const logOut = () => {
    Cookies.remove(CookiesType.accessToken)
    appContext.updateTokenFromCookies()
    if (router.pathname.includes('/lk')) {
      router.push('/')
    }
  }

  const clear = () => {
    setLoginFormData(null)
    setCodeRes(null)
  }

  const value: IState = {
    ...defaultValue,
    confirmCode,
    otpError,
    showOtpError,
    signUpSpinner,
    codeRes,
    signUp,
    LoginFormData,
    remainSec,
    sendCodeAgain,
    againSpinner,
    confirmSpinner,
    logOut,
    clear,
    setRedirect
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
