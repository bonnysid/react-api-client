import React, {FC, useState} from 'react'
import {IHistoryItem, QuerySendsay} from "../../../types/types";
import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import s from './RequestHistoryItem.module.css';
import {useActions} from "../../../hooks/useActions";

export interface RequestHistoryItemProps {
    item: IHistoryItem,
    execQuery: (value: QuerySendsay) => void
}

const RequestHistoryItem: FC<RequestHistoryItemProps> = ({item, execQuery}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const {removeQueryFromHistory} = useActions()

    const deleteQuery = () => removeQueryFromHistory({id: item.id})

    const toggleModal = () => setIsOpenModal(prevState => !prevState)

    const copyQuery = () => {
        navigator.clipboard.writeText(JSON.stringify(item.content, null, 2))
        toggleModal()
    }

    const invokeQuery = () => {
        toggleModal()
        execQuery(item.content)
    }

    return (
        <div className={s.container}>
            <div className={`${s.status} ${item.isSuccess ? 'bg-green' : 'bg-red'}`}/>
            <span className={s.action}>{item.action}</span>
            <button className={s.toggleBtn} onClick={toggleModal}>
                <SvgIcon width={'4px'} height={'18px'} fillColor={'rgba(0, 0, 0, 0.2)'} urlId={'dots'}/>
            </button>
            {isOpenModal &&
            <div className={s.modal}>
                <div className={s.modal__block}>
                    <button onClick={invokeQuery} className={`${s.modal__btn}`}>Выполнить</button>
                    <button onClick={copyQuery} className={`${s.modal__btn} bg-blue-hover`}>Скопировать</button>
                </div>
                <div className={s.modal__block}>
                    <button onClick={deleteQuery} className={`${s.modal__btn} bg-red-hover`}>Удалить</button>
                </div>
            </div>}
        </div>
    )
}

export default RequestHistoryItem