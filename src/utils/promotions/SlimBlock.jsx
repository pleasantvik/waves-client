import { Slide } from "react-awesome-reveal";
import { WavesButton } from "utils/tools";
import classes from "./slimBlock.module.css";

export const SlimBlock = ({ items }) => {
  const renderPromotion = () => {
    return items ? (
      <div
        className={classes.slim__promotion__img}
        style={{
          background: `url(${items.img})`,
        }}
      >
        <Slide right>
          <div className={classes.slim__content}>
            <div className={`tag ${classes.title}`}>{items.title}</div>
            <div className={`tag ${classes.subtitle}`}>{items.subtitle}</div>
            <div>
              <WavesButton
                type="default"
                linkTo={items.linkTo}
                title={items.linkTitle}
                style={{
                  marginTop: "1rem",
                }}
              />
            </div>
          </div>
        </Slide>
      </div>
    ) : null;
  };
  return <div className="slim__promotion">{renderPromotion()}</div>;
};
