import React from 'react'
import Pizza from './Pizza'

export default function OrderForm(props) {
  const {
    values,
    submit,
    inputChange,
    checkboxChange,
    disabled,
    errors,
    order,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }



  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Build Your Own Pizza</h2>
        <button disabled={disabled}>submit</button>

        <div className='errors'>
          <div>{errors.username}</div>
          <div>{errors.size}</div>
          <div>{errors.toppings}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>

        {/* ////////// TEXT INPUTS ////////// */}
        <label>Username&nbsp;
          <input
            value={values.username}
            onChange={onInputChange}
            name='username'
            type='text'
          />
        </label>

        <label>Anything else we need to know?
          <input
            value={values.comments}
            onChange={onInputChange}
            name='comments'
            type='textarea'
          />
        </label>

        {/* ////////// DROPDOWN ////////// */}
        <label>Size
          <select
            onChange={onInputChange}
            value={values.size}
            name='size'
          >
            <option value=''>- Select an option -</option>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
        </label>

        {/* ////////// CHECKBOXES ////////// */}
        <label>Pepperoni
          <input
            type="checkbox"
            name='pepperoni'
            checked={values.toppings.pepperoni === true}
            onChange={onCheckboxChange}
          />
        </label>

        <label>Sausage
          <input
            type="checkbox"
            name='sausage'
            checked={values.toppings.sausage === true}
            onChange={onCheckboxChange}
          />
        </label>

        <label>Veggies
          <input
            type="checkbox"
            name='veggies'
            checked={values.toppings.veggies === true}
            onChange={onCheckboxChange}
          />
        </label>

        <label>Cheese
          <input
            type="checkbox"
            name='cheese'
            checked={values.toppings.cheese === true}
            onChange={onCheckboxChange}
          />
        </label>
        {
        order.map(za => {
          return (
            <Pizza key={za.id} details={za} />
          )
        })
      }
      </div>
    </form>
  )
}