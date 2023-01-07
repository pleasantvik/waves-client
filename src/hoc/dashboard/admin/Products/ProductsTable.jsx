import LoadingSpinner from "components/reuseable/Spinner";
import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import { selectPaginate } from "store/productSlice";
import classes from "./productsTable.module.css";

export const ProductsTable = ({
  prev,
  next,
  gotoEdit,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
}) => {
  const products = useSelector(selectPaginate);
  // console.log(products?.paginateProduct?.products);
  const goToNext = (page) => {
    next(page);
  };
  const goToPrev = (page) => {
    prev(page);
  };

  const handleEdit = (id) => {
    gotoEdit(id);
  };

  return (
    <div>
      {products?.paginateProduct?.products?.docs && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Created</th>
              <th>Model</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {products?.paginateProduct?.products?.docs.map((item) => (
              <tr key={item._id}>
                <td>
                  <Moment to={item.date} />
                </td>
                <td>{item.model}</td>
                <td>{item.available}</td>
                <td
                  className={`${classes.action_btn} ${classes.remove_btn}`}
                  onClick={() => handleModal(item._id)}
                >
                  Remove
                </td>
                <td
                  className={`${classes.action_btn} ${classes.edit_btn}`}
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination>
        {products?.paginateProduct?.products?.hasPrevPage && (
          <>
            <Pagination.Prev
              onClick={() =>
                goToPrev(products?.paginateProduct?.products?.prevPage)
              }
            />
            <Pagination.Item
              onClick={() =>
                goToPrev(products?.paginateProduct?.products?.prevPage)
              }
            >
              {products?.paginateProduct?.products.prevPage}
            </Pagination.Item>
          </>
        )}
        <Pagination.Item active>
          {products?.paginateProduct?.products.page}
        </Pagination.Item>
        {products?.paginateProduct?.products?.hasNextPage && (
          <>
            <Pagination.Item
              onClick={() =>
                goToNext(products?.paginateProduct?.products?.nextPage)
              }
            >
              {products?.paginateProduct?.products.nextPage}
            </Pagination.Item>
            <Pagination.Next
              onClick={() =>
                goToNext(products?.paginateProduct?.products?.nextPage)
              }
            />
          </>
        )}
      </Pagination>
      <br />
      <Link to="/dashboard/admin/add_products">
        <Button variant="secondary">Add Product</Button>
      </Link>

      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
          <Modal.Body>You cannot reverse this action</Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Oops, close this now!!
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            This will delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
