import React, {useEffect, useState} from "react";
import s from './ConsolePage.module.css'
import Header from "../../components/Header/Header";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RequestHistory from "../RequestHistory/RequestHistory";
import QueryResponseBlock from "../QueryResponseBlock/QueryResponseBlock";
import {useActions} from "../../hooks/useActions";
import {Redirect} from "react-router-dom";
import {QuerySendsay} from "../../types/types";
import {FullScreen, useFullScreenHandle} from "react-full-screen";

const ConsolePage = () => {
    const fullscreenHandle = useFullScreenHandle()
    const [query, setQuery] = useState<QuerySendsay>({action: 'pong'})
    const {login, sublogin} = useTypedSelector(state => state.auth)
    const {authenticateCheck, authenticateFailure, clearResponse, request} = useActions()

    useEffect(() => {
        clearResponse()
        authenticateCheck()
    }, [])

    const execQuery = (value: QuerySendsay) => {
        clearResponse()
        setQuery(value)
        request({query: value})
    }

    if (!login) return <Redirect to={'/'}/>

    return (

        <FullScreen handle={fullscreenHandle} className={s.container} onChange={(state) => console.log(state)}>
            <Header
                fullscreenHandle={fullscreenHandle}
                login={login!}
                sublogin={sublogin}
                logout={authenticateFailure}
            />
            <RequestHistory execQuery={execQuery}/>
            <QueryResponseBlock query={query} setQuery={setQuery}/>
        </FullScreen>
    )
}

export default ConsolePage