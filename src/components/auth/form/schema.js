import * as Yup from "yup";

// const phoneRegExp = /^([0]{1})[0-9]{10}$/

export const signin = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field cannot be empty")
    .email("The inputed email is invalid"),
  password: Yup.string()
    .trim()
    .required("The password field cannot be empty")
    .min(8, "Password should be minimum of 8 character"),
});
export const signup = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field cannot be empty")
    .email("The inputed email is invalid"),
  firstname: Yup.string()
    .trim()
    .required("The firstname field cannot be empty"),
  lastname: Yup.string().trim().required("The lastname field cannot be empty"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password should be minimum of 8 character"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("The confirm password field is required"),
});

export const profileUpdate = Yup.object({
  email: Yup.string()
    .trim()
    .required("The email field cannot be empty")
    .email("The inputed email is invalid"),
  firstname: Yup.string()
    .trim()
    .required("The firstname field cannot be empty"),
  lastname: Yup.string().trim().required("The lastname field cannot be empty"),
});

export const passwordUpdate = Yup.object({
  currentPassword: Yup.string()
    .trim()
    .required("Current password is required")
    .min(8, "Current password should be minimum of 8 character"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password should be minimum of 8 character"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("The confirm password field is required"),
});

export const productSchema = Yup.object({
  model: Yup.string()
    .trim()
    .required("Model name is required")
    .min(3, "Model name must be more than 3 character")
    .max(50, "Model name cannot be more than 50 character"),

  brand: Yup.string()
    .trim()
    .required("Fret name is required")
    .min(3, "Fret name must be more than 3 character")
    .max(50, "Fret name cannot be more than 50 character"),

  woodtype: Yup.string()
    .trim()
    .required("Woodtype name is required")
    .min(3, "Woodtype name must be more than 3 character")
    .max(50, "Woodtype name cannot be more than 50 character"),

  description: Yup.string()
    .trim()
    .required("description is required")
    .min(5, "description must be more than 5 character")
    .max(100, "description cannot be more than 100 character"),
  price: Yup.number()
    .required("price is required")
    .min(1, "price must be more than 5 character")
    .max(10000, "price name cannot be more than 100 character"),
  available: Yup.number().required("Do we have stock?"),
  frets: Yup.number()
    .required("Fret number is required")
    .oneOf([20, 21, 22, 23], "Only 20,21,22,23 is allowed"),
  shipping: Yup.boolean().required("Do we offer shipping for this product"),
});
/**
 *  model: "",
      brand: "",
      frets: "",
      woodtype: "",
      description: "",
      price: '',
      shipping: false,
      available:""
 */
