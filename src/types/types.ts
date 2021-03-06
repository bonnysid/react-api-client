export type Nullable<T> = T | null

export interface IAuthData {
    login: string
    session: string
    sublogin: string
}

export interface IDropdownStyles {
    left: number
    top: number
    width: number
}

export type Validator = (value: string) => undefined | string

export interface IAuthPayload {
    login: string
    password: string
    sublogin: string
}

export interface IConsolePayload {
    query: QuerySendsay
}

export interface IHistoryItem {
    id: number
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