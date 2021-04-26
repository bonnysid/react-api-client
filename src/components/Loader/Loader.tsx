import React, {FC} from 'react'
import SvgIcon from "../SvgIcon/SvgIcon";
import s from './Loader.module.css'
import loader from '../../assets/icons/loader.gif'

const Loader: FC = () => {
    return <img className={s.loader} src={loader} alt="logo"/>
}

export default Loader