import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {store, persistor} from './store';
import LoginPage from './containers/LoginPage/LoginPage'


const App = () => {
    return (
        <Router>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Switch>
                        <Route path="/">
                            <LoginPage/>
                        </Route>
                    </Switch>
                </PersistGate>
            </Provider>
        </Router>
    );
}

export default App;
