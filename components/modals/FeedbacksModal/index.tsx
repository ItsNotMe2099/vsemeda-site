import ModalBody from "components/layout/Modal/ModalBody";
import ModalLayout from "components/layout/Modal/ModalLayout";
import StartFilledSvg from "components/svg/StartFilledSvg";
import UserSvg from "components/svg/UserSvg";
import CloseModalBtn from "components/ui/CloseModalBtn";
import { colors } from "styles/variables";
import styles from "./index.module.scss"
import { useEffect, useState } from "react";
import FeedbackRepository from "data/repositories/FeedbackRepository";
import { useAppContext } from "context/state";


interface Props {
    onRequestClose: () => void
}


function FeedbacksModalInner (props: Props) {
    const appContext = useAppContext()

    const {brand} = appContext.modalArguments
    const [page, setPage] = useState(1)
    const [isLoaded, setLoading] = useState(false)

    const fetchFeedbacks = async (id: number)=> {
        await FeedbackRepository.fetchByUnitId(id, {page: page, limit: 5})
    }


    //пример использования infinite scroll
    // const handleScrollNext = async () => {
    //     setPage(page + 1)
    //     setLoading(true)
    //     await OrderRepository.fetchHistory({ page: page + 1, limit: limit }).then((data) => {
    //       if (data) {
    //         setOrders(orders => [...orders, ...data.data])
    //       }
    //     })
    //     setLoading(false)
    // }

    //в компоненте
    // <InfiniteScroll
    //           dataLength={orders.length} //This is important field to render the next data
    //           next={handleScrollNext}
    //           hasMore={total > orders.length}
    //           loader={loading ? <Spinner size={50} color="#fff" secondaryColor="rgba(255,255,255,0.4)" /> : null}
    //           scrollableTarget='scrollableDiv'
    //         >
    //           {orders.map((i, index) =>
    //             <OrderCard order={i} key={index} />
    //           )}
    //         </InfiniteScroll>


    
    useEffect(()=>{
        fetchFeedbacks(brand.id)
    }, [])

    const body = (<>
        <div className={styles.title}>
            <p className={styles.name}>{brand? brand.name: "no available name"}</p>
            <div className={styles.points}>
                <StartFilledSvg color={colors.orange2} className={styles.points__star}/>
                <p className={styles.points__count} >4.8 (273 отзывов)</p>
            </div>
        </div>
        <div className={styles.feedbacks}>
            
            
            <div className={styles.item}>
                <div className={styles.item__top}>
                    <div className={styles.item__user}>
                        <div className={styles.item__userLogo}>
                            {/* сюда рендер аватара пользователя, если нет - svg */}
                            <UserSvg color="black" className={styles.item__userSvg}/>
                        </div>
                        <div>
                            <div className={styles.item__userName}>Anresxxx1872</div>
                            <time className={styles.item__posted} dateTime="2022-11-10 15:32">10.11.22 15:32</time>
                        </div>
                    </div>
                    <div className={styles.item__points}>
                        <div className={styles.item__points__stars}>
                            {/* сюда рендер звездочек */}
                            <StartFilledSvg color={colors.orange2} className={styles.item__points__star}/>
                            <StartFilledSvg color={colors.orange2} className={styles.item__points__star}/>
                            <StartFilledSvg color={colors.orange2} className={styles.item__points__star}/>
                            <StartFilledSvg color={colors.orange2} className={styles.item__points__star}/>
                            <StartFilledSvg color={colors.grey4} className={styles.item__points__star}/>
                        </div>
                        <p className={styles.item__points__number}>5.0</p>
                    </div>
                </div>
                <p className={styles.item__body}>
                    По своей сути рыбатекст является альтернативой традиционному
                </p>

            </div>
            <div className={styles.item}>
                
            </div>
            
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