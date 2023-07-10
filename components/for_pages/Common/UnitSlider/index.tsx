import {IUnit} from 'data/interfaces/IUnit'
import UnitSliderDesktop from 'components/for_pages/Common/UnitSlider/UnitSliderDesktop'
import UnitSliderMobile from 'components/for_pages/Common/UnitSlider/UnitSliderMobile'
interface Props {
  className?: string
  units: IUnit[]
  isMobile?: boolean
}

export default function UnitSlider(props: Props) {
  return (
    props.isMobile ? <UnitSliderMobile units={props.units}/> : <UnitSliderDesktop units={props.units}/>
  )
}
