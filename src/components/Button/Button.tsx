import React, {FC} from 'react'
import s from './Button.module.css'

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({type, children, ...props}) => {
    return (
        <button type={type} className={s.button} {...props}>{children}</button>
    )
}

export default Button