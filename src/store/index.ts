import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from '../store/reducers/auth';
import AuthSaga from '../store/sagas/index'

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, AuthReducer),
})

export type State = typeof rootReducer
export type RootState = ReturnType<State>

export const configureAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const middleware = [
        ...getDefaultMiddleware({ thunk: false }),
        ...middlewares,
    ];

    const store = configureStore({
        reducer: rootReducer,
        middleware: middleware,
    });

    sagaMiddleware.run(AuthSaga);

    return store;
};

export const store = configureAppStore()

export const persistor = persistStore(store);


