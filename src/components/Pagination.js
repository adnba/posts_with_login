import React from "react"
import PostsContext from "../utils/PostsContext"

function Pagination() {
  return (
    <PostsContext.Consumer>
      {data => (
        <nav>
          <ul className="pagination pagination-lg">
            <li
              onClick={
                data.currentPage === 1
                  ? null
                  : () => data.changePage(data.currentPage - 1)
              }
              className={
                data.currentPage === 1 ? "page-item disabled" : "page-item"
              }
            >
              <span className="page-link">Previous</span>
            </li>
            {new Array(data.numberPages > 5 ? 5 : data.numberPages)
              .fill()
              .map((item, index) => (
                <li
                  onClick={() => data.handleChangePage(index + 1)}
                  key={index}
                  className={
                    data.currentPage === index + 1
                      ? "page-item active"
                      : "page-item"
                  }
                >
                  <span className="page-link">{index + 1}</span>
                </li>
              ))}
            <li
              onClick={
                data.currentPage === data.numberPages
                  ? null
                  : () => data.changePage(data.currentPage + 1)
              }
              className={
                data.currentPage === data.numberPages
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      )}
    </PostsContext.Consumer>
  )
}

export default Pagination
