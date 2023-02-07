import {LayoutIcon} from 'data/enum/LayoutIcon'
import GiftSvg from 'components/svg/GiftSvg'
import OnePlusOneSvg from 'components/svg/OnePlusOneSvg'
import PercentSvg from 'components/svg/PercentSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import RubleSvg from 'components/svg/RubleSvg'
import MinusCircleOutlineSvg from 'components/svg/MinusCircleOutlineSvg'
import AlertOctagonSvg from 'components/svg/AlertOctagonSvg'
import ShieldCheckSvg from 'components/svg/ShieldCheckSvg'



interface Props {
  icon: LayoutIcon
  color: string
}

export default function LayoutIconImage({ icon, color }: Props) {
  const iconProps = {color}

  switch (icon){
    case LayoutIcon.Alert:
      return <AlertOctagonSvg {...iconProps}/>
    case LayoutIcon.Gift:
      return <GiftSvg {...iconProps}/>
    case LayoutIcon.OnePlusOne:
      return <OnePlusOneSvg {...iconProps}/>
    case LayoutIcon.Percent:
      return <PercentSvg {...iconProps}/>
    case LayoutIcon.Rating:
      return <StartFilledSvg {...iconProps}/>
    case LayoutIcon.Ruble:
      return <RubleSvg {...iconProps}/>
    case LayoutIcon.Stop:
      return <MinusCircleOutlineSvg  {...iconProps}/>
    case LayoutIcon.ScooterCrossed:
      return <MinusCircleOutlineSvg  {...iconProps}/>
    case LayoutIcon.ShieldCheck:
      return <ShieldCheckSvg  {...iconProps}/>
    default:
      return null
  }
}
