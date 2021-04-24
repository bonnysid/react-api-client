import {all, fork} from 'redux-saga/effects';

import login from './authSaga';
import request from './consoleSaga'

export default function* root() {
  yield all([fork(login), fork(request)]);
}
