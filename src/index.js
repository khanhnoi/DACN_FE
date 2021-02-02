import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import App1 from './App1';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.min.css';
// import './App.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
// Scripts
// import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.min.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
