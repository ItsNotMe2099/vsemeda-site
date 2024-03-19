import styles from './index.module.scss'

import { useRef, useState } from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6'
import Section7 from './Section7'
import Section8 from './Section8'
import Section9 from './Section9'
import Section10 from './Section10'
import Image from 'next/image'
import Footer from './Footer'
import classnames from 'classnames'
import DownloadSvg from 'components/svg/DownloadSvg'
import { useResize } from 'components/hooks/useResize'


interface Props {
}

export type SectionType = 'delivery'|'rest'

export default function MainPageLanding(props: Props) {
  const {isSmDesktopWidth} = useResize()
  const [type, setType] = useState<SectionType>('rest')
  const switcherItems = useRef<{[key: string]: HTMLParagraphElement}>({})

  return (<div className={styles.root}> 
  <div className={styles.header}>
    <div className={styles.logoWrapper}>
      <Image width="76" height="20" src={'/images/landings/vsemedaLogo.svg'} alt={'vsemeda logo'}/>
    </div>
    <div className={styles.switcher}>
      <p 
      ref={r => {switcherItems.current['rest'] = r}}
      className={classnames(styles.switcherItem,  type=== 'rest'&&styles.switcherItem_active)} 
      onClick={() => setType('rest')}
      >
        Рестораны
      </p>
      <p 
      ref={r => {switcherItems.current['delivery'] = r}}
      className={classnames(styles.switcherItem, type=== 'delivery'&&styles.switcherItem_active)}
      onClick={() => setType('delivery')}
      >
        Доставки
      </p>
      <div 
      className={styles.switcherBack} 
      style={{
        width: (type==='delivery'?switcherItems.current?.delivery?.offsetWidth:switcherItems.current?.rest?.offsetWidth),
        left: (type==='delivery'?switcherItems.current?.delivery?.offsetLeft:switcherItems.current?.rest?.offsetLeft)
      }}></div>
    </div>

    <button className={styles.button}>
      <DownloadSvg/>
      {!isSmDesktopWidth &&
        'Скачать приложение'
      } 
    </button>

  </div>
  <Section1 type={type}/>
  <Section2 type={type}/>
  <Section3 type={type}/>
  <Section4/>
  <Section5 type={type}/>
  <Section6 type={type}/>
  <Section7 type={type}/>
  <Section8 type={type}/>
  <Section9 type={type}/>
  <Section10/>
  <Footer/>
  </div>)
}