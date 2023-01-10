import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cookie from "react-cookies";

export const WavesButton = (props) => {
  let template = "";

  //   switch (props.type) {
  //     case "default":
  //       return (template = <Link></Link>);
  //   }
  if (props.type === "default") {
    template = (
      <Link
        className={!props.altClass ? "link_default" : props.altClass}
        to={props.linkTo}
        style={{ ...props.style }}
      >
        {props.title}
      </Link>
    );
  }

  if (props.type === "bag_link") {
    template = (
      <div
        className="bag_link"
        onClick={() => props.runAction()}
        style={{
          ...props.style,
        }}
      >
        <AddShoppingCart
          style={{
            fontSize: props.iconSize,
          }}
        />
      </div>
    );
  }
  return template;
};

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const renderCardImage = (image) => {
  if (image.length > 0) {
    return image[0].url;
  } else {
    return "/images/image_not_available.png";
  }
};

export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;

    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      break;

    default:
      return false;
  }
};

export const errorHelper = (formik, value) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});

// COOKIES
export const getTokenCookie = () => cookie.load(`jwt`);

export const removeTokenCookie = () => cookie.remove("jwt", { path: "/" });

export const getAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${getTokenCookie()}` },
  };
};
