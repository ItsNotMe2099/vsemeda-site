import ChevronSvg from 'components/svg/ChevronSvg'
import BackBtn from 'components/ui/BackBtn'
import { IComplaintType } from 'data/interfaces/IComplaint'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  onClick: (c: IComplaintType) => void
  onBack: ()=>void
  complaints: IComplaintType[]
}

export default function ComplaintTypes (props: Props) {

  return (<>
    <div className={styles.header}>
      <BackBtn onClick={props.onBack} bgColor={'white'}/>
      <p className={styles.title}>Выберите тему</p>
    </div>
    <div className={styles.complaintTypes}>
      {props.complaints.map(complaint => {
        return (
          <div className={styles.type} onClick={()=>{props.onClick(complaint)}}>
            <p className={styles.typeDesc}>{complaint.name}</p>
            <ChevronSvg color={colors.dark1} className={styles.typeSvg}/>
          </div>
        )
      })}
    </div>
  </>)
}