import React, {FC, useState} from 'react'
import {ISendsayQuery} from "../../../types/types";
import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import s from './RequestHistoryItem.module.css';

export interface RequestHistoryItemProps {
    item: ISendsayQuery
}

const RequestHistoryItem: FC<RequestHistoryItemProps> = ({item}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const toggleModal = () => setIsOpenModal(prevState => !prevState)

    return (
        <div className={s.container}>
            <div className={`${s.status} ${item.isSuccess ? 'bg-green' : 'bg-red'}`}/>
            <span className={s.action}>{item.action}</span>
            <button onClick={toggleModal}>
                <SvgIcon width={'4px'} height={'18px'} fillColor={'rgba(0, 0, 0, 0.2)'} urlId={'dots'}/>
            </button>
            {isOpenModal &&
            <div className={s.modal}>
                <div className={s.modal__block}>
                    <button className={`${s.modal__btn}`}>Выполнить</button>
                    <button className={`${s.modal__btn} bg-blue-hover`}>Скопировать</button>
                </div>
                <div className={s.modal__block}>
                    <button className={`${s.modal__btn} bg-red-hover`}>Удалить</button>
                </div>
            </div>}
        </div>
    )
}

export default RequestHistoryItem