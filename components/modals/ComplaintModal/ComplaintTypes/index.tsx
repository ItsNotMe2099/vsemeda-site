import ChevronSvg from 'components/svg/ChevronSvg'
import BackBtn from 'components/ui/BackBtn'
import { colors } from 'styles/variables'
import { ComplaintsTypes } from '..'
import styles from './index.module.scss'

interface Props {
  onClick: (c: keyof ComplaintsTypes) => void
  onBack: ()=>void
  complaints: ComplaintsTypes
}

export default function ComplaintTypes (props: Props) {

  return (<>
    <div className={styles.header}>
      <BackBtn onClick={props.onBack} bgColor={'white'}/>
      <p className={styles.title}>Выберите тему</p>
    </div>
    <div className={styles.complaintTypes}>
      {Object.entries(props.complaints).map(([key, value]) => {
        return (
          <div className={styles.type} onClick={()=>{props.onClick(key as keyof ComplaintsTypes)}}>
            <p className={styles.typeDesc}>{value}</p>
            <ChevronSvg color={colors.dark1} className={styles.typeSvg}/>
          </div>
        )
      })}
    </div>
  </>)
}