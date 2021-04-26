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
import Loader from "../../components/Loader/Loader";
import {Resizable} from "re-resizable";
import dots from '../../assets/icons/dots.svg'

export interface QueryResponseBlockProps {
    query: QuerySendsay,
    setQuery: React.Dispatch<React.SetStateAction<QuerySendsay>>
}

const QueryResponseBlock: FC<QueryResponseBlockProps> = ({query, setQuery}) => {

    const {response, loading, responseError} = useTypedSelector(state => state.console)
    const [formattedQuery, setFormattedQuery] = useState('')
    const [isJsonError, setJsonError] = useState(false)
    const {request, resetError, clearResponse} = useActions()

    useEffect(() => {
        clearResponse()
        resetError()
    }, [])

    const handleSendClick = () => {
        request({query})
    }

    const handleFormatClick = () => {
        setFormattedQuery(JSON.stringify(query, null, 2))
    }

    return (
        <>
            <main className={s.container}>
                <Resizable
                    style={{marginRight: 5, paddingRight: 5}}
                    minHeight={'100%'}
                    defaultSize={{
                        width: '50%',
                        height: '100%'
                    }}
                    enable={{
                        bottom: false,
                        bottomLeft: false,
                        bottomRight: false,
                        left: false,
                        top: false,
                        topLeft: false,
                        topRight: false,
                        right: true
                    }}
                >
                    <div className={s.item}>
                        <span className={`${s.title} ${isJsonError ? 'error-text' : ''}`}>Запрос:</span>
                        <Editor
                            mode={'code'}
                            value={query}
                            onChange={(data: QuerySendsay) => {
                                setJsonError(false)
                                setQuery(data)
                            }}
                            onError={error => {
                                if (error) setJsonError(true)
                                else setJsonError(false)
                            }}
                            formattedValue={formattedQuery}
                            navigationBar={false}
                            search={false}
                            statusBar={false}
                        />
                    </div>
                </Resizable>

                <div className={s.item}>
                    <span className={`${s.title} ${responseError ? 'error-text' : ''}`}>Ответ:</span>
                    <div className={`${s.outer}  ${responseError ? 'error-field' : ''}`}>
                        <textarea
                            className={`${s.response}`}
                            value={response ? JSON.stringify(response, null, 4) : ''}
                            disabled={true}/>
                    </div>
                </div>


            </main>
            <footer className={s.footer}>
                <Button onClick={handleSendClick}>{loading ? <Loader/> : 'Отправить'}</Button>
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