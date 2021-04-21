import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
// @ts-ignore
import s from './LoginPage.module.css';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

function LoginPage() {
    const [login, setLogin] = useState('');
    const [sublogin, setSubLogin] = useState('');
    const [password, setPassword] = useState('');
    const {authenticate} = useActions()
    const history = useHistory();
    const loading = useTypedSelector((state) => state.auth.loading);
    const isLoggedIn = useTypedSelector((state) => !!state.auth.sessionKey?.length);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/console');
        }
    }, [isLoggedIn]);

    const doLogin = () => {
        authenticate({
            login,
            sublogin,
            password,
        })
    };

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        doLogin();
    }

    return (
        <div className={s.wrapper}>
            <img className={s.logoStyled} src="/icons/logo.svg" alt=""/>
            <section className={s.form} onSubmit={onSubmit}>
                <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин"/>
                <input value={sublogin} onChange={(e) => setSubLogin(e.target.value)} placeholder="Сублогин"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
                <button type="submit" onClick={onSubmit}>
                    Отправить
                </button>
            </section>
        </div>
    );
}

export default LoginPage;
