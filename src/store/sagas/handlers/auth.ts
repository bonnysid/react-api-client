import {ActionTypes} from "../../constants";
import {IAuthData, IAuthPayload} from "../../../types/types";
import {call, put} from "redux-saga/effects";
import {requestLogin} from "../requests/auth";
import api from "../../../helpers/sendsay";
import {authActions} from "../../reducers/auth";

const {authenticateSuccess, authenticateFailure, logout} = authActions

export function* handleRequestLogin(action: {type: ActionTypes.AUTHENTICATE, payload: IAuthPayload }): Generator<IAuthData | any, any, unknown> {
    try {
        yield call(requestLogin, action.payload)
        document.cookie = `sendsay_session=${api.sendsay.session}`;
        yield put(
            authenticateSuccess({
                session: api.sendsay.session,
                login: action.payload.login,
                sublogin: action.payload.sublogin,
            })
        );
    } catch (err: any) {
        document.cookie = '';
        console.log('err', err);
    }
}

export function* handleLogout() {
    yield put(authenticateFailure());
    document.cookie = '';
}