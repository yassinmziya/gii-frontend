import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './Test';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
