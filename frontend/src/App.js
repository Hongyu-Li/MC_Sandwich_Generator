import React from 'react';
import { Switch, Router, Route } from "react-router-dom"
import Home from './Home/Home.js';
import history from "./utils/history"
import Genertor from './Generator/Generator.js';

const App = () =>{
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/generate' component={Genertor}></Route>
        <Route exact path='/' component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App;
