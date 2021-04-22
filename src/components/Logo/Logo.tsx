import React, {FC} from "react";
import logo from '../../assets/icons/logo.svg'

const Logo: FC<any> = (props) => (
    <img {...props} src={logo} alt="logo"/>
)

export default Logo