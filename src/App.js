import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom"
import axios from "axios"
import * as yup from 'yup'
import schema from './schema'
import Pizza from './Pizza'
import Home from './Home'
import OrderForm from './OrderForm'

const initialOrders = [];
const initialDisabled = true;
const initialFormValues = {
  username: "",
  size: "",// dropdown
  toppings: { // checkbox
    pepperoni: false,
    sausage: false,
    veggies: false,
    cheese: false,
  },
  comments: "" // empty input
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
    axios.post('https://reqres.in/api/users', newOrder)
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

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      }
    })
  }

  const submit = () => {
    const newOrder = {
      username: formValues.username.trim(),
      size: formValues.size.trim(),
      toppings: Object.keys(formValues.toppings).filter(hb => formValues.toppings[hb]),
      comments: formValues.comments.trim(),
    }
    postNewOrder(newOrder)
  }

  // Side effect

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div>
      <h1>Lambda Eats</h1>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/pizza">Order</Link>
        </nav>
        <Switch>
          <Route path="/pizza">
              <OrderForm 
                values={formValues}
                inputChange={inputChange}
                checkboxChange={checkboxChange}
                submit={submit}
                disabled={disabled}
                errors={formErrors} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
