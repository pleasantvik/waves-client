import { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
export const PicViewer = ({ formik, deletePic }) => {
  const [idToDelete, setIdToDelete] = useState(null);
  const [removeModal, setRemoveModal] = useState(false);

  const handleClose = () => setRemoveModal(false);
  const handleShow = (id) => {
    setRemoveModal(true);
    setIdToDelete(id);
    console.log(id);
  };
  const handleRemove = () => {
    deletePic(idToDelete);
    setIdToDelete(null);
    handleClose();
  };
  return (
    <Fragment>
      {formik.values &&
        formik.values.images &&
        formik.values.images.map((item) => (
          <div
            key={item.public_id}
            className="pic_block"
            onClick={() => handleShow(item.public_id)}
            style={{
              background: `url(${item.url})`,
              margin: "0 1rem",
            }}
          ></div>
        ))}

      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
          <Modal.Body>Are you sure you want to delete the image</Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Oops, close this now!!
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
