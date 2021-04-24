import React, {useState} from "react";
import s from './ConsolePage.module.css'
import Header from "../../components/Header/Header";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistory from "../RequestHistory/RequestHistory";
import QueryResponseBlock from "../QueryResponseBlock/QueryResponseBlock";

const ConsolePage = () => {
    const {login, sublogin} = useTypedSelector(state => state.auth)

    return <div className={s.container}>
        <Header login={login!} sublogin={sublogin}/>
        <RequestHistory/>
        <QueryResponseBlock/>
    </div>
}

export default ConsolePage