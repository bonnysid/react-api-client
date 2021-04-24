import {all, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../constants";

export default function* root() {
    yield all([
        takeLatest(ActionTypes.REQUEST, ()=>{})
    ])
}