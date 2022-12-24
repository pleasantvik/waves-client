import classes from "./spinner.module.css";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      className={classes.spinner}
    ></div>
  );
};

export default LoadingSpinner;
