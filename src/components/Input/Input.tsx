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
    return (
        <div className={s.container}>
            <label className={`${s.label} ${hasError ? 'error-text' : ''}`} htmlFor={`input-${name}`}>{name}</label>
            <input id={`input-${name}`} className={`${s.input} ${hasError ? 'error-field' : ''}`} {...input}/>
        </div>
        
    )
}

export default Input