import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {IHistoryItem, ResponseData} from "../../types/types";

export const initialState = {
    loading: false,
    history: {
        size: 15,
        items: [{action: 'sys.get', content: {action: 'sys.get'}, id: Date.now(), isSuccess: true}] as IHistoryItem[]
    },
    response: null as any
}

export type ConsoleState = typeof initialState

const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        addQueryToHistory: (state: Draft<ConsoleState>, action: PayloadAction<IHistoryItem>) => {
            state.history.items.push(action.payload)
        },
        removeQueryFromHistory: (state: Draft<ConsoleState>, action: PayloadAction<{id: number}>) => {
            state.history.items = state.history.items.filter(item => item.id !== action.payload.id)
        },
        request: (state: Draft<ConsoleState>) => {
            state.loading = true
        },
        requestSuccess: (state: Draft<ConsoleState>, action: PayloadAction<ResponseData>) => {
            console.log(action)
            state.loading = false
            state.response = action.payload
        },
        requestFailure: (state: Draft<ConsoleState>, action: PayloadAction<ResponseData>) => {
            console.log(action)
            state.loading = false
            state.response = action.payload.data
        }
    }
})

export default consoleSlice.reducer
export const {addQueryToHistory, request, requestFailure, requestSuccess, removeQueryFromHistory} = consoleSlice.actions