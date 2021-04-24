import React, {FC, useState} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react'
import s from './QueryResponseBlock.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Button from "../../components/Button/Button";
import GithubLink from "../../components/GithubLink/GithubLink";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
import {useActions} from "../../hooks/useActions";
import {QuerySendsay} from "../../types/types";

const QueryResponseBlock: FC = (props) => {
    const [query, setQuery] = useState<QuerySendsay>({action: 'pong'})
    const {response} = useTypedSelector(state => state.console)
    const {request} = useActions()

    const handleSendClick = () => {
        request({query})
    }

    const handleFormatClick = () => {
        setQuery(prevState => prevState)
    }
    console.log(response)
    return (
        <>
            <main className={s.container}>
                <div className={s.item}>
                    <span className={s.title}>Запрос:</span>
                    <Editor
                        mode={'code'}
                        value={query}
                        onChange={(data: QuerySendsay) => {
                            setQuery(data)
                        }}
                        navigationBar={false}
                        search={false}
                        statusBar={false}
                    />
                </div>
                <div className={s.item}>
                    <span className={s.title}>Ответ:</span>
                    <div className={s.outer}>
                        <textarea className={s.response} value={JSON.stringify(response, null, 4)} disabled={true}/>
                    </div>
                </div>
            </main>
            <footer className={s.footer}>
                <Button onClick={handleSendClick}>Отправить</Button>
                <GithubLink username={'bonnysid'}/>
                <button onClick={handleFormatClick} className={s.formatBtn}>
                    <SvgIcon width={'24px'} height={'24px'} fillColor={'#0d0d0d'} urlId={'format'}/>
                    <span className={s.formatText}>Форматировать</span>
                </button>
            </footer>
        </>

    )
}

export default QueryResponseBlock