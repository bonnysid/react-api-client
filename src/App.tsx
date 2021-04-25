import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {store, persistor} from './store';
import LoginPage from './containers/LoginPage/LoginPage'
import ConsolePage from './containers/ConsolePage/ConsolePage';
import {QuerySendsay} from "./types/types";


const App = () => {
    const [value, setValue] = useState<QuerySendsay>({action: 'test'})
    const changeValue = () => setValue({action: 'wow'})
    return (
        <Router>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Route exact={true} path="/" render={() => <LoginPage/>}/>
                    <Route path="/console" render={() => <ConsolePage/>}/>
                </PersistGate>
            </Provider>
        </Router>
    );
}

export default App;
