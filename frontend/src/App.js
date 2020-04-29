import React from 'react';
import Home from './pages/user/Home/Home';
import Configs from './pages/user/configs/Configs';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VendorList from './pages/user/vendors/VendorsList';
import VendorProducts from './pages/user/products/VendorProducts';

function App() {

  return (
        <Router>
          <Switch>
              <Route path="/configs" exact component={ () => <Configs /> }></Route>
              <Route path="/categorias/:id" exact component={() => <VendorList /> }></Route>
              <Route path="/empresa/:id" exact component={() => <VendorProducts /> }></Route>
              <Route path="/home" exact component={() => <Home /> }></Route>
              <Route path="/" component={() => <Home /> }></Route>
          </Switch>
        </Router>
  
  )
}

export default App