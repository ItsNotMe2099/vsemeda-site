import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import {useAppContext} from 'context/state'
import {IUnit} from 'data/interfaces/IUnit'
import {UnitCardLayoutPosType} from 'data/interfaces/IUnitCardLayout'
import CardImgLayoutPos from 'components/for_pages/Common/UnitCard/CardImgLayoutPos'
import CardBodyLayoutPos from 'components/for_pages/Common/UnitCard/CardBodyLayoutPos'
import {colors} from 'styles/variables'
import {Routes} from 'types/routes'

interface Props {
  unit: IUnit
  className?: string
  wrapperClassName?: string
}

export default function UnitCard({unit, className, wrapperClassName}: Props) {

  const appContext = useAppContext()


  return (
    <Link href={Routes.restaurant(appContext.regionSlug, unit.brand.slug, unit.slug)} className={classNames(styles.root, 'swiper-carousel-animate-opacity', className)}>
      <div className={classNames(styles.cardWrapper, wrapperClassName)}>
      
        <div className={styles.imgContainer}>
          <Image src={unit.brand?.image.link} alt={unit.brand.name} fill/>
          {unit?.cardLayout && unit?.cardLayout [UnitCardLayoutPosType.ImgTl] &&
            <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                              position={'tl'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgTl]} unit={unit}/>}
          {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgTr] &&
            <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                              position={'tr'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgTr]} unit={unit}/>}
          {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgBl] &&
            <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                              position={'bl'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgBl]} unit={unit}/>}
          {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgBr] &&
            <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                              position={'br'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgBr]} unit={unit}/>}
        </div>

        <div className={styles.body}>
          <div className={styles.bodyCenterWrap}>
               {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardT] &&
                <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                                   layout={unit.cardLayout[UnitCardLayoutPosType.CardT]} unit={unit}/>}
            <div className={styles.name}>{unit.brand.name}</div>
              {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardC] &&
                <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                                   layout={unit.cardLayout[UnitCardLayoutPosType.CardC]} unit={unit}/>}
            </div>
          {unit?.cardLayout && (!!unit?.cardLayout[UnitCardLayoutPosType.CardT] || !!unit?.cardLayout[UnitCardLayoutPosType.CardC])&& unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardB] && <div className={styles.bodySeparator}/>}
          {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardB] &&
              <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                                 layout={unit.cardLayout[UnitCardLayoutPosType.CardB]} unit={unit}/>}
        </div>  
        
      </div>
    </Link>
  )
}
