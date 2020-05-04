import React from 'react';
import Home from './pages/user/Home/Home';
import Profile from './pages/user/profile/Profile';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VendorList from './pages/user/vendors/VendorsList';
import VendorProducts from './pages/user/products/VendorProducts';
import Products from './pages/user/products/Products';
import Orders from './pages/user/orders/Orders';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';

//import VHome from './pages/vendor/home/VHome';
import VProducts from './pages/vendor/products/VProducts';
import VProductView from './pages/vendor/products/VProductView';
import VSales from './pages/vendor/sales/VSales';
import VProfile from './pages/vendor/profile/VProfile';

function App() {

  return (
        <Router>
          <Switch>
          
              <Route path="/profile" exact component={ () => <Profile /> }></Route>
              <Route path="/categorias/:id" exact component={() => <VendorList /> }></Route>
              <Route path="/empresa/:vendorId/:vendorName" exact component={() => <VendorProducts /> }></Route>
              <Route path="/produto/:id" exact component={() => <Products /> }></Route>
              <Route path="/orders" exact component={() => <Orders /> }></Route>
              <Route path="/home" exact component={() => <Home /> }></Route>

              <Route path="/register" exact component={() => <Register /> }></Route>
              <Route path="/logout" exact component={() => <Logout /> }></Route>

              <Route path="/vendor/home" exact component={ () => <VProducts/> }></Route>
              <Route path="/vendor/products" exact component={ () => <VProducts/> }></Route>
              <Route path="/vendor/sales" exact component={ () => <VSales /> }></Route>
              <Route path="/vendor/profile" exact component={ () => <VProfile/> }></Route>
              <Route path="/vendor/produto/:id" exact component={() => <VProductView /> }></Route>
              
              <Route path="/login" exact component={() => <Login /> }></Route>
              <Route path="/" component={() => <Login /> }></Route>
          </Switch>
        </Router>
  
  )
}

export default App