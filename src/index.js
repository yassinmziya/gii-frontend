import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestBarChart from './TestBarChart';
import Test from './Test';
import registerServiceWorker from './registerServiceWorker';
import './global.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import allReducers from './components/reducers'

var middleware = applyMiddleware(thunk, promiseMiddleware(), createLogger());
var store = createStore(allReducers, middleware)

ReactDOM.render(
    <Provider store={store}>
        <Test />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
