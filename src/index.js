import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cart from './mainComponents/Cart';
const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));