import {FormikProps} from 'formik'
import useFormErrorScroll from 'hooks/useFormErrorScroll'
import {useAppContext} from 'context/state'

interface Props {
  formik: FormikProps<any>
}

// @ts-ignore
export default function FormErrorScroll(props: Props) {
  const appContext = useAppContext()
  const offset = appContext.isMobile ? -50 : -64
  const res = useFormErrorScroll(props.formik, offset + -15 )
  return null
}

