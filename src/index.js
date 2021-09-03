import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import AboutPage from './components/AboutPage/AboutPage';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import MainPage from './components/MainPage/MainPage';
import Services from './components/Services/Services';
import SignupPage from './components/SignupPage/SignupPage';
import AdminUserPage from './components/AdminUserPage/AdminUserPage';
//import { Router, Route, Link, browserHistory } from 'react-router-dom';
//import {IndexRoute} from "react-router";

const routs = (
  <div> 
    <App/>
  </div>
);

ReactDOM.render(routs,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
