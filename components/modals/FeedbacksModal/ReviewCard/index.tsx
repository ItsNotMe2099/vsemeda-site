import ArrowAnswerSvg from 'components/svg/ArrowAnswerSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import UserSvg from 'components/svg/UserSvg'
import { IReview } from 'data/interfaces/IReview'
import { colors } from 'styles/variables'
import Formatter from 'utils/formatter'
import styles from './index.module.scss'

interface Props {
    item: IReview
    key: number
}

export default function ReviewCard(props: Props) {

    const maxStarMarks = 5

    const starMarks = () => {
        let marks:JSX.Element[] = []
        for(let i = 0; i < maxStarMarks; i++) {
            marks.push(
            <StartFilledSvg key={i} color={props.item.mark > i? colors.orange2: colors.grey4} className={styles.pointsStar}/>
            )
        }
        return marks
    }
    
    return (
        <div className={styles.root} key={props.key}>
            <div className={styles.top}>
                <div className={styles.user}>
                    <div className={styles.userLogo}>
                        {/* сюда рендер аватара пользователя, если нет - svg */}
                        <UserSvg color="black" className={styles.userSvg}/>
                        
                    </div>
                    <div>
                        {props.item.userName && 
                            <div className={styles.userName}>{props.item.userName}</div>
                        }
                        <time className={styles.createdTime} dateTime="2022-11-10 15:32">
                            {Formatter.formatToShortYear(props.item.createdAt)}
                        </time>
                    </div>
                </div>
                <div className={styles.points}>
                    <div className={styles.pointsStars}>
                        {starMarks().map(el=> {
                            return el
                        })}
                    </div>
                    <p className={styles.pointsNumber}>{props.item.mark}.0</p>
                </div>
            </div>
            <p className={styles.body}>
               {props.item.text}
            </p>
            {props.item.answer&&
            <div className={styles.answerWrapper}>
                <ArrowAnswerSvg className={styles.answerSvg}/>
                <p className={styles.answerTitle}>ответ:</p>
                <p className={styles.answer}>{props.item.answer}</p>
            </div>
            }
        </div>
    )
}