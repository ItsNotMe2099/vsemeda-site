import classnames from 'classnames'
import TextAreaField from 'components/fields/TextAreaField'
import CrossSvg from 'components/svg/CrossSvg'
import PhotoCameraSvg from 'components/svg/PhotoCameraSvg'
import BackBtn from 'components/ui/BackBtn'
import ContentLoader from 'components/ui/ContentLoader'
import { useOrderContext } from 'context/order_state'
import { useAppContext } from 'context/state'
import { IComplaint, IComplaintType } from 'data/interfaces/IComplaint'
import { IOrder } from 'data/interfaces/IOrder'
import ComplaintRepository from 'data/repositories/ComplaintRepository'
import FileRepository from 'data/repositories/FileRepository'
import { Form, FormikProvider, useFormik } from 'formik'
import { ChangeEvent,  useRef,  useState } from 'react'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import Formatter from 'utils/formatter'
import OrderHelper from 'utils/orderHelper'
import {v4 as uuidv4} from 'uuid'

import styles from './index.module.scss'

interface Props {
  onBack: ()=> void
  item: IOrder
  type: IComplaintType
}

interface IAbortControllerWithId extends AbortController {
  id?: string
}

interface PreviewImage {
  image: Blob,
  loaded: boolean
  id: string
}

export default function Complaint(props: Props) {


  const appContext = useAppContext()
  const orderContext = useOrderContext()
  const abortControllersRef = useRef<IAbortControllerWithId[]>()
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])

  const removeImage = (index: number) => {
    
    const image = previewImages.filter((el, ind) => ind === index)
    if(image[0].loaded) {
      FileRepository.deleteMyFile(image[0].id)
      .then(res=> {      
        setPreviewImages(state=> {        
          return state.filter((el)=>{return el.id !== res.id})
        })
      })   
    } 
    else {
      (abortControllersRef.current as IAbortControllerWithId[])?.find(i => i.id === image[0].id)?.abort()
    }
  }

  const submit = async(data: IComplaint) => {
    const assetsIds = [...previewImages.map(el=>el.id)]
    ComplaintRepository.postComplaint({...data, assetsIds})
    .then(res=>{
      appContext.hideModal()
    })
  }

  

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
   
    for(const file of files) {
      const id = uuidv4()
      const abortController = new AbortController()
      setPreviewImages(state=> [...state, {image: file, loaded: false, id, }])

      try{
        
        (abortController as IAbortControllerWithId).id = id

        FileRepository.uploadFile(file, {signal: abortController.signal})
        .then(fl => {
          setPreviewImages(state=> {
            return [...state.filter(el=> el.id !== id), {image: file, loaded: true, id: fl.id}]
          })
        })
        .catch(err=> {
          appContext.showSnackbar(err.toString(), SnackbarType.error)
        })
      }
      catch(e) {
        
        if(abortController.signal.aborted) {
          setPreviewImages(state=> {
            return [...state.filter(el => el.id !== id)]
          })
        }
      }
    }
  }

  const formik = useFormik<IComplaint>({
    initialValues: {
      orderId: Number(orderContext.activeDetails.id),
      reasonType: props.type.id,
      text: '',
      assetsIds: []
    }, onSubmit: submit
  })

  const header = ( 
    <div className={styles.headerRoot}>
      <BackBtn onClick={props.onBack} bgColor={'white'}/>
      <p className={styles.headerTitle}>Жалоба к заказу №{props.item.id}</p>
    </div>
  )



  const smallIcon = OrderHelper.smallOrderIcon(props.item.stateDetails.icon)
  

  const [style, color] = OrderHelper.orderColor(props.item.stateDetails.color)

  const body = (
    <FormikProvider value={formik}>
      <Form className={styles.complaintLayout}>
      <div className={styles.root}>
        <p className={styles.title}>
          {props.type.name}
        </p>
        <div className={styles.order} >
          <div className={styles.orderTop}>
            <p className={styles.unitName}>{props.item.brand.name}</p>
            <div className={styles.status}>
              <div className={styles.statusBackground} style={style}></div>
              {smallIcon}
              <p className={styles.statusText} style={{color: color}}>
                {props.item.stateDetails.shortName}
              </p>
            </div>
          </div>
          <div className={styles.orderBottom}>
            <p className={styles.time}>{Formatter.formatDateRelative(props.item.createdAt)}</p>
            <p className={styles.payments}>
              {OrderHelper.translatePaymentMethod(props.item.paymentMethod)}: <span className={styles.payments_price}>{props.item.total} ₽</span>
            </p>
          </div>
        </div>
        <div className={styles.photos}>
          <p className={styles.photosTitle}>Фото</p>
          <div className={styles.inputsWrapper}>
            <label className={styles.inputLabel}>
              <PhotoCameraSvg/>
              <input type="file" multiple={true} className={styles.input} onChange={onChangeInput} />
            </label>
            {previewImages&&previewImages.map((image: PreviewImage, index: number)=>{
              return (
              <div key={index} className={styles.imageRoot}>
                {!image.loaded && 
                  <ContentLoader isOpen={true} className={styles.loader}/>
                }
                <div className={styles.removeButton} onClick={()=>removeImage(index)}>
                  <CrossSvg color={colors.purple} className={styles.removeSvg}/>
                </div>
                <div className={styles.imageWrapper}>
                  <img className={classnames(styles.image, !image.loaded&&styles.image_load)}  alt={'name'} src={URL.createObjectURL(image.image)}/>
                </div>
              </div>
            )
            })}
          </div>
        </div>
        <div className={styles.message}>
          <p className={styles.messageTitle}>Сообщение</p>
          <TextAreaField name='text' color='white' autoSize={true} areaClassname={styles.textarea}  />
          {/* <textarea className={styles.textarea} name="text" id="" cols={30} rows={6}></textarea> */}
        </div>
          
      </div>
      <button className={styles.submitButton} type='submit'>Отправить</button>
      </Form>
  </FormikProvider>
  )
  

  return (<>
  {header}
  {body}
  </>)
}