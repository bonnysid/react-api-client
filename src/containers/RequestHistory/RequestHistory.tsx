import React, {FC} from "react";
import s from './RequestHistory.module.css'
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistoryItem from "./RequestHistoryItem/RequestHistoryItem";
import {useActions} from "../../hooks/useActions";
import {QuerySendsay} from "../../types/types";

export interface RequestHistoryProps {
    execQuery: (value: QuerySendsay) => void
}

const RequestHistory: FC<RequestHistoryProps> = ({execQuery}) => {
    const {history, loading, response} = useTypedSelector(state => state.console)
    const {clearAllQueries} = useActions()

    const historyElements = [...history.items].reverse().map(item => <RequestHistoryItem execQuery={execQuery} key={item.id} item={item}/>)

    return (
        <div className={s.container}>
            <div className={s.items}>
                {historyElements}
            </div>
            <button onClick={clearAllQueries} className={s.deleteBtn}><SvgIcon width={'24px'} height={'24px'} fillColor={'#0D0D0D'} urlId={'cross'}/></button>
        </div>
    )
}

export default RequestHistory