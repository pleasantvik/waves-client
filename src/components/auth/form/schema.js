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
