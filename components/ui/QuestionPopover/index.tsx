import styles from './index.module.scss'
import {ReactElement, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import {usePopper} from 'react-popper'
import {listenForOutsideClicks} from 'components/hooks/useDetectOutsideClick'
import DropDownTriangle from 'components/ui/DropDownTriangle'
import {useAppContext} from 'context/state'
import InfoSvg from 'components/svg/InfoSvg'

interface Props {
  info: () => ReactElement
  className?: string 
}



export default function QuestionPopover(props: Props) {
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [appContext.isMobile ? 8 : 13, 0],
        },
      },

    ]
  })
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))
  return (
    <div ref={dropdownRef} className={classNames(styles.root,  props.className)}  onMouseOver={() => setIsActive(!isActive)}>
      <div ref={setReferenceElement} className={styles.inner} >
        <InfoSvg/>
      </div>
      <div className={classNames({[styles.dropDown]: true, [styles.opened]: isActive})} ref={setPopperElement} style={popperStyles.popper}  {...attributes.popper}>
        {props.info ? props.info() : null}
      <DropDownTriangle className={styles.triangle}/>
      </div>
    </div>


  )
}
