import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';

import allReducers from './components/reducers';
import Rankings from './components/Rankings';
import DataVisualiztion from './components/DataVisualization';
import WorldMap from './components/WorldMap/components/country-profile/sample_profile';
import Test from './Test';
import Country from './components/Country';
import './global.css';
import './index.css';

var middleware = applyMiddleware(thunk, promiseMiddleware(), createLogger());
var store = createStore(allReducers, middleware)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Rankings}/>
                <Route exact path='/visualization' component={DataVisualiztion}/>
                <Route exact path='/test' component={Test}/>
                <Route exact path='/report' component={WorldMap}/>
                <Route exact path='/report/:iso3' component={Country}/>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
