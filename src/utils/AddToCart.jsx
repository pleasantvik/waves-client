import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AddToCart = ({ modal, handleClose, errorType }) => {
  return (
    <div>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sorry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === "not verified" && (
            <div>Please verify your account</div>
          )}
          {errorType === "no user" && <div>Please login into your account</div>}
        </Modal.Body>
        <Modal.Footer>
          {errorType === "no user" && (
            <Link to="/signin">
              <Button variant="primary">Please sign into your account</Button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
