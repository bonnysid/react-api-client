import {IConsolePayload, QuerySendsay} from "../../../types/types";
import api from "../../../helpers/sendsay";


export const requestSendsay = (payload: IConsolePayload) => {
    return api.sendsay.request(payload.query)
}