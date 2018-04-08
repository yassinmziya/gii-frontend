import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './Test';
import Ranking from './components/Ranking';
import registerServiceWorker from './registerServiceWorker';
import './global.css';

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
