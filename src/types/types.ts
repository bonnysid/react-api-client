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

export interface ISendsayQuery {
    id: string | number
    action: string
    content: string
    isSuccess: boolean
}

export type ResponseData = {
    data: any
}
