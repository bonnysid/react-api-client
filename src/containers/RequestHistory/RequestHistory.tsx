import React, {FC} from "react";
import s from './RequestHistory.module.css'
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistoryItem from "./RequestHistoryItem/RequestHistoryItem";
import {useActions} from "../../hooks/useActions";
import {QuerySendsay} from "../../types/types";
import ScrollMenu from "react-horizontal-scrolling-menu";

export interface RequestHistoryProps {
    execQuery: (value: QuerySendsay) => void
}

const RequestHistory: FC<RequestHistoryProps> = ({execQuery}) => {
    const {history, loading, response} = useTypedSelector(state => state.console)
    const {clearAllQueries} = useActions()

    const historyElements = [...history.items].reverse().map(item => <RequestHistoryItem execQuery={execQuery} key={item.id} item={item}/>)

    return (
        <div className={s.container}>
            <ScrollMenu
                data={historyElements}
            />
            {/*<div className={s.items}>*/}
            {/*    {historyElements}*/}
            {/*</div>*/}
            <button onClick={clearAllQueries} className={s.deleteBtn}><SvgIcon className={s.icon} urlId={'cross'}/></button>
        </div>
    )
}

export default RequestHistory