import api from "../../../helpers/sendsay";
import {IAuthData, IAuthPayload} from "../../../types/types";

export const requestLogin = (payload: IAuthPayload): Promise<IAuthData> => {
    return api.sendsay
        .login({
            login: payload.login,
            sublogin: payload.sublogin,
            password: payload.password,
        })
}