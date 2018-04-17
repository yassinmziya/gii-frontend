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
import TestBarChart from './TestBarChart';
import WorldMap from './components/WorldMap/App';
import Test from './Test';
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
                <Route exact parhr='/reports' component={WorldMap}/>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
