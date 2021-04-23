import {handleActions} from 'redux-actions';
import {IAuthData, Nullable} from "../../types/types";
import {ActionTypes} from '../constants';
import {createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    sessionKey: null as Nullable<string>,
    login: null as Nullable<string>,
    sublogin: null as Nullable<string>,
};

export type AuthState = typeof initialState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: state => {
            state.loading = true
        },
        authenticateSuccess: (state, action: PayloadAction<IAuthData>) => {
            state.loading = false
            state.login = action.payload.login
            state.sessionKey = action.payload.session
            state.sublogin = action.payload.sublogin
        },
        authenticateFailure: state => {
            state.sessionKey = null
            state.login = null
            state.sublogin = null
        },
        logout: state => {
            state.loading = false
            state.sessionKey = null
        }
    }
})

export default authSlice.reducer
export const {authenticate, logout, authenticateFailure, authenticateSuccess} = authSlice.actions
// {
//     auth: handleActions(
//         {
//             [ActionTypes.AUTHENTICATE]: (state) => {
//                 return {
//                     ...state,
//                     loading: true,
//                 };
//             },
//             [ActionTypes.AUTHENTICATE_SUCCESS]: (state, {payload}) => {
//                 return {
//                     ...state,
//                     loading: false,
//                     sessionKey: payload.sessionKey,
//                     login: payload.login,
//                     sublogin: payload.sublogin,
//                 };
//             },
//             [ActionTypes.AUTHENTICATE_FAILURE]: (state) => {
//                 return {
//                     ...state,
//                     sessionKey: null,
//                     login: null,
//                     sublogin: null,
//                 };
//             },
//             [ActionTypes.LOGOUT]: (state) => {
//                 return {
//                     ...state,
//                     loading: false,
//                     sessionKey: null,
//                 };
//             },
//         },
//         initialState
//     ),
// };
