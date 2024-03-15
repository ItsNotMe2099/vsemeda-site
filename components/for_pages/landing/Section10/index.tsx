import ChevronSvg from 'components/svg/ChevronSvg'
import styles from './index.module.scss'
import { colors } from 'styles/variables'
import { useRef, useState } from 'react'
import classNames from 'classnames'

interface Props {
}

export default function Section10(props: Props) {
  const itemsRef = useRef<{[key: string]: HTMLDivElement}>({})
  const [activeEl, setActiveEl] = useState<string>()

  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <p className={styles.title}>🤔 Часто задаваемые вопросы</p>
      <div className={styles.faq}>

        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '1' ? '' : '1')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Почему не нахожу любимый ресторан в выдаче?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='1'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='1'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['1']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['1'] = r}}  className={styles.faqContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque nesciunt adipisci explicabo ea quasi aliquam dolorum consectetur, dolores, itaque a ratione ipsam nemo. Error explicabo, perferendis sed sapiente voluptatum in corporis consectetur sunt rem fuga, iure, libero voluptatibus earum.</p>
          </div>
        </div>
        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '2' ? '' : '2')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Как работает ваш сервис скидок для ресторанов?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='2'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='2'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['2']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['2'] = r}}  className={styles.faqContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque nesciunt adipisci explicabo ea quasi aliquam dolorum consectetur, dolores, itaque a ratione ipsam nemo. Error explicabo, perferendis sed sapiente voluptatum in corporis consectetur sunt rem fuga, iure, libero voluptatibus earum.</p>
          </div>
        </div>
        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '3' ? '' : '3')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Какие рестораны участвуют в вашей программе скидок?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='3'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='3'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['3']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['3'] = r}}  className={styles.faqContent}>
              {'В нашей программе скидок участвуют различные рестораны по всему городу. На данный момент в программе участвует более 50 популярных ресторанов, включая \'Ресторан Лавка\', \'Уютная Трапеза\' и \'Гурманский Уголок\'. Мы постоянно работаем над расширением списка участвующих заведений, чтобы предоставить нашим клиентам больше выбора и возможностей сэкономить.'}
            </p>
          </div>
        </div>
        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '4' ? '' : '4')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Как я могу воспользоваться скидками в вашем сервисе?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='4'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='4'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['4']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['4'] = r}}  className={styles.faqContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque nesciunt adipisci explicabo ea quasi aliquam dolorum consectetur, dolores, itaque a ratione ipsam nemo. Error explicabo, perferendis sed sapiente voluptatum in corporis consectetur sunt rem fuga, iure, libero voluptatibus earum.</p>
          </div>
        </div>
        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '5' ? '' : '5')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Есть ли какие-то ограничения или условия для использования скидок?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='5'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='5'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['5']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['5'] = r}}  className={styles.faqContent}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque nesciunt adipisci explicabo ea quasi aliquam dolorum consectetur, dolores, itaque a ratione ipsam nemo. Error explicabo, perferendis sed sapiente voluptatum in corporis consectetur sunt rem fuga, iure, libero voluptatibus earum.
            </p>
          </div>
        </div>
        <div className={styles.faqItem} onClick={() => setActiveEl(activeEl === '6' ? '' : '6')}>
          <div className={styles.faqTop} >
            <p className={styles.faqTitle}>Какие виды скидок доступны через ваш сервис?</p>
            <ChevronSvg color={colors.grey1} className={activeEl==='6'&&styles.svgActive}/>
          </div>
          <div 
          className={classNames(styles.faqOverflow, activeEl==='6'&&styles.faqOverflow_active)}
          //@ts-ignore 
          style={{'--height': itemsRef?.current?.['6']?.offsetHeight+'px'}}
          >
            <p  ref={r => {itemsRef.current['6'] = r}}  className={styles.faqContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste cumque nesciunt adipisci explicabo ea quasi aliquam dolorum consectetur, dolores, itaque a ratione ipsam nemo. Error explicabo, perferendis sed sapiente voluptatum in corporis consectetur sunt rem fuga, iure, libero voluptatibus earum.</p>
          </div>
        </div>

      </div>
      <div className={styles.line}>
        <p className={styles.lineTitle}>Не нашли ответы на вопрос?</p>
        <button className={styles.button}>Написать нам</button>
      </div>
    </div>
  </section>)
}