import React, {FC, useEffect, useRef, useState} from "react";
// import {Resizable} from 're-resizable'
import Editor from '../Editor/Editor'
import s from './QueryResponseBlock.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Button from "../../components/Button/Button";
import GithubLink from "../../components/GithubLink/GithubLink";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useActions} from "../../hooks/useActions";
import {QuerySendsay} from "../../types/types";

export interface QueryResponseBlockProps {
    query: QuerySendsay,
    setQuery: React.Dispatch<React.SetStateAction<QuerySendsay>>
}

const QueryResponseBlock: FC<QueryResponseBlockProps> = ({query, setQuery}) => {

    const {response, loading} = useTypedSelector(state => state.console)
    const [formattedQuery, setFormattedQuery] = useState('')
    const {request} = useActions()

    const handleSendClick = () => {
        request({query})
    }

    const handleFormatClick = () => {
        setFormattedQuery(JSON.stringify(query, null, 2))
    }

    return (
        <>
        <main className={s.container}>
            <div className={s.item}>
                <span className={s.title}>Запрос:</span>
                <Editor
                    mode={'code'}
                    value={query}
                    onChange={(data: QuerySendsay) => setQuery(data)}
                    formattedValue={formattedQuery}
                    navigationBar={false}
                    search={false}
                    statusBar={false}
            />
        </div>
        <div className={s.item}>
            <span className={s.title}>Ответ:</span>
            <div className={s.outer}>
                        <textarea
                            className={s.response}
                            value={response && JSON.stringify(response, null, 4)}
                            disabled={true}/>
            </div>
        </div>
        </main>
    <footer className={s.footer}>
        <Button onClick={handleSendClick}>Отправить</Button>
        <GithubLink username={'bonnysid'}/>
        <button onClick={handleFormatClick} className={s.formatBtn}>
            <SvgIcon className={s.formatIcon} urlId={'format'}/>
            <span className={s.formatText}>Форматировать</span>
        </button>
    </footer>
</>

)
}

export default QueryResponseBlock