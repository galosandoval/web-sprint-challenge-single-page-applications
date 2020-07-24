import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom"
import axios from "axios"
import * as yup from 'yup'
import schema from './schema'
import Pizza from './Pizza'
import Home from './Home'
import OrderForm from './OrderForm'
import styled from 'styled-components';



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
      <StyledHeader className="container">
        <h3>Lambda Eats</h3>
        <nav>
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/pizza">Order</Link>
        </nav>
      </StyledHeader>
      <Switch>
        <Route path="/pizza">
          <OrderForm
            values={formValues}
            inputChange={inputChange}
            checkboxChange={checkboxChange}
            submit={submit}
            disabled={disabled}
            errors={formErrors}
            order={order} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  nav {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }
  .links {
    text-decoration: none;
    justify-content: space-between;
    margin: 5%;
  }
`