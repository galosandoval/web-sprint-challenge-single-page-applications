import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters")
    .required("Username is Required"),
  size: yup
    .string()
    .oneOf(['small', 'medium', 'large'], "Please choose a size"),
  toppings: yup
    .string()
    .oneOf(['tl', 'instructor', 'alumni', 'student'], "Role is required")
})

export default schema