import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import s from './LoginPage.module.css';
import {Form, Field} from "react-final-form";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IAuthPayload} from "../../types/types";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import {composeValidators, symbolsMustBeWithoutRus, required} from "../../helpers/validators";
import Loader from "../../components/Loader/Loader";

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
            <Logo className={s.logo}/>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <form className={s.form} onSubmit={handleSubmit}>
                        <h2 className={s.title}>API-консолька</h2>
                        <Field
                            name={'login'}
                            type={'text'}
                            render={(props) => <Input name={'Логин'} placeholder={'Логин'} {...props}/>}
                            validate={required}
                        />
                        <Field
                            name={'sublogin'}
                            type={'text'}
                            render={(props) => <Input name={'Сублогин'} placeholder={'Сублогин'} {...props}/>}
                        />
                        <Field
                            name={'password'}
                            type={'password'}
                            render={(props) => <Input name={'Пароль'} placeholder={'Пароль'} {...props}/>}
                            validate={composeValidators(required, symbolsMustBeWithoutRus)}
                        />
                        <Button type="submit">
                            {loading ? <Loader/> : 'Отправить'}
                        </Button>
                    </form>
                )}/>

        </div>
    );
}

export default LoginPage;
