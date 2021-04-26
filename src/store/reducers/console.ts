import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {IHistoryItem, QuerySendsay, ResponseData} from "../../types/types";

export const initialState = {
    loading: false,
    responseError: false,
    history: {
        size: 20,
        items: [
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 1, isSuccess: true},
            {action: 'sys.put', content: {action: 'sys.get'}, id: Date.now() + 2, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 3, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 4, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 5, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 6, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 7, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 8, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 9, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 10, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 11, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 12, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 13, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 14, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 15, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 16, isSuccess: true},
            {action: 'sys.get', content: {action: 'sys.get'}, id: Date.now() + 17, isSuccess: true},
            ] as IHistoryItem[]
    },
    response: null as any
}

export type ConsoleState = typeof initialState

const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        addQueryToHistory: (state: Draft<ConsoleState>, action: PayloadAction<IHistoryItem>) => {
            const equalObj = state.history.items.find(item => {
                const itemForEqual = {...item, id: 0}
                const newItemForEqual = {...action.payload, id: 0}
                return JSON.stringify(itemForEqual) === JSON.stringify(newItemForEqual)
            })
            if(equalObj){
                state.history.items = state.history.items.filter(item => item.id !== equalObj.id)
            }
            if(state.history.items.length === state.history.size) state.history.items.splice(state.history.size-1, 1)
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
            state.loading = false
            state.responseError = false
            state.response = action.payload
        },
        requestFailure: (state: Draft<ConsoleState>, action: PayloadAction<ResponseData>) => {
            state.loading = false
            state.responseError = true
            state.response = action.payload
        },
        resetError: (state: Draft<ConsoleState>) => {
            state.responseError = false
        }
    }
})

export default consoleSlice.reducer
export const consoleActions = consoleSlice.actions