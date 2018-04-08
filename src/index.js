import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Ranking from './components/Ranking';
import registerServiceWorker from './registerServiceWorker';
import './global.css';

ReactDOM.render(<Ranking />, document.getElementById('root'));
registerServiceWorker();
