import styles from './index.module.scss'
import {IUnit} from 'data/interfaces/IUnit'
import UnitCard from 'components/for_pages/Common/UnitCard'
import { useAppContext } from 'context/state'
import { useIndexPageContext } from 'context/index_page_state'

interface Props {
  units: IUnit[]
}

export default function UnitList(props: Props) {
  const appContext = useAppContext()
  const indexPageContext = useIndexPageContext()

  return (
    <div className={styles.wrapper} ref={indexPageContext.unitsSectionRef}>
      <p className={styles.title}>{appContext.isMobile? 'Рестораны 🙌':'Лучшие рестораны 🙌'}</p>
        <ul className={styles.root}>
          {props.units.map((unit, index) => <UnitCard key={index} unit={unit} className={styles.card}/>)}
        </ul>
    </div>
  )
}
