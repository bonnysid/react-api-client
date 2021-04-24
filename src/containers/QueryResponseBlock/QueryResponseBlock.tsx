import React, {FC, useState} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react'
import s from './QueryResponseBlock.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";

export interface QueryResponseBlockProps {

}

const QueryResponseBlock: FC<QueryResponseBlockProps> = () => {
    const [value, setValue] = useState<Object>({})
    const {response} = useTypedSelector(state => state.console)
    const onChange = (value: Object) => {
        setValue(value)
    }
    return (
        <main className={s.container}>
            <div className={s.item}>
                <span className={s.title}>Запрос:</span>
                <Editor
                    mode={'code'}
                    value={value}
                    onChange={onChange}
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
    )
}

export default QueryResponseBlock