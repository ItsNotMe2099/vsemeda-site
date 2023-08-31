import styles from './index.module.scss'

interface Props {
  src: string
}

export default function IFrame(props: Props) {

  return ( 
    <iframe src={props.src} className={styles.iframe}></iframe>
  )
}