import {all, fork} from 'redux-saga/effects';

import login from './authSaga';

export default function* root() {
  yield all([fork(login)]);
}
