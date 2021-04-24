
export enum ActionTypes {
    AUTHENTICATE = 'auth/authenticate',
    AUTHENTICATE_CHECK = 'auth/authenticateCheck',
    AUTHENTICATE_SUCCESS = 'auth/authenticateSuccess',
    AUTHENTICATE_FAILURE = 'auth/authenticateFailure',
    LOGOUT = 'auth/logout',
    LOGOUT_SUCCESS = 'auth/logoutSuccess',
    LOGOUT_FAILURE = 'auth/logoutFailure',
    REQUEST = 'console/request',
    REQUEST_SUCCESS = 'console/requestSuccess',
    REQUEST_FAILURE = 'console/requestFailure',
    ADD_QUERY_HISTORY = 'console/addQueryToHistory',
    REMOVE_QUERY_HISTORY = 'console/removeQueryFromHistory',
    CLEAR_ALL_QUERIES = 'console/clearAllQueries',
}

