import {createActions} from "redux-actions";
import {ActionTypes} from "../constants";

export const {request, requestSuccess, requestFailure, addQueryToHistory} = createActions({
    [ActionTypes.REQUEST]: (payload) => payload,
    [ActionTypes.REQUEST_SUCCESS]: (payload) => payload,
    [ActionTypes.REQUEST_FAILURE]: (payload) => payload,
    [ActionTypes.ADD_QUERY_HISTORY]: (payload) => payload,
})