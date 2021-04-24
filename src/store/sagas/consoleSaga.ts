import {all, takeLatest} from "redux-saga/effects";
import {ActionTypes} from "../constants";
import {handleSendsayRequest} from "./handlers/console";

export default function* root() {
    yield all([
        takeLatest(ActionTypes.REQUEST, handleSendsayRequest)
    ])
}