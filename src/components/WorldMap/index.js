import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Route from 'react-router-dom/Route';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Sample from './components/country-profile/sample_profile.js';
import Router from 'react-router-dom/BrowserRouter';
import My_sidebar from './My_sidebar.js';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
