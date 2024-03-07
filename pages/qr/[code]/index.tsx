import {GetServerSideProps} from 'next'
import {useRouter} from 'next/router'
import styles from './index.module.scss'
import PromoQrCodeRepository from 'data/repositories/PromoQrCodeRepository'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import QrRestaurantCard from 'components/for_pages/qr/QrRestaurantCard'
import QrPromoCard from 'components/for_pages/qr/QrPromoCard'
import {FormikProvider, Form, useFormik} from 'formik'
import QrFormCard from 'components/for_pages/qr/QrFormCard'
import Button from 'components/ui/Button'
import QrConditionsCard from 'components/for_pages/qr/QrDurationConditionsCard'
import QrUsedCard from 'components/for_pages/qr/QrUsedCard'
import CheckSvg from 'components/svg/CheckSvg'
import {colors} from 'styles/variables'
import {useState} from 'react'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import {RequestError} from 'types/types'
import {SnackbarType} from 'types/enums'
import RestaurantOrderRepository from 'data/repositories/RestaurantOrderRepository'
import {useAppContext} from 'context/state'
import QrSuccess from 'components/for_pages/qr/QrSuccess'
import QrNotFound from 'components/for_pages/qr/QrNotFound'
import {omit} from 'lodash'
import useInterval from 'use-interval'
import QrNotStartedCard from 'components/for_pages/qr/QrNotStartedCard'

const checkIsStarted = (promoQrCode: IPromoQrCode) => {
  if ((new Date(promoQrCode.startAt)).getTime() <= (new Date()).getTime()) {
    return true
  }
  return false
}

interface IFormData {
  number: string | null,
  total: number | null
}

interface Props {
  promoQrCode: IPromoQrCode | null
}

export default function Restaurant({promoQrCode}: Props) {
  const router = useRouter()
  const appContext = useAppContext()
  const [isStarted, setIsStarted] = useState(checkIsStarted(promoQrCode))
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  useInterval(() => {
    if (checkIsStarted(promoQrCode)) {
      setIsStarted(true)
    }
  }, 10000)
  const handleSubmit = async (data: IFormData) => {
    try {
      setSending(true)
      await RestaurantOrderRepository.create({
        ...omit(data, ['total']),
        total: parseInt(`${data.total}`, 10),
        code: promoQrCode.code
      })
      setSuccess(true)
    } catch (err: any) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)

      }
    }
    setSending(false)
  }
  const formik = useFormik<IFormData>({
    initialValues: {
      number: null,
      total: null
    },
    onSubmit: handleSubmit
  })
  const logo = (<div className={styles.logoWrapper}>
    <LogoEdaSvg className={styles.logo}/>
  </div>)
  if (!promoQrCode) {
    return <div className={styles.root}>
      <div className={styles.bg}/>
      <div className={styles.center}>
        {logo}
        <div className={styles.error}><QrNotFound/></div>
      </div>
    </div>
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <div className={styles.bg}/>

        <div className={styles.center}>
          {logo}
          {success && <div className={styles.success}><QrSuccess/></div>}
          {!success && <>
            {promoQrCode.usedAt && <QrUsedCard promoQrCode={promoQrCode}/>}
            <QrRestaurantCard restaurant={promoQrCode.restaurant}/>
            <QrPromoCard icon={promoQrCode.promo.icon} color={promoQrCode.promo.color}
                         badge={promoQrCode.promo.badge}
                         badgeColor={promoQrCode.promo.badgeColor}
                         bigText={promoQrCode.promo.bigText}
                         shortDesc={promoQrCode.promo.shortDesc}
                         image={promoQrCode.promo.image} name={promoQrCode.promo.name}
                         template={promoQrCode.promo.template}/>
            <QrConditionsCard promoQrCode={promoQrCode}/>
            {!isStarted &&
              <div className={styles.notStartedWrapper}><QrNotStartedCard promoQrCode={promoQrCode}/></div>}
            {isStarted && <QrFormCard isSending={sending}/>}
            {isStarted && <Button className={styles.btn} spinner={sending} styleType='filledGreen'
                                  icon={<CheckSvg color={colors.white}/>}>
              <div>{promoQrCode.usedAt ? 'Оплачено повторно' : 'Оплачено'}</div>
            </Button>}
          </>}
        </div>
      </Form>
    </FormikProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: { query: { code?: string }, req: { cookies: { [x: string]: any } } }) => {
  const promoQrCode = await PromoQrCodeRepository.findByCode(context.query.code)
  return {
    props: {
      promoQrCode
    } as Props
  }
}
