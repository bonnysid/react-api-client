import {all, put, call, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import {ActionTypes} from '../constants';
import {authenticateSuccess, authenticateFailure} from '../reducers/auth';
import {requestLogin} from "./requests/auth";
import {IAuthData, IAuthPayload} from "../../types/types";

export function* authenticateCheckSaga() {
    try {
        yield api.sendsay.request({
            action: 'pong',
        });
    } catch (error) {
        if (error.id === 'error/auth/failed') {
            yield call(logoutSaga);
        }
    }
}

export function* authenticateSaga(action: {type: ActionTypes.AUTHENTICATE, payload: IAuthPayload }): Generator<IAuthData | any, any, unknown> {
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

export function* logoutSaga() {
    yield put(authenticateFailure());
    document.cookie = '';
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
        takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
        takeLatest(ActionTypes.LOGOUT, logoutSaga),
    ]);
}
