export type Nullable<T> = T | null

export interface IAuthData {
    login: string
    session: string
    sublogin: string
}

export interface IAuthPayload {
    login: string
    password: string
    sublogin: string
}

export interface IConsolePayload {
    query: QuerySendsay
}

export interface IHistoryItem {
    id: string | number
    action: string
    content: QuerySendsay
    isSuccess: boolean
}

export type ResponseData = {
    data: any
}

export type QuerySendsay = {
    action: string
    [key:string]: any
}