import React from "react";
import {Switch, Route, Router, Link} from "react-router-dom"

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pizza">Order</Link>
            </li>
          </ul>
        </nav>
      <Switch>
          <Route path="/pizza">
            <Pizza />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      
    </div>
    </Router>
    </div>
  );
};
export default App;
