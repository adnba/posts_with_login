import React, { Component } from "react"
import PostsTable from "./PostsTable"
import Spinner from "./Spinner"
import Pagination from "./Pagination"

class Posts extends Component {
  render() {
    console.log("props of posts:", this.props)

    let output = <Spinner />
    if (this.props.posts) {
      output = (
        <>
          <PostsTable
            handleConfirmDelete={this.props.handleConfirmDelete}
            posts={this.props.posts}
          />
          <Pagination
            changePage={this.props.handleChangePage}
            currentPage={this.props.currentPage}
            numberPages={this.props.numberPages}
          />
        </>
      )
    }

    return <div className="container">{output}</div>
  }
}
export default Posts
