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
