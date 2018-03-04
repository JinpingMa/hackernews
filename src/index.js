import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import App from './components/App/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if(module.hot) {
    module.hot.accept();
}