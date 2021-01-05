import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import PostsContext from "../utils/PostsContext"

class PostsTable extends Component {
  state = {
    show: false,
    toBeDeletedPostId: null,
  }

  static contextType = PostsContext

  handleClose = () => {
    this.setState({ show: false, toBeDeletedPostId: null })
  }

  handleDelete = postId => {
    this.setState({ show: true, toBeDeletedPostId: postId })
  }

  render() {
    console.log("context", this.context)
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th colSpan="3"></th>
            </tr>
          </thead>
          <tbody>
            {this.context.posts.map(post => (
              <tr key={post.id}>
                <th>{post.id}</th>
                <td>{post.title}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={"/posts/" + post.id}
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn btn-success  mr-2"
                    to={"/posts/" + post.id + "/update"}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(post.id)}
                    className="btn btn-danger  mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete it ?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                this.context.handleConfirmDelete(
                  this.state.toBeDeletedPostId,
                  this.handleClose
                )
              }
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
export default PostsTable
