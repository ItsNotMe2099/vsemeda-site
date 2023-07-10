import * as React from 'react'
import styles from './index.module.scss'
import {useMemo} from 'react'
import OnePlusOneSvg from 'components/svg/OnePlusOneSvg'
import PercentSvg from 'components/svg/PercentSvg'
import ScooterSvg from 'components/svg/ScooterSvg'
import RubleSvg from 'components/svg/RubleSvg'
import {PromoIcon} from 'data/enum/PromoIcon'
import {PromoColor} from 'data/enum/PromoColor'
import {PromoTemplate} from 'data/enum/PromoTemplate'
import {IPromo} from 'data/interfaces/IPromo'
import GiftSvg from 'components/svg/GiftSvg'


interface Props {
    image?: any
    icon: PromoIcon,
    color: PromoColor,
    badgeColor: PromoColor,
    template: PromoTemplate,
    badge?: string
    name?: string
}


const PromoCardInner = (props: Props) => {
    const icon = useMemo(() => {
        const color = props.color
        switch (props.icon){
            case PromoIcon.OnePlusOne:
                return <OnePlusOneSvg color={color}/>
            case PromoIcon.Ruble:
                return <RubleSvg color={color}/>
            case PromoIcon.Scooter:
                return <ScooterSvg color={color}/>
            case PromoIcon.Percent:
                return <PercentSvg color={color}/>
            case PromoIcon.Gift:
              return <GiftSvg color={color}/>
        }
    }, [props.icon, props.color])

    return (<div className={styles.root} style={{...(props.color ? {backgroundColor: props.color} : {})}}>
         <div className={styles.block}>
             {props.icon && icon}
             <div className={styles.name}>{props.name}</div>
         </div>
        <div className={styles.badge}>{props.badge}</div>
        {props.image && <img src={props.image.link} className={styles.image}/>}
    </div>)
}
export const PromoCard = ({promo}: {promo: IPromo}) => {
  return     <PromoCardInner icon={promo.icon} color={promo.color} template={promo.template} name={promo.name} badge={promo.badge} badgeColor={promo.badgeColor as PromoColor} image={promo.image} />

}
export default PromoCard
