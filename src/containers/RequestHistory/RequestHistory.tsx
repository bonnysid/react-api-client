import React, {FC} from "react";
import s from './RequestHistory.module.css'
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistoryItem from "./RequestHistoryItem/RequestHistoryItem";

const RequestHistory: FC = () => {
    const {history, loading, response} = useTypedSelector(state => state.console)

    const historyElements = [...history.items].reverse().map(item => <RequestHistoryItem key={item.id} item={item}/>)

    return (
        <div className={s.container}>
            <div className={s.items}>
                {historyElements}
            </div>
            <button className={s.deleteBtn}><SvgIcon width={'24px'} height={'24px'} fillColor={'#0D0D0D'} urlId={'cross'}/></button>
        </div>
    )
}

export default RequestHistory