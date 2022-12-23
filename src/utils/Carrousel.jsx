import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./carrousel.module.css";
import { WavesButton } from "./tools";

export const Carrousel = ({ items }) => {
  const settings = {
    dot: false,
    speed: 500,
    infinite: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // arrows: false,
    autoplay: true,
  };

  const generateSlides = () => {
    return items.map((item, i) => (
      <div key={i} className={classes.carrousel__slide}>
        <div
          className={classes.carrousel__image}
          style={{
            background: `url(${item.img})`,
            height: `${window.innerHeight}px`,
          }}
        ></div>
        <div className={classes.carrousel__actions}>
          <h3 className={`tag`}>{item.title}</h3>
          <h4 className={`tag`}>{item.subtitle}</h4>
          <div>
            <WavesButton
              type="default"
              linkTo={item.linkTo}
              title={item.linkTitle}
            />
          </div>
        </div>
        b
      </div>
    ));
  };
  return (
    <div
      className={classes.carrousel__wrapper}
      style={{
        height: `${window.innerHeight}px`,
      }}
    >
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};
