import React, { Component } from "react"
import PostsTable from "./PostsTable"
import Spinner from "./Spinner"
import Pagination from "./Pagination"
import PostsContext from "../utils/PostsContext"

class Posts extends Component {
  static contextType = PostsContext

  render() {
    console.log("context of posts:", this.context)

    let output = <Spinner />
    if (this.context.posts) {
      output = (
        <>
          <PostsTable />
          <Pagination />
        </>
      )
    }

    return <div className="container">{output}</div>
  }
}
export default Posts
