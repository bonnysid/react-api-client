import React, {useEffect, useState} from "react";
import s from './ConsolePage.module.css'
import Header from "../../components/Header/Header";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistory from "../RequestHistory/RequestHistory";
import QueryResponseBlock from "../QueryResponseBlock/QueryResponseBlock";
import {useActions} from "../../hooks/useActions";
import { Redirect } from "react-router-dom";

const ConsolePage = () => {
    const {login, sublogin} = useTypedSelector(state => state.auth)
    const {authenticateCheck} = useActions()

    useEffect(() => {
        authenticateCheck()
    },[])

    if(!login) return <Redirect to={'/'}/>

    return <div className={s.container}>
        <Header login={login!} sublogin={sublogin}/>
        <RequestHistory/>
        <QueryResponseBlock/>
    </div>
}

export default ConsolePage