import {call, put} from "redux-saga/effects";
import {requestSendsay} from "../requests/console";
import {ActionTypes} from "../../constants";
import {IConsolePayload} from "../../../types/types";
import { consoleActions } from "../../reducers/console";

const {addQueryToHistory, requestSuccess, requestFailure} = consoleActions

export function* handleSendsayRequest(action: {type: ActionTypes.REQUEST, payload: IConsolePayload}): Generator<any, any, unknown> {
    let data: any;
    try {
        data = yield call(requestSendsay, action.payload)
        yield put(addQueryToHistory({
            action: action.payload.query.action,
            content: action.payload.query,
            id: Date.now(),
            isSuccess: true
        }))
        yield put(requestSuccess(data))
    } catch (e) {
        yield put(addQueryToHistory({
            action: action.payload.query.action,
            content: action.payload.query,
            id: Date.now(),
            isSuccess: false
        }))
        yield put(requestFailure(data))
    }

}