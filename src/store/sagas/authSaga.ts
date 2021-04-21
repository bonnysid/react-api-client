import {all, call, takeLatest} from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import {ActionTypes} from '../constants';
import {handleLogout, handleRequestLogin} from "./handlers/auth";

export function* authenticateCheckSaga() {
    try {
        yield api.sendsay.request({
            action: 'pong',
        });
    } catch (error) {
        if (error.id === 'error/auth/failed') {
            yield call(handleLogout);
        }
    }
}



export default function* root() {
    yield all([
        takeLatest(ActionTypes.AUTHENTICATE, handleRequestLogin),
        takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
        takeLatest(ActionTypes.LOGOUT, handleLogout),
    ]);
}
