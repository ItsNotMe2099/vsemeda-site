import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import CloseModalBtn from 'components/ui/CloseModalBtn'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import FeedbackRepository from 'data/repositories/FeedbackRepository'
import { useAppContext } from 'context/state'
import { IUnit } from 'data/interfaces/IUnit'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IReview } from 'data/interfaces/IReview'
import Spinner from 'components/ui/Spinner'
import ReviewCard from './ReviewCard/ReviewCard'
import Formatter from 'utils/formatter'


interface Props {
    onRequestClose: () => void
}


function FeedbacksModalInner (props: Props) {

    const appContext = useAppContext()
    const {brand, id, rating} = appContext.modalArguments as IUnit

    const limit = 10
    const [feedBacksState, setFeedbacks] = useState<IReview[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [feedBackPage, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    const feedBackContainer = useRef<HTMLDivElement>(null!)

    const fetchFeedbacks = async (id: number, page: number, limit: number) => {
        setLoading(true)
        await FeedbackRepository.fetchByUnitId(id, {page: page, limit: limit})
        .then(feedBacks  => {
            if(feedBacks) {                
                setFeedbacks(feedBacksState => {
                    return feedBackPage !== 1?
                    [...feedBacksState, ...feedBacks.data]
                    : feedBacks.data})
                total === 0? setTotal(feedBacks.total): false
            }
        })
        setLoading(false)
    }

    useEffect(()=>{
        fetchFeedbacks(id, feedBackPage, limit)
    }, [feedBackPage])

    const body = (<>
        <div className={styles.title}>
            <p className={styles.name}>{ brand.name ?? 'No Brand'}</p>
            <div className={styles.points}>
                <StartFilledSvg color={colors.orange2} className={styles.points__star}/>
                <p className={styles.points__count}>
                    {rating} ({total} {Formatter.pluralize(total, 'отзыв', 'отзыва', 'отзывов')})
                </p>
            </div>
        </div>
        <div className={styles.feedbacks} ref={feedBackContainer}>          
            <InfiniteScroll
            dataLength={feedBacksState.length}
            next={()=>setPage(feedBackPage + 1)}
            height={feedBackContainer.current?.clientHeight??300}
            hasMore={total > feedBacksState.length}
            loader={loading ? <Spinner size={50} color="#fff" secondaryColor="rgba(255,255,255,0.4)" /> : null}
            scrollableTarget='scrollableDiv'
            >
                {feedBacksState.map((i, index) =>
                    <ReviewCard item={i} key={index} />
                )}
             </InfiniteScroll>
        </div>
    </>)

    return (<>
        <ModalLayout fixed className={styles.modalLayout}>
            <div className={styles.close}>
                <CloseModalBtn color={colors.grey3} onClick={props.onRequestClose}/>
            </div>
            <ModalBody className={styles.body}>{body}</ModalBody>
        </ModalLayout>
    </>)
}


export default function FeedbacksModal(props: Props) {

    return (<>
        <FeedbacksModalInner {...props}/>
    </>)
  }