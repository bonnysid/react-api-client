import React, {FC} from 'react'
import s from './Input.module.css'
import {FieldInputProps, FieldMetaState} from "react-final-form";

export interface InputProps {
    input: FieldInputProps<any>
    meta: FieldMetaState<any>
    placeholder: string
    name: string
}

const Input: FC<InputProps> = ({name, placeholder, meta, input}) => {
    const hasError = meta.touched && meta.error;
    console.log(name)
    return (
        <>
            {hasError && <span className={'error-text'}>{meta.error}</span>}
            <label htmlFor={`input-${name}`}>{name}</label>
            <input id={`input-${name}`} className={s.input} {...input}/>
        </>
        
    )
}

export default Input