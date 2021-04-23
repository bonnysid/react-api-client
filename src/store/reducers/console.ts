import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {ISendsayQuery, ResponseData} from "../../types/types";

export const initialState = {
    loading: false,
    history: {
        size: 15,
        items: [{action: 'sys.get', content: '{"action" : "sys.get"}', id: Date.now(), isSuccess: true}] as ISendsayQuery[]
    },
    response: null as any
}

export type ConsoleState = typeof initialState

const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        addQueryToHistory: (state: Draft<ConsoleState>, action: PayloadAction<ISendsayQuery>) => {
            state.history.items.push(action.payload)
        },
        request: (state: Draft<ConsoleState>) => {
            state.loading = true
        },
        requestSuccess: (state: Draft<ConsoleState>, action: PayloadAction<ResponseData>) => {
            state.loading = false
            state.response = action.payload.data
        },
        requestFailure: (state: Draft<ConsoleState>, action: PayloadAction<ResponseData>) => {
            state.loading = false
            state.response = action.payload.data
        }
    }
})

export default consoleSlice.reducer
export const {addQueryToHistory, request, requestFailure, requestSuccess} = consoleSlice.actions