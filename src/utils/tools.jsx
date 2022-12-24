import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

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

export const renderCardImage = (image) => {
  if (image.length > 0) {
    return image[0];
  } else {
    return "/images/image_not_available.png";
  }
};
