import React, {FC} from "react";
import Logo from "../Logo/Logo";
import s from './Header.module.css'
import SvgIcon from "../SvgIcon/SvgIcon";
import {Nullable} from "../../types/types";

interface HeaderProps {
    login: string,
    sublogin?: Nullable<string>
}

const Header: FC<HeaderProps> = ({login, sublogin}) => {
    return (
        <header className={s.header}>
            <div className={s.block}>
                <Logo className={s.logo}/>
                <h2 className={s.title}>API-консолька</h2>
            </div>
            <div className={s.block}>
                <div className={s.loginInfo}>
                    <span>{login}</span>
                    {sublogin && <span> : {sublogin}</span>}
                </div>
                <button className={s.logoutBtn}>
                    <span>Выйти</span>
                    <SvgIcon width={'24px'} height={'24px'} fillColor={'#0D0D0D'} urlId={'logout'}/>
                </button>
                <SvgIcon width={'18px'} height={'18px'} fillColor={'#0D0D0D'} urlId={'full-screen'}/>
            </div>
        </header>
    )
}

export default Header