import React from "react";
import Logo from "../Logo/Logo";
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.block}>
                <Logo className={s.logo}/>
                <h2 className={s.title}>API-консолька</h2>
            </div>
            <div className={s.block}>
                <Logo />
                <h2 className={s.title}>API-консолька</h2>
            </div>
        </header>
    )
}

export default Header