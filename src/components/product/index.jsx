import LoadingSpinner from "components/reuseable/Spinner";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "store/apiSlice";
import { renderCardImage } from "utils/tools";

import classes from "./product.module.css";
import { ProductInfo } from "./ProductInfo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [modal, setModal] = useState(false);

  console.log(product);
  const settings = {
    dot: false,
    speed: 500,
    infinite: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // arrows: false,
    autoplay: true,
  };

  const handleClose = () => setModal(false);
  const handleCarrousel = () => {
    if (product?.data?.product?.images?.length > 0) {
      setModal(true);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className={classes.page_container}>
        <div className={classes.page_top}>
          <div className="container">Product detail</div>
        </div>
        <div className="container">
          {product?.data?.product && (
            <div className={classes.product_detail_wrapper}>
              <div className={classes.left}>
                <div>
                  <img
                    src={renderCardImage(product?.data?.product?.images)}
                    alt=""
                    onClick={handleCarrousel}
                  />
                </div>
              </div>
              <div className={classes.right}>
                <ProductInfo details={product?.data?.product} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Slider {...settings}>
            {product?.data?.product &&
              product?.data?.product?.images?.map((item) => (
                <div key={item} style={{ margin: "0 auto" }}>
                  <div
                    className={classes.img_block}
                    style={{
                      background: `url(${item}) no-repeat`,
                    }}
                  >
                    {/* <img src={item} alt="" /> */}
                  </div>
                </div>
              ))}
          </Slider>
        </Modal.Body>
      </Modal>
    </div>
  );
};
