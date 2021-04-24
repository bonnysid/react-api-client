import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {IHistoryItem, QuerySendsay, ResponseData} from "../../types/types";

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
        clearAllQueries: (state:Draft<ConsoleState>) => {
            state.history.items = []
        },
        removeQueryFromHistory: (state: Draft<ConsoleState>, action: PayloadAction<{id: number}>) => {
            state.history.items = state.history.items.filter(item => item.id !== action.payload.id)
        },
        request: (state: Draft<ConsoleState>, payload:PayloadAction<{query: QuerySendsay}>) => {
            state.loading = true
        },
        clearResponse: (state: Draft<ConsoleState>) => {
          state.response = null
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
export const consoleActions = consoleSlice.actions