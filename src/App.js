import React, { useState } from "react";
import {Switch, Route, Router, Link} from "react-router-dom"
import axios from "axios"
import * as yup from 'yup'
import schema from './schema'

const initialOrders = [];
const initialDisabled = true;
const initialFormValues = {
  username: "",
  size: "",
  toppings: {
    pepperoni: false,
    sausage: false,
    veggies: false,
    cheese: false, 
  },
  specialInstructions: ""
}
const initialFormErrors = {
  username: "",
  size: "",
  toppings: "",
}

const App = () => {
  // Set states
  const [order, setOrder] = useState(initialOrders)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // Helper
  const postNewOrder = newOrder => {
    axios.post('http://localhost:4000/friends', newOrder)
      .then(res => {
        setOrder([res.data, ...order])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger
      })
  }

  // Form actions
  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  return (
    // <div>
    //   <h1>Lambda Eats</h1>
    //   <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/pizza">Order</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   <Switch>
    //       <Route path="/pizza">
    //         {/* <Pizza /> */}
    //       </Route>
    //       <Route path="/">
    //         {/* <Home /> */}
    //       </Route>
    //     </Switch>
      
    // </div>
    // </Router>
    // </div>
//   );
// };
null)
}

export default App;
