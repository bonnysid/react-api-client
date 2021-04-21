import React, {FC} from 'react'
import s from './Button.module.css'

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({type, ...props}) => {
    return (
        <button type={type} className={s.button} {...props} />
    )
}

export default Button