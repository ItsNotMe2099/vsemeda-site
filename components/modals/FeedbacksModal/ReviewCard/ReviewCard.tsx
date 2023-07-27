import ArrowAnswerSvg from 'components/svg/ArrowAnswerSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import UserSvg from 'components/svg/UserSvg'
import { IReview } from 'data/interfaces/IReview'
import { colors } from 'styles/variables'
import Formatter from 'utils/formatter'
import s from './reviewCard.module.scss'

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
            <StartFilledSvg key={i} color={props.item.mark > i? colors.orange2: colors.grey4} className={s.item__points__star}/>
            )
        }
        return marks
    }
    
    return (
        <div className={s.item} key={props.key}>
            <div className={s.item__top}>
                <div className={s.item__user}>
                    <div className={s.item__userLogo}>
                        {/* сюда рендер аватара пользователя, если нет - svg */}
                        <UserSvg color="black" className={s.item__userSvg}/>
                        
                    </div>
                    <div>
                        {props.item.userName && 
                            <div className={s.item__userName}>{props.item.userName}</div>
                        }
                        <time className={s.item__posted} dateTime="2022-11-10 15:32">
                            {Formatter.formatToShortYear(props.item.createdAt)}
                        </time>
                    </div>
                </div>
                <div className={s.item__points}>
                    <div className={s.item__points__stars}>
                        {starMarks().map(el=> {
                            return el
                        })}
                    </div>
                    <p className={s.item__points__number}>{props.item.mark}.0</p>
                </div>
            </div>
            <p className={s.item__body}>
               {props.item.text}
            </p>
            {props.item.answer&&
            <div className={s.item__answerWrapper}>
                <ArrowAnswerSvg className={s.item__answerSvg}/>
                <p className={s.item__answerTitle}>ответ:</p>
                <p className={s.item__answer}>{props.item.answer}</p>
            </div>
            }
        </div>
    )
}