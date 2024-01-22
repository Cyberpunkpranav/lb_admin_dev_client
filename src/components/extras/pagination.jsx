import React from 'react'
import ReactPaginate from 'react-paginate'
const Pagination = ({total_count,max_count,pages_display,pges_range_display,Fetch}) => {
  return (
    <div className="container-fluid mt-2 d-flex align-items-center justify-content-center">
    <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"."}
          pageCount={total_count/10}
          marginPagesDisplayed={3}
          pageRangeDisplayed={2}
          onPageChange={Fetch}
          containerClassName={
            "pagination scroll align-self-center align-items-center"
          }
          pageClassName={"page-item text-charcoal"}
          pageLinkClassName={
            "page-link text-decoration-none text-charcoal border-charcoal rounded-1 mx-1"
          }
          previousClassName={"btn button-charcoal-outline me-2"}
          previousLinkClassName={"text-decoration-none text-charcoal"}
          nextClassName={"btn button-charcoal-outline ms-2"}
          nextLinkClassName={"text-decoration-none text-charcoal"}
          breakClassName={"d-flex mx-2 text-charcoal fw-bold fs-4"}
          breakLinkClassName={"text-decoration-none text-charcoal"}
          activeClassName={"active "}
        />

    </div>
  )
}

export default Pagination