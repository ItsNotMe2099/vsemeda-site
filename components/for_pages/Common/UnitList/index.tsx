import styles from 'components/for_pages/Common/UnitList/index.module.scss'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'

interface Props {
  units: IUnit[]
}

export default function UnitList(props: Props) {
  return (
    <ul className={styles.root}>
      {props.units.map(unit => <UnitCard unit={unit}/>)}
    </ul>
  )
}
