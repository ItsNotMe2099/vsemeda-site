import { useState } from 'react'
import Section1 from './Section1'
import styles from './index.module.scss'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6'
import Section7 from './Section7'
import Section8 from './Section8'
import Section9 from './Section9'
import Section10 from './Section10'


interface Props {
}

export type SectionType = 'delivery'|'rest'

export default function MainPageLanding(props: Props) {
  const [type, setType] = useState('')

  return (<div className={styles.root}> 
  <Section1 type={'rest'}/>
  <Section2/>
  <Section3/>
  <Section4/>
  <Section5/>
  <Section6/>
  <Section7/>
  <Section8/>
  <Section9/>
  <Section10/>







  </div>)
}