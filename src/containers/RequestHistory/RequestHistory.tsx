import React, {FC} from "react";
import s from './RequestHistory.module.css'
import SvgIcon from "../../components/SvgIcon/SvgIcon";

const RequestHistory: FC = () => {
    return (
        <div className={s.container}>
            <div className={s.items}>

            </div>
            <button className={s.deleteBtn}><SvgIcon width={'24px'} height={'24px'} fillColor={'#0D0D0D'} urlId={'cross'}/></button>
        </div>
    )
}

export default RequestHistory