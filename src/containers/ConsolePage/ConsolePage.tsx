import React from "react";
import s from './ConsolePage.module.css'
import Header from "../../components/Header/Header";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const ConsolePage = () => {
    const {login, sublogin} = useTypedSelector(state => state.auth)

    return <div>
        <Header login={login!} sublogin={sublogin}/>
    </div>
}

export default ConsolePage