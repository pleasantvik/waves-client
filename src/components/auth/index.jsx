import { useState } from "react";
import classes from "./auth.module.css";
import { Signin } from "./form/Signin";
import { Signup } from "./form/Signup";

export const RegisterLogin = (props) => {
  const [formCreateAccount, setFormCreateAccount] = useState(false);

  const toggleFormType = () => {
    setFormCreateAccount((prev) => !prev);
  };

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className={classes.register_login_container}>
          <div className={classes.left}>
            {formCreateAccount && (
              <div className={classes.left_content}>
                <h1>New Customer</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam soluta debitis expedita enim labore molestias in
                  cupiditate aspernatur id inventore!
                </p>
              </div>
            )}

            {!formCreateAccount && (
              <div className={classes.left_content}>
                <h1>Welcome back</h1>
                <p>
                  Already have an account? <br /> Fill the form with your email
                  and password to log into your account
                </p>
              </div>
            )}
            <button
              // variant="contained"
              // color="default"
              className="btn_reuseable"
              onClick={() => toggleFormType()}
            >
              {!formCreateAccount && "Welcome"}
              {formCreateAccount && "Need to register"}
            </button>
          </div>
          <div className={classes.right}>
            <h2>
              {!formCreateAccount && "Sign in"}
              {formCreateAccount && "Create an Account"}
            </h2>
            <div>
              {!formCreateAccount && <Signin {...props} />}
              {formCreateAccount && <Signup {...props} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
