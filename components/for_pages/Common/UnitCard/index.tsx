import Link from 'next/link'
import styles from 'components/for_pages/Common/UnitCard/index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import {useAppContext} from 'context/state'
import {IUnit} from 'data/interfaces/IUnit'
import {UnitCardLayoutPosType} from 'data/interfaces/IUnitCardLayout'
import CardImgLayoutPos from 'components/for_pages/Common/UnitCard/CardImgLayoutPos'
import CardBodyLayoutPos from 'components/for_pages/Common/UnitCard/CardBodyLayoutPos'
import {colors} from 'styles/variables'

interface Props {
  unit: IUnit
}

export default function UnitCard({unit}: Props) {

  const appContext = useAppContext()


  return (
    <Link href={`/restaurant/${unit.id}`} className={classNames(styles.root)}>
      <div className={styles.imgContainer}>
        <Image src={unit.brand?.image.link} alt={unit.brand.name} fill/>
        {unit?.cardLayout && unit?.cardLayout [UnitCardLayoutPosType.ImgTl] &&
          <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                            position={'tl'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgTl]}/>}
        {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgTr] &&
          <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                            position={'tr'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgTr]}/>}
        {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgBl] &&
          <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                            position={'bl'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgBl]}/>}
        {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.ImgBr] &&
          <CardImgLayoutPos bgColor={colors.purple} color={colors.white} margin={'normal'} size={'large'}
                            position={'br'} layout={unit.cardLayout [UnitCardLayoutPosType.ImgBr]}/>}

      </div>
      <div className={styles.body}>
        <div className={styles.bodyCenterWrap}>
          <div className={styles.bodyTop}>
            {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardT] &&
              <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                                 layout={unit.cardLayout [UnitCardLayoutPosType.CardT]}/>}
          </div>
          <div className={styles.name}>{unit.brand.name}</div>
          <div className={styles.bodyCenter}>
            {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardC] &&
              <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                                 layout={unit.cardLayout [UnitCardLayoutPosType.CardC]}/>}
          </div>
        </div>
        <div className={styles.bodyBottom}>
          {unit?.cardLayout && unit?.cardLayout[UnitCardLayoutPosType.CardB] &&
            <CardBodyLayoutPos color={colors.grey1} margin={'normal'} size={'normal'}
                               layout={unit.cardLayout [UnitCardLayoutPosType.CardB]}/>}
        </div>


      </div>
    </Link>
  )
}
