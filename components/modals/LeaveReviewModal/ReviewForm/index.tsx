import styles from './index.module.scss'
import { IOrder } from 'data/interfaces/IOrder'
import { Form, FormikProvider, useFormik } from 'formik'
import { IReviewCreateRequest } from 'data/interfaces/IReviewCreateRequest'
import { useAppContext } from 'context/state'
import InputField from 'components/fields/InputField'
import UserSvg from 'components/svg/UserSvg'
import { colors } from 'styles/variables'
import PencilSvg from 'components/svg/PencilSvg'
import { useState } from 'react'
import CommentSvg from 'components/svg/CommentSvg'
import { FeedbackPageNavigation } from '..'
import { useResize } from 'components/hooks/useResize'

interface Props {
  rate: number
  item: IOrder
  data?: IReviewCreateRequest,
  changePage?: (p: FeedbackPageNavigation)=>void 
  onSubmit: (data: IReviewCreateRequest) => void
}

export default function ReviewForm (props: Props) {
  const appContext = useAppContext()
  const {isPhoneWidth} = useResize()

  const [textAreaValue, setTextArea] = useState<string>(props.data?.text??'')

  const formik = useFormik<IReviewCreateRequest>({
    initialValues: {
      mark: props.rate+1,
      userName: appContext.user.name,
      text: ''
    },
    onSubmit: (data)=> {
      props.onSubmit(data)
      props.changePage(FeedbackPageNavigation.Complete)
    }
  })

  const textAreaHandler = (e: { target: HTMLTextAreaElement }) => {
    let target = e.target
    setTextArea(target.value)
    formik.values.text = target.value
  }

  return ( 
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        <CommentSvg color={isPhoneWidth?colors.green: colors.white} className={styles.titleSvg}/>
        {isPhoneWidth
        ? <>
            <p className={styles.titleSuccess}>Ваша оценка учтена!</p>
            <p className={styles.title}>Желаете ставить отзыв о {props.item.brand.name}?</p> 
          </>
        : <p className={styles.title}>Оставить отзыв о <b>{props.item.brand.name}</b></p>
        }
        <InputField 
        suffix={<UserSvg className={styles.prefixSvg} color={colors.dark1}/>} 
        placeholder='Ваше имя'       
        styleType='feedback' 
        color='white'
        name={'userName'} 
        className={styles.nameField}
        />
        <div className={styles.textAreaWrapper}>
          <textarea name='text' placeholder='Ваш отзыв' className={styles.textarea} onChange={textAreaHandler} value={textAreaValue}/>
          <PencilSvg color={colors.dark1} className={styles.textAreaIcon}/>
        </div>
        <button className={styles.submitButton} type='submit'> 
          <CommentSvg/>
          Отправить
        </button>
      </Form>
    </FormikProvider>
  )
}