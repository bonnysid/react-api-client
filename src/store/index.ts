import {createStore, applyMiddleware, combineReducers, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../store/reducers/index';
import rootSaga from '../store/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, reducers.auth),
})

export type State = typeof rootReducer
export type RootState = ReturnType<State>

const bindMiddleware = (middleware: Middleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const configureStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );
    let persistor = persistStore(store);


    // @ts-ignore
    store.runSagaTask = () => {
        // @ts-ignore
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };

    // @ts-ignore
    store.runSagaTask();
    return {
        store,
        persistor,
    };
}

export default configureStore;
