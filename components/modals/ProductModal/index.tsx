import styles from './index.module.scss'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import {Form, FormikProvider, useFormik} from 'formik'
import {ProductModalArguments} from 'types/modal_arguments'
import {useMemo} from 'react'
import {ModificationGroupType} from 'data/enum/ModificationGroupType'
import ModificationRadioListField from 'components/fields/ModificationRadioListField'
import ModificationCheckboxListField from 'components/fields/ModificationCheckboxListField'
import Formatter from 'utils/formatter'
import QuantityField from 'components/fields/QuantityField'
import Button from 'components/ui/Button'
import {useCartContext} from 'context/cart_state'
import {ProductCardLayoutPosType} from 'data/interfaces/IProductCardLayout'
import CardImgLayoutPos from 'components/for_pages/Common/MenuProductCard/CardImgLayoutPos'
import { useResize } from 'components/hooks/useResize'
import CartSvg from 'components/svg/TabBar/CartSvg'
import CustomScrollbar from 'components/ui/CustomScrollbar'


interface IFormData{
  [key: string]: number | any[]
}

interface Props {
  isBottomSheet?: boolean
  onRequestClose?: () => void
}

const ProductModalInner = (props: Props) => {  
  const appContext = useAppContext()
  const cartContext = useCartContext()
  const args = appContext.modalArguments as ProductModalArguments
  

  const {isPhoneWidth} = useResize()

  const handleSubmit =async (data: any) => {
    
    let oneToMany: {modificationId: any;quantity: number;}[] = []
    let manyToMany: {modificationId: any;quantity: number;}[] = []
    
    try {
      oneToMany = args.product.modificationGroups
      .filter(i => i.type === ModificationGroupType.OneOfMany)
      .filter(i => !!data[`group_${i.id}`]).map(i => ({modificationId: data[`group_${i.id}`].id, quantity: 1}))
      manyToMany = args.product.modificationGroups
      .filter(i => i.type === ModificationGroupType.ManyOfMany)
      .map(group =>  {return {modificationId: data[`group_${group.id}`].id, quantity: 1}})
      .flat()
    } 
    catch(err){
      
    }
    cartContext.addProductFromModal(args.product, args.unitId, data.quantity, [...oneToMany, ...manyToMany])
    .then(res => {
      if(res === true) {
        isPhoneWidth?appContext.hideBottomSheet():appContext.hideModal()
      }
    })
  }

  const initialValues = useMemo(() => {
    if(args.product) {
      const obj: any = {}
      for(const item of args.product?.modificationGroups){
        obj[`group_${item.id}`] = null
      }
      return obj
    }
  }, [args.product])

  const handleClick = () => {

  }

  const modificationsItems = args?.product?.modificationGroups.reduce((p, c)=> {return p+c.modifications.length}, 0)||null

  const formik = useFormik({
    initialValues: {...initialValues, quantity: 1}, onSubmit: handleSubmit})
  const body = (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.imgContainer} >
          {args.product?.image && <img src={`${args.product?.image?.link}?w=600`} className={styles.image} alt={args.product.name}/>}
          {args.product?.layout && args.product?.layout[ProductCardLayoutPosType.ImgT] && !isPhoneWidth &&
            <CardImgLayoutPos items={args.product.layout[ProductCardLayoutPosType.ImgT]}/>}
        </div>
        <div className={styles.info}>
          {!isPhoneWidth && <p className={styles.name}>{args.product.name}</p> }
          {args.product?.description && <p className={styles.description}>
            {args.product?.description}
          </p>}
        </div>
      </div>

      <FormikProvider value={formik}>
        <Form className={styles.form}>
          {args.product?.modificationGroups.length > 0 && 
          <div className={styles.modificationsWrapper} style={{height: modificationsItems < 5? modificationsItems*52: 5*52}}>
            <CustomScrollbar>

            {args.product?.modificationGroups?.map((i) => {
              switch (i.type){
                case ModificationGroupType.OneOfMany:
                  return <ModificationRadioListField itemClassName={styles.modItem} name={`group_${i.id}`} label={i.name} options={i.modifications} />
                  case ModificationGroupType.ManyOfMany:
                    return <ModificationCheckboxListField itemClassName={styles.modItem} name={`group_${i.id}`} options={i.modifications} />
                  }
                })}
            </CustomScrollbar>
          </div>
              }
          <div className={styles.toolbar}>
            <div className={styles.productData}>
              {args.product?.image && isPhoneWidth && <img src={`${args.product?.image?.link}?w=100`} className={styles.imageSmall} alt={args.product?.name}/>}
              <div>
                {isPhoneWidth &&  <p className={styles.name}>{args.product?.name}</p>}
                <p className={styles.price}>{Formatter.formatPrice(args.product?.price)}{isPhoneWidth && <> &#183; {args.product?.weight}гр.</>}</p>
              </div>
            </div>
            <QuantityField name={'quantity'} min={1}  className={styles.quantityRoot}/>

            <Button type='submit' className={styles.btn} styleType='filledGreen' font='semibold16'>
              {isPhoneWidth? <>В корзину <CartSvg color={colors.black} className={styles.btnSvg}/></> : 'Добавить'}
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  )



  if (props.isBottomSheet) { 
    return (
      <BottomSheetLayout backgroundColor={colors.purple3} closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={classNames(styles.modalLayout)}>
      {body}
    </ModalLayout>
  )
}

export default function ProductModal(props: Props) {
  return (<>
    <ProductModalInner {...props} />
  </>)
}
