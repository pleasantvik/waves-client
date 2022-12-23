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
  return template;
};
