import React, { Fragment } from "react";
import { Button, Pagination } from "react-bootstrap";

export const PaginationNav = ({ prod, prev, next, resetSearch }) => {
  const gotoPrev = (page) => {
    prev(page);
  };
  const gotoNext = (page) => {
    next(page);
  };
  return (
    <Fragment>
      {prod?.docs?.length > 0 && (
        <Pagination>
          {prod.hasPrevPage && (
            <>
              <Pagination.Prev onClick={() => gotoPrev(prod.prevPage)} />
              <Pagination.Item>{prod.prevPage}</Pagination.Item>
            </>
          )}
          <Pagination.Item active>{prod.page}</Pagination.Item>
          {prod.hasNextPage && (
            <>
              <Pagination.Item onClick={() => gotoNext(prod.nextPage)}>
                {prod.nextPage}
              </Pagination.Item>
              <Pagination.Next onClick={() => gotoNext(prod.nextPage)} />
            </>
          )}
        </Pagination>
      )}
      {prod.docs.length < 0 && (
        <div>
          <p>sorry nothing was found</p>
          <Button className="mt-3" variant="primary" onClick={resetSearch}>
            Reset Search
          </Button>
        </div>
      )}
    </Fragment>
  );
};
