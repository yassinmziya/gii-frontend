import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestBarChart from './TestBarChart';
import registerServiceWorker from './registerServiceWorker';
import './global.css';

ReactDOM.render(<TestBarChart />, document.getElementById('root'));
registerServiceWorker();
