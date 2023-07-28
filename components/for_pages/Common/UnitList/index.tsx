import styles from './index.module.scss'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import { useAppContext } from 'context/state'

interface Props {
  units: IUnit[]
}

export default function UnitList(props: Props) {
  const appContext = useAppContext()
  return (<div className={styles.wrapper}>
    <p className={styles.title}>{appContext.isMobile? 'Рестораны 🙌':'Лучшие рестораны 🙌'}</p>
      <ul className={styles.root}>
        {props.units.map(unit => <UnitCard unit={unit} className={styles.card}/>)}
      </ul>
  </div >)
}
