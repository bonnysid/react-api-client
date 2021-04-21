import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {authenticate} from '../../store/actions/auth';
// @ts-ignore
import s from './LoginPage.module.css';

function LoginPage() {
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [sublogin, setSubLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const loading = useSelector((state) => state.auth.loading);
    const isLoggedIn = useSelector((state) => !!state.auth.sessionKey?.length);
    console.log('loading', loading);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/console');
        }
    }, [isLoggedIn]);

    const doLogin = () => {
        dispatch(
            authenticate({
                login,
                sublogin,
                password,
            })
        );
    };

    const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        doLogin();
    }

    return (
        <div className={s.wrapper}>
            <img className={s.logoStyled} src="/icons/logo.svg" alt=""/>
            <form className={s.form} onSubmit={onSubmit}>
                <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин"/>
                <input value={sublogin} onChange={(e) => setSubLogin(e.target.value)} placeholder="Сублогин"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Сублогин"/>
                <button type="submit" onClick={onSubmit}>
                    Отправить
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
