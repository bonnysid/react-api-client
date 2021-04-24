import React, {FC, useState} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react'
import s from './QueryResponseBlock.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Button from "../../components/Button/Button";
import GithubLink from "../../components/GithubLink/GithubLink";
import SvgIcon from "../../components/SvgIcon/SvgIcon";

const QueryResponseBlock: FC = (props) => {
    const [query, setQuery] = useState({})
    const {response} = useTypedSelector(state => state.console)

    return (
        <>
            <main className={s.container}>
                <div className={s.item}>
                    <span className={s.title}>Запрос:</span>
                    <Editor
                        mode={'code'}
                        value={query}
                        onChange={(data: Object) => setQuery(data)}
                        navigationBar={false}
                        search={false}
                        statusBar={false}
                    />
                </div>
                <div className={s.item}>
                    <span className={s.title}>Ответ:</span>
                    <Editor
                        mode={'code'}
                        value={response}
                        onChange={() => {}}
                        navigationBar={false}
                        search={false}
                        statusBar={false}
                    />
                </div>
            </main>
            <footer className={s.footer}>
                <Button>Отправить</Button>
                <GithubLink username={'bonnysid'}/>
                <button className={s.formatBtn}>
                    <SvgIcon width={'24px'} height={'24px'} fillColor={'#0d0d0d'} urlId={'format'}/>
                    <span className={s.formatText}>Форматировать</span>
                </button>
            </footer>
        </>

    )
}

export default QueryResponseBlock