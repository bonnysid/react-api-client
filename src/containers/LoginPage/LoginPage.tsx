import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import s from './LoginPage.module.css';
import {Form, Field} from "react-final-form";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IAuthPayload} from "../../types/types";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function LoginPage() {
    const {authenticate} = useActions()
    const history = useHistory();
    const loading = useTypedSelector((state) => state.auth.loading);
    const isLoggedIn = useTypedSelector((state) => !!state.auth.sessionKey?.length);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/console');
        }
    }, [isLoggedIn]);

    const onSubmit = ({login, sublogin, password}: IAuthPayload) => {
        authenticate({
            login,
            sublogin,
            password,
        })
    }

    return (
        <div className={s.wrapper}>
            <img className={s.logoStyled} src="/icons/logo.svg" alt=""/>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <form className={s.form} onSubmit={handleSubmit}>
                        <Field name={'login'} type={'text'} render={(props) => <Input name={'Логин'} placeholder={'Логин'} {...props}/>}/>
                        <Field name={'sublogin'} type={'text'} render={(props) => <Input name={'Сублогин'} placeholder={'Сублогин'} {...props}/>}/>
                        <Field name={'password'} type={'password'}  render={(props) => <Input name={'Пароль'} placeholder={'Пароль'} {...props}/>}/>
                        <Button type="submit">
                            Отправить
                        </Button>
                    </form>
                )}/>

        </div>
    );
}

export default LoginPage;
