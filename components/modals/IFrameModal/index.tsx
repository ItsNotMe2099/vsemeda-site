import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'
import IconButton from 'components/ui/IconButton'
import IFrame from 'components/ui/IFrame'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  onBackClick: ()=>void
}

export default function IFrameModal(props: Props) {

  const {modalArguments} = useAppContext()


  return ( 
    <ModalLayout className={styles.modalLayout}>
      <ModalBody className={styles.modalBody}>
        <IconButton className={styles.backButton} onClick={props.onBackClick} bgColor={'white'}>
          <ArrowLeftSvg color={colors.purple} className={styles.arrowSvg}/>
        </IconButton>
        <IFrame src={modalArguments}/>
      </ModalBody>
    </ModalLayout>
  )
}