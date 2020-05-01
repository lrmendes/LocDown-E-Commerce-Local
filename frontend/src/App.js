import React from 'react';
import Home from './pages/user/Home/Home';
import Configs from './pages/user/configs/Configs';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VendorList from './pages/user/vendors/VendorsList';
import VendorProducts from './pages/user/products/VendorProducts';
import Products from './pages/user/products/Products';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';

import VProducts from './pages/vendor/products/VProducts';
import VHome from './pages/vendor/home/VHome';
import VConfigs from './pages/vendor/configs/VConfigs';

function App() {

  return (
        <Router>
          <Switch>
          
              <Route path="/configs" exact component={ () => <Configs /> }></Route>
              <Route path="/categorias/:id" exact component={() => <VendorList /> }></Route>
              <Route path="/empresa/:id" exact component={() => <VendorProducts /> }></Route>
              <Route path="/produto/:id" exact component={() => <Products /> }></Route>
              <Route path="/home" exact component={() => <Home /> }></Route>

              <Route path="/register" exact component={() => <Register /> }></Route>
              <Route path="/logout" exact component={() => <Logout /> }></Route>

              <Route path="/vendor/home" exact component={ () => <VHome/> }></Route>
              <Route path="/vendor/configs" exact component={ () => <VConfigs/> }></Route>
              <Route path="/vendor/products" exact component={ () => <VProducts/> }></Route>
              
              <Route path="/login" exact component={() => <Login /> }></Route>
              <Route path="/" component={() => <Login /> }></Route>
          </Switch>
        </Router>
  
  )
}

export default App