import React, {FC} from 'react'
import SvgIcon from "../SvgIcon/SvgIcon";
import s from './Loader.module.css'

const Loader: FC = () => {
    return <SvgIcon className={s.loader} urlId={'loader'}/>
}

export default Loader